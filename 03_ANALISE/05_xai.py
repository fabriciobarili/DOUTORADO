# -*- coding: utf-8 -*-
"""05_XAI — Pipeline completo: leitura GCS → Base Master → LightGBM + Optuna → XAI

Dados armazenados no Google Cloud Storage (projeto: doutorado-501917, bucket: 2025_rides).
"""

# ── Instalações ────────────────────────────────────────────────────────────────
!pip install -q gcsfs duckdb google-cloud-storage "optuna-integration[lightgbm]" optuna

# ── Imports ────────────────────────────────────────────────────────────────────
import joblib

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

import duckdb
import gcsfs
import lightgbm as lgb
import optuna
from sklearn.calibration import calibration_curve
from sklearn.metrics import (
    accuracy_score,
    average_precision_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_recall_curve,
)
from sklearn.preprocessing import label_binarize

from google.colab import auth, drive

# ── Autenticação e configuração GCS ───────────────────────────────────────────
auth.authenticate_user()

PROJECT_ID  = 'doutorado-501917'
BUCKET_NAME = '2025_rides'
WINDOW_SIZE = '4h'
RANDOM_STATE = 42

fs = gcsfs.GCSFileSystem(project=PROJECT_ID)
try:
    duckdb.register_filesystem(fs)
except Exception:
    pass  # já registrado

duckdb.sql("PRAGMA enable_progress_bar;")
duckdb.sql("PRAGMA enable_print_progress_bar;")

# ── 1. Leitura dos arquivos Parquet do GCS ────────────────────────────────────
VERSOES_SIMULACAO = range(3, 8)  # V6_3 até V6_7
INICIO_TS = 1735699200
FIM_TS    = 1767235200

caminhos_base = [
    f'gs://{BUCKET_NAME}/outputs_simulation_V6_{v}/trips_log/_staging/**/*.parquet'
    for v in VERSOES_SIMULACAO
]

print("Buscando arquivos Parquet nos diretórios...")
todos_arquivos = []
for caminho in caminhos_base:
    todos_arquivos.extend([f"gs://{f}" for f in fs.glob(caminho)])
print(f"Total de {len(todos_arquivos):,} arquivos encontrados.")

files_sql_array = ", ".join([f"'{f}'" for f in todos_arquivos])

query_combined = f"""
    SELECT
        request_ts,
        event_name,
        origin_h3,
        CASE
            WHEN UPPER(event_name) LIKE '%ATRASADO%'   THEN 'DS_VOO'
            WHEN UPPER(event_name) LIKE '%SEVERIDADE%' THEN 'DS_CLIMA'
            ELSE 'DS_OUTROS'
        END AS dataset_type
    FROM read_parquet([{files_sql_array}], hive_partitioning = true)
    WHERE request_ts >= {INICIO_TS}
      AND request_ts <  {FIM_TS}
    USING SAMPLE 30 PERCENT
"""

print("Carregando dados com DuckDB...")
df_combined = duckdb.sql(query_combined).df()
print(f"Lidas {len(df_combined):,} linhas.")

# ── 2. Carregamento dos datasets auxiliares (Drive) ───────────────────────────
import shutil

drive.mount('/content/drive')

DRIVE_BASE    = "/content/drive/MyDrive/DOUTORADO"
DATASETS_DIR  = f"{DRIVE_BASE}/DATASETS/DATASETS_PRONTOS"

shutil.copy(f"{DRIVE_BASE}/003_DADOS_SINTETICOS/arquivos_base/dados_meteorologicos_utci_horario.csv", "./")
shutil.copy(f"{DRIVE_BASE}/003_DADOS_SINTETICOS/arquivos_base/DADOS_AEROPORTO/03_voos_atrasados_sbpa.csv", "./")
shutil.copy(f"{DATASETS_DIR}/Aeroporto_Salgado_Filho_h3_res12.csv", "./")

df_clima = pd.read_csv('dados_meteorologicos_utci_horario.csv')
df_voos  = pd.read_csv('03_voos_atrasados_sbpa.csv', sep=";")
df_h3    = pd.read_csv('Aeroporto_Salgado_Filho_h3_res12.csv')

