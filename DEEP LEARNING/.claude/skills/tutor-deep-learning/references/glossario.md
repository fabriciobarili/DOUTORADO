# Glossário de Deep Learning — construído ao longo do curso

Registro vivo dos termos que o Fabricio já viu. Ao definir um termo novo,
adicione aqui. Ao reencontrar um termo, **reutilize a mesma analogia** para dar
consistência ao aprendizado.

Formato de cada verba:

- **Termo (como se lê / sigla)** — definição em uma frase acessível.
  *Analogia:* a ponte usada. *Visto em:* AULA_XX.

---

- **Deep Learning (aprendizado profundo)** — modelos de redes neurais com muitas
  camadas empilhadas e milhões/bilhões de parâmetros; "profundo" = muitas
  camadas, não "difícil". *Analogia:* revisão de literatura em cadeia, cada mão
  refina o material da anterior. *Visto em:* AULA_01.
- **Neurônio artificial** — unidade que recebe entradas, aplica um peso a cada
  uma, soma tudo e produz uma saída. *Analogia:* nota final por média
  ponderada (prova pesa mais que trabalho). *Visto em:* AULA_01.
- **Peso / Parâmetro** — a menor peça ajustável do modelo; o número que
  multiplica uma entrada e define sua importância. Aprender = ajustar os pesos.
  *Analogia:* os pesos de cada avaliação na nota final. *Visto em:* AULA_01.
- **Camada** — conjunto de neurônios no mesmo nível; a saída de uma camada vira
  a entrada da próxima, e o empilhamento gera a "profundidade". *Analogia:*
  estações de uma linha de montagem. *Visto em:* AULA_01.
- **Entrada (input)** — cada dado que chega ao neurônio (E1, E2, …). *Visto em:*
  AULA_01.
- **Inteligência Artificial (IA)** — o campo mais amplo; na forma básica, regras
  `SE… ENTÃO` (if/else) escritas por uma pessoa. É o maior dos círculos
  concêntricos que contém ML, DL e Gen AI. *Analogia:* seguir um manual de
  codificação fixo. *Visto em:* AULA_01.
- **Machine Learning (aprendizado de máquina)** — a máquina aprende as regras a
  partir de **exemplos rotulados**, em vez de recebê-las prontas. *Analogia:*
  aprender a regra de codificação a partir de trechos que você já codificou.
  *Visto em:* AULA_01.
- **Rótulo (label)** — a resposta certa de cada exemplo ("gato"/"cachorro") que o
  Machine Learning usa para aprender. *Analogia:* a categoria que o pesquisador
  atribui a cada trecho ao codificar. *Visto em:* AULA_01.
- **Descritor / característica (feature)** — o aspecto do dado que o modelo usa
  para decidir (formato da orelha, textura do pelo). No Deep Learning, as
  camadas descobrem esses descritores automaticamente. *Analogia:* os eixos
  temáticos que organizam um corpus. *Visto em:* AULA_01.
- **IA Generativa (Gen AI)** — modelos que **produzem conteúdo novo** (texto,
  imagem, áudio) a partir dos padrões aprendidos; o círculo mais interno, um tipo
  de Deep Learning. *Analogia:* escrever um artigo inédito no estilo do corpus
  lido. *Visto em:* AULA_01.
- **Extração manual de características** — abordagem pré-2011 em que um humano
  define as pistas a medir na imagem (cores, texturas, histograma) antes de
  entregá-las a um classificador; ainda é Machine Learning. *Analogia:* montar o
  livro de códigos à mão antes de rodar a análise de conteúdo. *Visto em:* AULA_01.
- **Histograma (de imagem)** — contagem de quantos pixels de cada tom/cor
  aparecem numa imagem; era uma das características extraídas na mão. *Visto em:*
  AULA_01.
- **SVM / Random Forest / XGBoost** — algoritmos clássicos de Machine Learning
  para classificar (tratados como caixa-preta por ora). *Visto em:* AULA_01.
