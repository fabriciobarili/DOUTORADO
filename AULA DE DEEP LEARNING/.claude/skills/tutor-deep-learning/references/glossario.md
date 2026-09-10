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

<!-- ───────────── AULA_02 · Redes Feedforward (Cap. 6 Goodfellow) ───────────── -->

- **Rede feedforward** — rede em que a informação flui **só para frente**, sem
  ciclos nem memória; da entrada à saída. É o MLP visto na AULA_01, agora
  formalizado. *Analogia:* linha de montagem — a peça entra bruta e sai acabada,
  nunca volta. *Visto em:* AULA_02.
- **Gradiente** — vetor que aponta na direção em que o **erro cresce** mais
  rápido; treinar = andar na direção *oposta*. *Analogia:* bússola que aponta
  morro acima numa montanha com nevoeiro — você anda pro lado contrário para
  descer ao vale. *Visto em:* AULA_02.
- **Gradiente descendente (SGD)** — o algoritmo de aprendizado: ajusta cada
  parâmetro um passo na direção que reduz o erro (`θ ← θ − α·∇J`). *Analogia:*
  descer a montanha às cegas, sentindo a inclinação a cada passo. *Visto em:*
  AULA_02.
- **Taxa de aprendizado (α)** — o tamanho do passo do gradiente descendente:
  grande demais pula o vale, pequeno demais demora. *Analogia:* o tamanho da
  passada na descida. *Visto em:* AULA_02.
- **Função de custo / perda (J)** — mede o quanto a rede errou; é a "altitude"
  que o gradiente descendente tenta minimizar. *Analogia:* a nota de erro numa
  prova que se quer zerar. *Visto em:* AULA_02.
- **Máxima verossimilhança** — princípio que escolhe os parâmetros que tornam os
  dados observados os mais *prováveis*; origem das funções de custo modernas.
  *Analogia:* ajustar a teoria para que ela explique melhor as evidências que
  você de fato coletou. *Visto em:* AULA_02.
- **Entropia cruzada** — função de custo para classificação, derivada da máxima
  verossimilhança; preferida ao MSE porque não trava quando a sigmoide satura.
  *Analogia:* custo de "comunicação" entre o que o modelo prevê e o que é real.
  *Visto em:* AULA_02.
- **MSE (erro quadrático médio)** — custo para regressão: média dos quadrados
  das diferenças. Em classificação com sigmoide, satura e trava o aprendizado.
  *Visto em:* AULA_02.
- **Não-convexidade** — a função de custo de redes profundas tem *vários* vales
  (mínimos locais), não um só; o gradiente descendente pode parar num vale que
  não é o mais fundo — mas costuma ser bom o bastante. *Analogia:* terreno cheio
  de bacias, não uma única tigela. *Visto em:* AULA_02.
- **Unidade de saída** — o último neurônio, escolhido conforme a tarefa: linear
  (número contínuo/regressão), sigmoide (sim/não), softmax (N classes). *Visto
  em:* AULA_02.
- **Pré-ativação (z)** — o resultado da combinação linear `Wx+b`, *antes* de
  passar pela função de ativação. *Visto em:* AULA_02.
- **Gradiente desvanescente** — em redes profundas com sigmoide/tanh, os
  gradientes pequenos se multiplicam pela regra da cadeia e viram quase zero nas
  primeiras camadas, que param de aprender; ReLU resolve isso. *Analogia:*
  recado que vai perdendo força a cada pessoa da fila até sumir. *Visto em:*
  AULA_02.
- **Leaky ReLU / PReLU** — variações do ReLU com uma leve inclinação para
  entradas negativas, para evitar o "neurônio morto"; no PReLU essa inclinação é
  aprendida. *Visto em:* AULA_02.
- **Maxout** — unidade que devolve o máximo entre várias combinações lineares;
  generaliza o ReLU, mas usa mais parâmetros. *Visto em:* AULA_02.
- **Teorema da Aproximação Universal** — uma rede com **uma única camada oculta**
  pode aproximar qualquer função contínua; mas pode precisar de um número
  *inviável* de neurônios — por isso preferimos profundidade. *Analogia:*
  qualquer livro cabe em 26 letras (verdade, mas não ajuda a escrevê-lo). *Visto
  em:* AULA_02.
- **Profundidade × largura** — redes profundas (muitas camadas) são
  exponencialmente mais eficientes que redes largas (poucos camadas, muitos
  neurônios) para a mesma função. *Analogia:* entender texto por níveis (letra →
  palavra → frase) em vez de tudo de uma vez. *Visto em:* AULA_02.
- **Backpropagation (retropropagação)** — algoritmo que **calcula os gradientes**
  de toda a rede num único pass para trás, usando a regra da cadeia; não atualiza
  os pesos (isso é o SGD). *Analogia:* investigação de acidente — parte do
  resultado e atribui a cada peça sua fração de culpa. *Visto em:* AULA_02
  (formalizado; mencionado na AULA_01).
- **Regra da cadeia** — regra do cálculo que combina taxas de mudança em cascata
  (`dz/dx = dz/dy · dy/dx`); é a única ferramenta matemática que o backprop usa.
  *Analogia:* efeito dominó — o impacto total é o produto dos impactos parciais.
  *Visto em:* AULA_02.
- **Grafo computacional** — representação de um cálculo como diagrama: nós são
  operações/variáveis, arestas mostram o que alimenta o quê. *Analogia:*
  fluxograma de uma receita. *Visto em:* AULA_02.
- **Forward pass / backward pass** — os dois passos do treino: o *forward*
  calcula a saída (guardando valores intermediários), o *backward* calcula os
  gradientes de trás para frente. *Visto em:* AULA_02.
- **Jacobiana** — matriz de derivadas parciais que diz quanto cada saída muda com
  cada entrada; aparece na regra da cadeia vetorial. *Analogia:* tabela de
  sensibilidades cruzadas. *Visto em:* AULA_02.
- **Hessiana** — matriz de segundas derivadas (curvatura do custo); impraticável
  de montar com milhões de parâmetros, usam-se produtos Hessiana-vetor e métodos
  de Krylov. *Visto em:* AULA_02.
- **MDN (rede de mistura de densidades)** — rede cuja saída é uma *mistura* de
  Gaussianas, para casos em que um mesmo input admite vários outputs válidos.
  *Analogia:* prever onde a mão vai estar quando o braço pode dobrar para dois
  lados. *Visto em:* AULA_02.