print("--- Voos Atrasados (primeiras linhas) ---")
display(df_voos.head())

# ── 3. Separação por tipo de evento e normalização temporal ───────────────────
DS_VOO    = df_combined[df_combined['dataset_type'] == 'DS_VOO'].drop(columns=['dataset_type'])
DS_CLIMA  = df_combined[df_combined['dataset_type'] == 'DS_CLIMA'].drop(columns=['dataset_type'])
DS_OUTROS = df_combined[df_combined['dataset_type'] == 'DS_OUTROS'].drop(columns=['dataset_type'])

print(f"DS_VOO:    {len(DS_VOO):,}")
print(f"DS_CLIMA:  {len(DS_CLIMA):,}")
print(f"DS_OUTROS: {len(DS_OUTROS):,}")

print("\nNormalizando tamanho dos datasets para 2025...")

start_date = pd.to_datetime('2025-01-01 00:00:00')
end_date   = pd.to_datetime('2025-12-31 23:59:59')

def preparar_dataset(df):
    df = df.copy()
    df['request_ts_dt'] = pd.to_datetime(df['request_ts'], unit='s')
    df = df[(df['request_ts_dt'] >= start_date) & (df['request_ts_dt'] <= end_date)]
    return df

DS_VOO    = preparar_dataset(DS_VOO)
DS_CLIMA  = preparar_dataset(DS_CLIMA)
DS_OUTROS = preparar_dataset(DS_OUTROS)

min_size = min(len(DS_VOO), len(DS_CLIMA), len(DS_OUTROS))
print(f"Subsampling para {min_size:,} linhas por classe...")

def subsample(df, n):
    if len(df) > n:
        return df.sample(n=n, random_state=RANDOM_STATE).sort_values('request_ts_dt').reset_index(drop=True)
    return df.sort_values('request_ts_dt').reset_index(drop=True)

DS_VOO    = subsample(DS_VOO, min_size)
DS_CLIMA  = subsample(DS_CLIMA, min_size)
DS_OUTROS = subsample(DS_OUTROS, min_size)

print(f"DS_VOO:    {len(DS_VOO):,} | DS_CLIMA: {len(DS_CLIMA):,} | DS_OUTROS: {len(DS_OUTROS):,}")

# ── 4. Construção da Base Master ──────────────────────────────────────────────
print("\nConstruindo a Base Master...")

TARGET_MAP = {0: '0 (Não Evento)', 1: '1 (Evento Climático)', 2: '2 (Atraso de Voo)'}

df_clima['time']          = pd.to_datetime(df_clima['time'])
df_voos['CHEGADA_REAL']   = pd.to_datetime(df_voos['CHEGADA_REAL'], errors='coerce')
df_clima['time_window']   = df_clima['time'].dt.floor(WINDOW_SIZE)
df_voos['time_window']    = df_voos['CHEGADA_REAL'].dt.floor(WINDOW_SIZE)

DS_OUTROS['target'] = 0
DS_CLIMA['target']  = 1
DS_VOO['target']    = 2

for df in [DS_OUTROS, DS_CLIMA, DS_VOO]:
    df['time_window'] = df['request_ts_dt'].dt.floor(WINDOW_SIZE)

df_eventos_combinados = pd.concat([
    DS_OUTROS[['time_window', 'origin_h3', 'target', 'request_ts_dt']],
    DS_CLIMA [['time_window', 'origin_h3', 'target', 'request_ts_dt']],
    DS_VOO   [['time_window', 'origin_h3', 'target', 'request_ts_dt']],
], ignore_index=True)

df_clima_agg = df_clima.drop(columns=['time']).groupby('time_window').mean(numeric_only=True).reset_index()

df_voos_agg = df_voos.dropna(subset=['time_window']).groupby('time_window').agg(
    qtd_voos_previstos  =('NUMERO_VOO',          'count'),
    qtd_empresas_aereas =('ICAO_EMPRESA_AEREA',   lambda x: x.nunique()),
    lista_chegada_real  =('CHEGADA_REAL',          list),
    lista_empresas_aereas=('ICAO_EMPRESA_AEREA',   list),
    lista_numeros_voo   =('NUMERO_VOO',            list),
    lista_codigo_linha  =('CODIGO_TIPO_LINHA',     list),
).reset_index()