- **CNN (rede neural convolucional)** — arquitetura de Deep Learning que aprende
  a extrair características de imagens sozinha; protagonista da virada de ~2011.
  Detalhe fica para aula futura. *Visto em:* AULA_01 (mencionada).
- **Vision Transformer (ViT)** — arquitetura mais recente para visão que também
  aprende as características; tema de aula futura. *Visto em:* AULA_01 (mencionada).
- **Backpropagation (retropropagação)** — o algoritmo que **ajusta os pesos** da
  rede automaticamente durante o treino; "o motor que ensina a rede". Detalhe
  fica para aula futura. *Analogia:* ajustar a teoria aos poucos a cada evidência
  nova. *Visto em:* AULA_01 (mencionado).
- **Perceptron** — o neurônio clássico (anos 1950–60): soma ponderada seguida de
  uma função STEP, produzindo saída binária (0 ou 1). *Analogia:* aprovação por
  nota de corte. *Visto em:* AULA_01.
- **Função STEP (degrau)** — ativação binária: devolve 1 se a soma passa de um
  limiar, senão 0. *Analogia:* interruptor liga/desliga. *Visto em:* AULA_01.
- **Limiar (threshold)** — o ponto de corte que a soma precisa ultrapassar para o
  perceptron disparar (saída 1). *Visto em:* AULA_01.
- **XOR (ou-exclusivo)** — problema **não-linear** clássico: quatro pontos que
  nenhuma reta única separa; expôs o limite do perceptron simples. *Analogia:*
  quatro pontos num quadrado que nenhuma régua reta divide em 1s e 0s. *Visto
  em:* AULA_01.
- **Problema linearmente separável** — aquele que uma única reta consegue
  dividir; o perceptron só resolve esses. *Visto em:* AULA_01.
- **Inverno da IA** — período (a partir dos anos 1960) de desânimo com a área
  após se perceber que um neurônio só não resolvia problemas não-lineares;
  superado com o backpropagation (~1974). *Visto em:* AULA_01.
- **Função não-linear** — função cujo incremento em `y` muda conforme `x` (o
  gráfico encurva, não é reta). É o que permite à rede aprender relações
  complexas. *Analogia:* uma régua que se dobra, em vez de rígida. *Visto em:*
  AULA_01.
- **Função de ativação** — a função não-linear no fim do neurônio que decide se e
  quanto ele "dispara"; substitui a STEP. *Visto em:* AULA_01.
- **ReLU** — ativação das camadas intermediárias: zero para entrada negativa,
  linear para positiva; derivada barata. *Visto em:* AULA_01.
- **Sigmoid σ(x)** — ativação que espreme a saída para (0, 1); usada na última
  camada em classificação binária (vira "probabilidade"). *Visto em:* AULA_01.
- **Softmax** — ativação da última camada em problemas multiclasse; distribui a
  decisão entre várias classes (soma 1). *Visto em:* AULA_01.
- **Tanh** — ativação em forma de S de −1 a 1; comum em redes recorrentes,
  eficiente quando o sinal negativo importa. *Visto em:* AULA_01.
- **MLP (multilayer perceptron)** — rede de perceptrons organizados em camadas;
  numa camada **densa** (*fully connected*), cada neurônio se liga a todos os da
  próxima. *Analogia:* neurônios biológicos interconectados. *Visto em:* AULA_01.
- **Bias (viés)** — número aprendível somado ao neurônio que define a **altura**
  onde a reta cruza o eixo `y` (o peso define a **inclinação**). *Analogia:* a
  altura em que uma rampa começa. *Visto em:* AULA_01.
- **Parâmetro treinável** — cada peso e cada bias que a rede ajusta; por camada:
  `(neurônios × entradas) + bias`. *Visto em:* AULA_01.
- **Feature (característica)** — cada informação de entrada que o neurônio recebe;
  uma entrada = uma feature. *Visto em:* AULA_01.
