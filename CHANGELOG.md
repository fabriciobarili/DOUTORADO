# Changelog — Doutorado em Computação Aplicada

---

## [2026-08-30 13:00] — Refatoração do pipeline XAI (`05_xai.py`)

### O que mudou
- **Arquivo reduzido de 1.184 para 513 linhas** — eliminação de código morto e duplicações acumuladas durante o desenvolvimento no Colab
- Bloco de "Previsão em Tempo Real" que estava copiado e colado 4 vezes foi unificado em um único bloco
- Removidas ~400 linhas de abordagens antigas comentadas (Google Drive, `httpfs`, `gcloud`) que nunca seriam executadas
- Todos os `import` e `pip install` movidos para o topo do arquivo — antes estavam espalhados por todo o código
- Lógica de normalização temporal extraída para funções (`preparar_dataset`, `subsample`), evitando repetição
- Corrigido bug silencioso: `sample_weights` era reutilizado no re-treino avançado com tamanho inconsistente
- Variáveis que causariam crash (`best_y_pred`, `final_model_recalibrated`) marcadas com `TODO` explícito
- Constantes nomeadas (`PROJECT_ID`, `BUCKET_NAME`, `RANDOM_STATE`, `WINDOW_SIZE`) no lugar de valores avulsos

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```

---

## [2026-08-30 12:00] — Adiciona scripts de geração de dados, análise e XAI

### Arquivos adicionados
- `01_PRE_GERACAO/osm_to_h3_edges.py` — extração de arestas OSM para grade H3
- `02_GERACAO_DE_DADOS/distribuicao_nao_simulada_v6_final_4.py` — pipeline de distribuição não simulada
- `03_ANALISE/01_tempo_e_temperatura.py` — análise de tempo e temperatura
- `03_ANALISE/02_chegadas_e_partidas.py` — análise de chegadas e partidas no aeroporto
- `03_ANALISE/03_analise_de_dados.py` — análise geral de dados
- `03_ANALISE/04_pipeline_ml_aeroporto_salgado_filho.py` — pipeline de ML para o aeroporto Salgado Filho
- `03_ANALISE/05_xai.py` — Explainable AI (XAI)

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```

---

## [2026-08-30 11:00] — Commit inicial — tese e scripts de pré-geração

### Arquivos adicionados
- `TESE.docx` — documento da tese
- `01_PRE_GERACAO/h3.py` — utilitários H3
- `01_PRE_GERACAO/open_weather_data_collector.py` — coleta de dados meteorológicos (OpenWeather)
- `01_PRE_GERACAO/pipeline_openmeteo_pythermalcomfort_v2.py` — pipeline OpenMeteo + conforto térmico
- `01_PRE_GERACAO/poa_airport_arrivals_and_departures_2025.py` — chegadas e partidas no aeroporto de POA (2025)
- `01_PRE_GERACAO/weather_airport_delay_analyzer.py` — análise de atrasos por condição climática

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```