df_master = pd.merge(df_eventos_combinados, df_clima_agg,  on='time_window', how='left')
df_master = pd.merge(df_master,             df_voos_agg,   on='time_window', how='left')
df_master['qtd_voos_previstos']  = df_master['qtd_voos_previstos'].fillna(0)
df_master['qtd_empresas_aereas'] = df_master['qtd_empresas_aereas'].fillna(0)
df_master = df_master.sort_values('time_window').reset_index(drop=True)

print(f"Base Master: {len(df_master):,} linhas x {df_master.shape[1]} colunas")
print("\nDistribuição do Target:")
print(df_master['target'].map(TARGET_MAP).value_counts())
display(df_master.head())

# ── 5. Feature Engineering ────────────────────────────────────────────────────
print("\nCriando features temporais e de lag...")

df_master['hora']       = df_master['time_window'].dt.hour
df_master['mes']        = df_master['time_window'].dt.month
df_master['dia_semana'] = df_master['time_window'].dt.dayofweek
df_master['trimestre']  = df_master['time_window'].dt.quarter

df_clima_agg = df_clima_agg.sort_values('time_window')
cols_lag = ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m']
if 'surface_pressure' in df_clima_agg.columns:
    cols_lag.append('surface_pressure')

for col in cols_lag:
    df_clima_agg[f'{col}_lag4h'] = df_clima_agg[col].shift(1)

colunas_lags = ['time_window'] + [f'{col}_lag4h' for col in cols_lag]
df_master = pd.merge(df_master, df_clima_agg[colunas_lags], on='time_window', how='left')

# Tendências climáticas (variação nas últimas 4h)
cols_diff = ['surface_pressure', 'temperature_2m', 'wind_speed_10m', 'relative_humidity_2m']
for col in cols_diff:
    lag_col = f'{col}_lag4h'
    if col in df_master.columns and lag_col in df_master.columns:
        df_master[f'diff_{col}'] = df_master[col] - df_master[lag_col]

# Contexto da malha aérea
def conta_ocorrencias(lista, item):
    return lista.count(item) if isinstance(lista, list) else 0

for codigo, nome in [('AZU', 'azul'), ('GLO', 'gol'), ('TAM', 'latam')]:
    df_master[f'qtd_voos_{nome}'] = df_master['lista_empresas_aereas'].apply(
        lambda x, c=codigo: conta_ocorrencias(x, c)
    )

df_master['qtd_voos_nacionais']      = df_master['lista_codigo_linha'].apply(lambda x: conta_ocorrencias(x, 'N'))
df_master['qtd_voos_internacionais'] = df_master['lista_codigo_linha'].apply(lambda x: conta_ocorrencias(x, 'I'))

print("Features criadas.")
display(df_master[['time_window', 'diff_surface_pressure', 'qtd_voos_gol', 'qtd_voos_internacionais']].head())

# ── 6. Pesos de classe e split temporal ──────────────────────────────────────
COLUNAS_REMOVER = [
    'time_window', 'origin_h3', 'target', 'request_ts_dt',
    'diffuse_radiation', 'sunshine_duration', 'dew_point_2m',
    'vapour_pressure_deficit', 'api_latitude', 'api_longitude',
    'api_elevation', 'api_utc_offset_seconds',
    'LAT', 'LONG', 'ELEVATION',
    'utci_tdb_c', 'utci_rh_pct', 'utci_wind_speed_10m_mps_raw',
    'utci_is_day_estimated', 'utci_radiative_adjustment_c',
    'utci_tr_c', 'utci_wind_speed_10m_mps_used',
    'utci_wind_was_clipped', 'utci_c',
    'utci_discomfort_score_0_100', 'utci_has_heat_stress',
    'utci_has_cold_stress', 'utci_has_strong_heat_stress',
    'utci_has_strong_cold_stress',
    'qtd_voos_previstos', 'qtd_empresas_aereas',
    'lista_chegada_real', 'lista_empresas_aereas',
    'lista_numeros_voo', 'lista_codigo_linha',
]

