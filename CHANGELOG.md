# Changelog — Doutorado em Computação Aplicada

---

## [2026-09-13] — Amostragem equilibrada ao longo do ano e correção de estouro de memória na GPU

### O que mudou
- **Carga de dados agora é distribuída ao longo do ano inteiro** (`03_ANALISE/05_4_Comparacao_Modelos.ipynb`, célula de carga). Antes pegávamos uma amostra aleatória de 30% de tudo — o que trazia quase 60 milhões de linhas, esmagadoramente da classe comum ("Não Evento"), e deixava os eventos raros (Atraso de Voo e Clima) diluídos. Agora o ano é dividido em 100 fatias de tempo (~3,6 dias cada) e pegamos até 1.000 registros de cada tipo em cada fatia. Resultado: cerca de 100 mil linhas por tipo, bem espalhadas de janeiro a dezembro, em vez de um amontoado desequilibrado
- **Por que isso importa:** os três tipos de evento passam a ter representação parecida e cobertura temporal uniforme, o que torna a comparação entre modelos mais justa e o treino muito mais leve (de ~60 milhões para ~300 mil linhas)
- **Correção do erro de memória da placa de vídeo (GPU) que interrompia o experimento.** O FT-Transformer e o TabTransformer tentavam processar todo o conjunto de validação e de teste de uma só vez, o que estourava a memória da GPU e derrubava a execução logo no segundo experimento. Agora o processamento é feito em blocos de 512 registros por vez, tanto na validação quanto na avaliação final, e a memória da GPU é liberada ao fim de cada experimento
- **Efeito prático:** o loop dos 96 experimentos volta a rodar do início ao fim sem travar, independentemente do tamanho da GPU disponível no Colab (o número de registros por bloco pode ser reduzido caso a placa seja muito pequena)

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```

---

## [2026-09-12 12:29] — Comparação unificada dos 3 modelos (janela × distância, todos contra todos)

### O que mudou
- **Novo notebook `03_ANALISE/05_4_Comparacao_Modelos.ipynb`** — unifica os três pipelines antes separados (`05_XAI` = LightGBM, `05_2_FTTransformer`, `05_3_TabTransformer`) em um único documento que roda o grid combinatório **3 algoritmos × 4 janelas (1h/2h/3h/4h) × distância on/off = 24 experimentos** e compara **todos contra todos**
- **Pipeline de dados e engenharia de features compartilhados** para os três modelos, de modo que a comparação isole o efeito do *algoritmo* e não do pré-processamento: mesmo split temporal (80/20 com validação interna), mesmas features (espaciais H3, cíclicas sin/cos, lags e diffs climáticos) e filtro de variância zero que preserva o sinal espacial do H3 mas descarta colunas constantes
- **Decisões de comparação justa documentadas** nas células de abertura e conclusão: pesos de classe balanceados iguais para os três (removido o reforço manual ×0.5/×1.5 do `05_XAI`, que enviesaria dados já 1:1:1) e LightGBM com hiperparâmetros fixos por padrão no grid (`LGBM_OPTUNA_TRIALS` reativa o Optuna por cenário)
- **Seção de comparação geral** com heatmaps por algoritmo (janela × distância), barras dos 24 cenários, ranking completo, melhor cenário por algoritmo e efeito médio da distância; **XAI do melhor cenário** despachando SHAP (LightGBM) ou importância por permutação (transformers)
- **`03_ANALISE/05_3_TabTransformer.ipynb` atualizado** — janelas configuráveis (1h/2h/3h/4h) e toggle de distância ao aeroporto, com análise combinatória e visualizações comparativas (base do experimento agora generalizada no `05_4`)
- Documento novo escrito de forma fortemente comentada (markdown explicando metodologia, ressalvas e como ler os resultados), conforme solicitado

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```

---

## [2026-09-10 19:27] — Aula 02: caderno de estudos e WebPage do Cap. 6 (Redes Feedforward)