PERCENTUAL_TREINO = 0.80
indice_corte = int(len(df_master) * PERCENTUAL_TREINO)

df_train = df_master.iloc[:indice_corte].copy()
df_test  = df_master.iloc[indice_corte:].copy()

cols_remover_existentes = [c for c in COLUNAS_REMOVER if c in df_train.columns]
X_train = df_train.drop(columns=cols_remover_existentes)
y_train = df_train['target']
X_test  = df_test.drop(columns=cols_remover_existentes)
y_test  = df_test['target']

print(f"Treino: {len(X_train):,} amostras | Teste: {len(X_test):,} amostras | Features: {X_train.shape[1]}")
print(f"Período treino: {df_train['time_window'].min()} → {df_train['time_window'].max()}")
print(f"Período teste:  {df_test['time_window'].min()} → {df_test['time_window'].max()}")

# Pesos de classe
class_weight_dict = {0: 0.5, 1: 1.5, 2: 1.5}
sample_weights = y_train.map(class_weight_dict)

# ── 7. Treino base LightGBM ───────────────────────────────────────────────────
lgb_params_base = {
    'objective':     'multiclass',
    'num_class':     3,
    'metric':        'multi_logloss',
    'learning_rate': 0.05,
    'max_depth':     10,
    'random_state':  RANDOM_STATE,
    'verbosity':     -1,
}

nomes_classes = ['0 (Não Evento)', '1 (Evento Climático)', '2 (Atraso de Voo)']

dtrain = lgb.Dataset(X_train, label=y_train, weight=sample_weights)
dtest  = lgb.Dataset(X_test,  label=y_test)

print("\nTreinando modelo base LightGBM...")
model = lgb.train(
    lgb_params_base,
    dtrain,
    num_boost_round=150,
    valid_sets=[dtrain, dtest],
    callbacks=[lgb.early_stopping(stopping_rounds=15), lgb.log_evaluation(period=50)],
)

y_pred_prob = model.predict(X_test)
y_pred      = np.argmax(y_pred_prob, axis=1)
y_test_bin  = label_binarize(y_test, classes=[0, 1, 2])

print("\n" + "="*50)
print("RESULTADOS — MODELO BASE")
print("="*50)
print(classification_report(y_test, y_pred, target_names=nomes_classes, zero_division=0))

print("PR-AUC por classe:")
for i, nome in enumerate(nomes_classes):
    pr_auc = average_precision_score(y_test_bin[:, i], y_pred_prob[:, i])
    print(f"  {nome}: {pr_auc:.4f}")

# ── 8. Otimização de hiperparâmetros com Optuna ───────────────────────────────
print("\nOtimizando hiperparâmetros com Optuna (n_trials=30)...")

def objective(trial):
    param = {
        'objective':         'multiclass',
        'num_class':         3,
        'metric':            'multi_logloss',
        'verbosity':         -1,
        'boosting_type':     'gbdt',
        'feature_pre_filter': False,
        'random_state':      RANDOM_STATE,
        'learning_rate':     trial.suggest_float('learning_rate',   0.01, 0.2,  log=True),
        'num_leaves':        trial.suggest_int  ('num_leaves',      20,   100),
        'max_depth':         trial.suggest_int  ('max_depth',       3,    12),
        'min_data_in_leaf':  trial.suggest_int  ('min_data_in_leaf',10,   100),
        'feature_fraction':  trial.suggest_float('feature_fraction',0.5,  1.0),
        'bagging_fraction':  trial.suggest_float('bagging_fraction',0.5,  1.0),
        'bagging_freq':      trial.suggest_int  ('bagging_freq',    1,    7),
        'lambda_l1':         trial.suggest_float('lambda_l1',       1e-8, 10.0, log=True),
        'lambda_l2':         trial.suggest_float('lambda_l2',       1e-8, 10.0, log=True),
    }

    dtrain_opt = lgb.Dataset(X_train, label=y_train, weight=sample_weights)
    dtest_opt  = lgb.Dataset(X_test,  label=y_test,  reference=dtrain_opt)

    model_opt = lgb.train(
        param, dtrain_opt,
        num_boost_round=200,
        valid_sets=[dtest_opt],
        callbacks=[lgb.early_stopping(stopping_rounds=20, verbose=False)],
    )

    y_pred_opt = np.argmax(model_opt.predict(X_test), axis=1)
    return f1_score(y_test, y_pred_opt, average='macro')

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=30)

print(f"\nMelhor F1-score: {study.best_value:.4f}")
best_params = {
    **study.best_params,
    'objective':          'multiclass',
    'num_class':          3,
    'metric':             'multi_logloss',
    'random_state':       RANDOM_STATE,
    'feature_pre_filter': False,
    'verbosity':          -1,
}

# ── 9. Treino final com melhores parâmetros ───────────────────────────────────
dtrain_final = lgb.Dataset(X_train, label=y_train, weight=sample_weights, params={'feature_pre_filter': False})
dtest_final  = lgb.Dataset(X_test,  label=y_test,  reference=dtrain_final,  params={'feature_pre_filter': False})

print("\nTreinando modelo final...")
final_model = lgb.train(
    best_params, dtrain_final,
    num_boost_round=200,
    valid_sets=[dtrain_final, dtest_final],
    callbacks=[lgb.early_stopping(stopping_rounds=20), lgb.log_evaluation(period=50)],
)

y_pred_prob_final = final_model.predict(X_test)
y_pred_final      = np.argmax(y_pred_prob_final, axis=1)

print("\n" + "="*50)
print("RESULTADOS — MODELO FINAL (Optuna)")
print("="*50)
print(classification_report(y_test, y_pred_final, target_names=nomes_classes, zero_division=0))

print("PR-AUC por classe:")
for i, nome in enumerate(nomes_classes):
    pr_auc = average_precision_score(y_test_bin[:, i], y_pred_prob_final[:, i])
    print(f"  {nome}: {pr_auc:.4f}")

# ── 10. Calibração de Probabilidades ─────────────────────────────────────────
print("\nCurva de Calibração — Classe: Atraso de Voo")

prob_true, prob_pred = calibration_curve(y_test == 2, y_pred_prob_final[:, 2], n_bins=10)