### O que mudou
- **Base de estudos da Aula 02 construída** a partir do material bruto `AULA_02/cap_6.pdf` (Cap. 6 "Deep Feedforward Networks" de Goodfellow, Bengio & Courville) — o PDF original foi preservado intacto
- **`AULA DE DEEP LEARNING/AULA_02/TEORIA.md`** — caderno de estudos acessível seguindo a escada intuição → fórmula legendada → exemplo numérico, cobrindo: XOR e a necessidade de não-linearidade, aprendizado por gradiente e funções de custo, unidades de saída (linear/sigmoide/softmax/MDN), funções de ativação (ReLU e variações), profundidade × largura e o Teorema da Aproximação Universal, retropropagação e regra da cadeia, e notas históricas. Inclui "resumo de bolso" e conexões com a Aula 01
- **`AULA DE DEEP LEARNING/AULA_02/cap_6_resumo.html`** — página de estudo navegável com menu lateral por tópico, busca por assunto, filtro por hashtags e 6 diagramas SVG desenhados à mão (fluxo da rede, geometria do XOR, curvas das ativações, sigmoide, grafo computacional e linha do tempo). Traz os dois níveis pedidos: um resumo rápido de 5 pontos e o conteúdo detalhado com verificações numéricas
- **Glossário do curso** ampliado com ~25 termos novos da Aula 02 (gradiente, gradiente descendente, entropia cruzada, máxima verossimilhança, gradiente desvanescente, backpropagation formalizado, regra da cadeia, grafo computacional, Jacobiana, Hessiana, softmax, MDN, teorema da aproximação universal...), reaproveitando as analogias já usadas

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```

---

## [2026-09-03 13:00] — Aula 01 reconstruída com diagramas (perceptron → MLP)

### O que mudou
- **`AULA DE DEEP LEARNING/AULA_01/TEORIA.md` reconstruído do zero** a partir do material bruto ampliado (`TEORIA.txt` agora cobre perceptron, XOR, funções de ativação, MLP e bias) — passou de 6 para 12 seções
- **Primeira aplicação da capacidade de desenho da skill**, com figuras de verdade:
  - `AULA_01/img/funcao_linear_vs_nao_linear.svg` — o gráfico da função não-linear que o próprio material pedia para desenhar
  - `AULA_01/img/funcoes_ativacao.svg` — curvas de ReLU, sigmoid e tanh
  - `AULA_01/img/funcoes_ativacao.py` — script Python reprodutível que regenera o SVG das ativações
  - diagramas Mermaid inline do neurônio, do perceptron e da MLP; plano ASCII do XOR
- Nova cobertura teórica: perceptron e função STEP, problema do XOR e o "inverno da IA", funções de ativação (ReLU/sigmoid/softmax/tanh), MLP, pesos × bias e contagem de parâmetros treináveis
- **Resposta à pergunta deixada nas anotações** ("o que a função não-linear faz pela rede?"), com a intuição da "régua que dobra"
- **Glossário** ampliado com 17 termos novos (perceptron, STEP, limiar, XOR, inverno da IA, função não-linear, função de ativação, ReLU, sigmoid, softmax, tanh, MLP, bias, parâmetro treinável, feature...)
- Anotações originais em `TEORIA.txt` preservadas intactas

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```

---

## [2026-09-03 12:15] — Skill do tutor ganha capacidade de desenho

### O que mudou
- **Skill `tutor-deep-learning` agora sabe desenhar**: nova seção "Capacidade visual" no `SKILL.md` com uma escada de decisão de formato — ASCII/Unicode (esquemas simples), Mermaid (arquiteturas e fluxos) e SVG/script Python (curvas de funções, dispersão, geometria)
- O tutor passa a desenhar **proativamente** sempre que um conceito for estrutural, relacional ou uma curva (neurônio, camadas, função de ativação, XOR), sem esperar ser pedido
- **Guia pedagógico** (`abordagem-pedagogica.md`) ganhou receitas prontas de desenho: neurônio e MLP em Mermaid, curvas de ativação em SVG/matplotlib e o plano do XOR
- Regras de ouro definidas: desenho serve à intuição (nunca enfeite), sempre com legenda e fallback textual, rótulos em português, reprodutibilidade quando gerado por script
- Gatilhos de ativação da skill ampliados ("desenha", "faz um diagrama", "monta a base da aula")

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```

---

## [2026-09-03 11:30] — Aula 01: reconstrução do caderno com a virada da visão computacional (~2011)

### O que mudou
- **`AULA DE DEEP LEARNING/AULA_01/TEORIA.md` reconstruído** a partir do material bruto atualizado (`TEORIA.txt` ganhou anotações novas sobre análise de imagem)
- Nova **seção 3 — "A virada da visão computacional (~2011)"**: explica, com exemplo concreto, a diferença entre *extrair características na mão* (Machine Learning: SVM, Random Forest, XGBoost) e *deixar a rede aprender as características sozinha* (Deep Learning: CNN, Vision Transformer, backpropagation)
- Caderno reorganizado numa ordem mais didática (o que é DL → hierarquia IA/ML/DL/GenAI → exemplo da visão → neurônio → pesos → camadas), com referências cruzadas conectando as seções
- **Glossário** ampliado com sete termos novos: extração manual de características, histograma, SVM/Random Forest/XGBoost, CNN, Vision Transformer e backpropagation — os três últimos marcados como "detalhe fica para aula futura"
- Anotações originais em `TEORIA.txt` preservadas intactas

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```

---

## [2026-09-03 10:00] — Base de estudos da Aula 01 completada (IA, ML, DL e Gen AI)

### O que mudou
- **Caderno de estudos `AULA DE DEEP LEARNING/AULA_01/TEORIA.md`** ganhou a seção que faltava: a hierarquia **IA → Machine Learning → Deep Learning → IA Generativa**, apresentada como círculos concêntricos com analogia do território das ciências sociais
- Esse conteúdo estava só nas anotações brutas (`TEORIA.txt`) e ainda não tinha sido destilado para o caderno de estudos
- Seções seguintes renumeradas (neurônio, pesos e camadas) e referências cruzadas ajustadas; resumo "Para lembrar" atualizado
- **Glossário do curso** recebeu cinco termos novos: Inteligência Artificial, Machine Learning, Rótulo (label), Descritor/característica (feature) e IA Generativa — cada um com analogia consistente com o caderno
- Anotações originais em `TEORIA.txt` preservadas intactas

### Ponto de retorno (rollback)
```bash
git revert HEAD --no-edit
```

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