fig, ax = plt.subplots(figsize=(8, 6))
ax.plot(prob_pred, prob_true, marker='o', label='LightGBM (Atual)')
ax.plot([0, 1], [0, 1], linestyle='--', color='gray', label='Calibração Perfeita')
ax.set_title('Reliability Diagram — Atraso de Voo', fontsize=14)
ax.set_xlabel('Probabilidade Prevista Média', fontsize=12)
ax.set_ylabel('Fração Real de Positivos', fontsize=12)
ax.legend()
ax.grid(True, linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()

# ── 11. Importância das Variáveis ─────────────────────────────────────────────
print("\nImportância das Variáveis (Gain)")

importances    = final_model.feature_importance(importance_type='gain')
feature_names  = final_model.feature_name()
df_importances = (
    pd.DataFrame({'feature': feature_names, 'importance': importances})
    .sort_values('importance', ascending=False)
)

COLUNAS_IGNORADAS = ['utci_discomfort_score_0_100']
df_importances_filtrado = df_importances[~df_importances['feature'].isin(COLUNAS_IGNORADAS)]

fig, ax = plt.subplots(figsize=(10, 8))
sns.barplot(
    x='importance', y='feature', hue='feature',
    data=df_importances_filtrado.head(20),
    palette='viridis', legend=False, ax=ax,
)
ax.set_title('Top 20 Variáveis Mais Importantes (Gain)', fontsize=14)
ax.set_xlabel('Importância (Gain)', fontsize=12)
ax.set_ylabel('Variável', fontsize=12)
plt.tight_layout()
plt.show()

display(df_importances_filtrado.head(10))

# ── 12. Análise de Erros — Matriz de Confusão ─────────────────────────────────
# TODO: aplicar otimização de limiares (threshold tuning) e atribuir a best_y_pred
best_y_pred = y_pred_final  # substituir pelo resultado do threshold tuning quando disponível

cm = confusion_matrix(y_test, best_y_pred)

fig, ax = plt.subplots(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=nomes_classes, yticklabels=nomes_classes, ax=ax)
ax.set_title('Matriz de Confusão', fontsize=14)
ax.set_ylabel('Classe Real', fontsize=12)
ax.set_xlabel('Classe Prevista', fontsize=12)
plt.show()

falsos_positivos_atraso = cm[0, 2] + cm[1, 2]
falsos_negativos_atraso = cm[2, 0] + cm[2, 1]
print(f"Falsos Positivos (alarme falso de atraso): {falsos_positivos_atraso:,}")
print(f"Falsos Negativos (atraso não detectado):   {falsos_negativos_atraso:,}")

# ── 13. Curvas Precision-Recall ───────────────────────────────────────────────
# TODO: substituir y_pred_prob_final por y_pred_prob_recal após calibração isotônica
fig, ax = plt.subplots(figsize=(10, 7))
for i, nome in enumerate(nomes_classes):
    precision, recall, _ = precision_recall_curve(y_test_bin[:, i], y_pred_prob_final[:, i])
    pr_auc = average_precision_score(y_test_bin[:, i], y_pred_prob_final[:, i])
    ax.plot(recall, precision, lw=2, label=f'{nome} (AUC = {pr_auc:.4f})')

ax.set_title('Curvas Precision-Recall Multiclasse', fontsize=14)
ax.set_xlabel('Recall', fontsize=12)
ax.set_ylabel('Precision', fontsize=12)
ax.legend(loc='lower left', fontsize=11)
ax.grid(True, linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()

# ── 14. Salvando artefatos do modelo ──────────────────────────────────────────
print("\nSalvando modelo e lista de features...")

NOME_MODELO   = 'modelo_lgb_atrasos_v1.txt'
NOME_FEATURES = 'features_esperadas_v1.pkl'

final_model.save_model(NOME_MODELO)
joblib.dump(X_train.columns.tolist(), NOME_FEATURES)

print(f"Modelo salvo:   {NOME_MODELO}")
print(f"Features salvas: {NOME_FEATURES}")

# Para persistir no Drive:
# !cp {NOME_MODELO}   /content/drive/MyDrive/DOUTORADO/
# !cp {NOME_FEATURES} /content/drive/MyDrive/DOUTORADO/

# ── 15. Previsão em tempo real (simulação) ────────────────────────────────────
print("\nSimulando previsão para uma janela futura...")

modelo_carregado  = lgb.Booster(model_file=NOME_MODELO)
colunas_modelo    = joblib.load(NOME_FEATURES)
dados_futuros     = X_test.iloc[[10]][colunas_modelo].copy()

probabilidades_futuras = modelo_carregado.predict(dados_futuros)
classe_prevista        = np.argmax(probabilidades_futuras, axis=1)[0]

print(f"  Não Evento (0):       {probabilidades_futuras[0][0]:.1%}")
print(f"  Evento Climático (1): {probabilidades_futuras[0][1]:.1%}")
print(f"  Atraso de Voo (2):    {probabilidades_futuras[0][2]:.1%}")
print(f"  Decisão: {TARGET_MAP[classe_prevista]}")

# ── 16. Taxa de acerto em amostra do conjunto de teste ───────────────────────
print("\nAvaliando acurácia em amostra de 30.000 casos...")

amostra_X  = X_test.sample(n=30_000, random_state=RANDOM_STATE)
amostra_y  = y_test.loc[amostra_X.index]
previsoes  = np.argmax(final_model.predict(amostra_X), axis=1)
acertos    = np.sum(amostra_y.values == previsoes)

print(f"Acertos: {acertos:,} / {len(amostra_X):,} ({accuracy_score(amostra_y, previsoes):.2%})")

comparativo = pd.DataFrame({
    'Real':    amostra_y.values,
    'Previsto': previsoes,
}).assign(
    Real_Desc    = lambda d: d['Real'].map(TARGET_MAP),
    Previsto_Desc= lambda d: d['Previsto'].map(TARGET_MAP),
    Acertou      = lambda d: d['Real'] == d['Previsto'],
)
display(comparativo.head(15))
