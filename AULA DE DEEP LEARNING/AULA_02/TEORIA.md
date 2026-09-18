# Aula 02 — Redes Neurais Feedforward (MLPs)
### Caderno de estudos · Capítulo 6 de Goodfellow, Bengio & Courville (*Deep Learning*)

> **Como usar este caderno:** ele segue a escada do intuitivo ao formal. Leia
> a intuição primeiro; a matemática vem depois, sempre legendada. Há também uma
> versão navegável em `cap_6_resumo.html` (abra no navegador — tem menu lateral,
> busca e filtro por tags).

---

## 🎯 Objetivo da aula

Entender o **bloco de construção fundamental** de todo o Deep Learning: a rede
neural feedforward, também chamada de **MLP** (*Multilayer Perceptron*).
Especificamente, responder a quatro perguntas:

1. Por que precisamos de não-linearidade? (o caso do XOR)
2. Como a rede aprende? (gradiente + funções de custo)
3. Como escolher a arquitetura? (profundidade × largura)
4. Como os gradientes são calculados de forma eficiente? (retropropagação)

---

## 🪜 Ponto de partida: o que é uma rede feedforward?

**Intuição.** Imagine uma **linha de montagem**. A matéria-prima entra de um
lado, passa por várias estações — cada uma faz uma transformação especializada —
e sai acabada do outro lado. Uma rede feedforward é essa linha: transforma a
entrada (uma imagem, uma frase, uma tabela) em uma saída (um rótulo, um número,
uma probabilidade), passando por camadas de transformações.

O nome **"feedforward"** (para frente) vem do fato de que a informação flui
**só numa direção** — não há ciclos, não há retorno, não há memória. (Quando há
ciclos, temos redes recorrentes, assunto de outra aula.)

**Fórmula legendada.** Cada camada faz duas coisas:

```
z = W·x + b      (combinação linear)
h = g(z)         (função de ativação, não-linear)
```

- `x` — entrada da camada (vetor de números)
- `W` — matriz de **pesos**: quanto cada input importa
- `b` — **viés** (*bias*): uma constante que desloca o resultado
- `z` — a **pré-ativação** (resultado linear, antes de "filtrar")
- `g(·)` — a **função de ativação**, que introduz a não-linearidade
- `h` — a saída da camada (que vira input da próxima)

> **Para lembrar:** uma camada = combinação linear + ativação não-linear.
> Empilhar camadas só faz sentido por causa do `g(·)` — sem ele, N camadas
> lineares colapsam numa única camada linear.

---

## 6.1 — Por que não-linearidade? O exemplo do XOR

**O problema.** XOR ("ou exclusivo") retorna 1 quando os dois inputs são
*diferentes*, e 0 quando são *iguais*:

| x₁ | x₂ | XOR |
|----|----|-----|
| 0  | 0  | 0   |
| 0  | 1  | 1   |
| 1  | 0  | 1   |
| 1  | 1  | 0   |

**Por que isso é interessante?** Porque **nenhum modelo linear consegue
resolver o XOR**. Se você desenhar os quatro pontos num plano, não existe uma
única reta que separe os "1" dos "0". É o exemplo clássico que mostra o limite
das redes lineares — e foi exatamente esse problema que causou o primeiro
"inverno da IA" em 1969 (Minsky & Papert).

**A solução.** Adicionar **uma camada oculta** com ativação **ReLU**. O livro
mostra uma rede exata com 2 neurônios ocultos:

```
f(x) = w⊤ · max{0, W·x + c} + b

W = [[1,1],[1,1]]   c = [0,-1]   w = [1,-2]   b = 0
```

**Exemplo numérico (input = [0,1]):**
1. `z = W·[0,1] + c = [1, 0]`
2. `h = max{0, z} = [1, 0]` (ReLU)
3. `ŷ = w·h + b = 1·1 + (-2)·0 = 1` ✓ → XOR(0,1) = 1

**O que a camada oculta faz?** Ela **reescreve o espaço** dos dados. Os dois
neurônios ocultos são como dois analistas: um detecta "pelo menos um aceso",
outro "os dois acesos". A saída combina os dois → "aceso mas não os dois" = XOR.

> **✔️ Verifique você:** por que empilhar duas camadas lineares (sem ativação)
> não resolveria o XOR? *(Resposta: porque a composição de funções lineares
> ainda é uma função linear — você não ganha poder de representação.)*

---

## 6.2 — Como a rede aprende? Gradiente e funções de custo

### O gradiente como bússola

**Intuição.** Você está numa montanha com nevoeiro e quer chegar ao vale. Não
vê longe, mas sente a inclinação sob os pés e dá um passo na direção que desce
mais. Repete. Isso é o **gradiente descendente**.

Na rede: a "altitude" é o **erro** (quanto a rede errou), os "pés" são os
**pesos**. O **gradiente** aponta para onde o erro *cresce*; então andamos na
direção *oposta* para reduzi-lo.

```
θ ← θ - α · ∇θ J(θ)
```
- `θ` — os parâmetros (pesos e vieses)
- `α` — **taxa de aprendizado** (tamanho do passo)
- `∇θ J` — gradiente do custo em relação aos parâmetros

> ⚠️ **Não-convexidade:** diferente de modelos lineares, o custo de uma rede
> profunda tem *vários vales* (mínimos locais). O gradiente descendente não
> garante achar o vale mais fundo — mas, na prática, os vales que ele encontra
> costumam ser bons o suficiente.

### Funções de custo: máxima verossimilhança → entropia cruzada

A maioria dos custos modernos vem do princípio de **máxima verossimilhança**:
escolher os parâmetros que tornam os dados observados o mais *prováveis*
possível.

```
J(θ) = -E[ log p_modelo(y | x; θ) ]
```

Isso resulta na **entropia cruzada** entre os dados e o modelo.

> **Por que não usar erro quadrático (MSE) em classificação?** Porque, combinado
> com a sigmoide, o MSE **satura**: quando a rede já está confiante (saída perto
> de 0 ou 1), o gradiente vai a zero e o aprendizado *trava*. A entropia cruzada
> não sofre disso — o `log` compensa a saturação da sigmoide.

### Unidades de saída — escolha conforme a tarefa

| Tarefa | Saída | Distribuição | Custo |
|--------|-------|--------------|-------|
| Prever número contínuo | Linear (`ŷ = W⊤h+b`) | Gaussiana | MSE |
| Sim/não | Sigmoide `σ(z)` | Bernoulli | Entropia cruzada binária |
| N categorias | Softmax | Multinoulli | Entropia cruzada |
| Múltiplas respostas válidas | Mistura de Gaussianas (MDN) | Mistura | Log-verossimilhança da mistura |

**Softmax — exemplo numérico:**
```
softmax(z)ᵢ = exp(zᵢ) / Σⱼ exp(zⱼ)

z = [2, 1, 0.1]  →  exp = [7.39, 2.72, 1.10]  →  soma = 11.21
softmax = [0.659, 0.242, 0.098]   (soma = 1.0)
```
Softmax é como converter pontuações em **porcentagens de voto**: eleva cada
score a `eˢ` (garante positivos) e normaliza pela soma.

> **✔️ Verifique você:** se você quer classificar e-mails em "spam / não-spam",
> qual unidade de saída usa? E para classificar dígitos de 0 a 9?
> *(Sigmoide para o primeiro; softmax de 10 saídas para o segundo.)*

---

## 6.3 — Unidades ocultas: funções de ativação

A ativação é o que dá **poder de representação** à rede. Sem ela, tudo colapsa
em linear.

| Ativação | Fórmula | Quando usar |
|----------|---------|-------------|
| **ReLU** ⭐ | `max(0, z)` | **Padrão.** Use por default nas camadas ocultas |
| Leaky ReLU | `max(αz, z)`, α=0.01 | Quando ReLU "mata" neurônios |
| PReLU | `max(αz, z)`, α aprendido | Datasets grandes |
| Maxout | `max(w₁⊤x+b₁, w₂⊤x+b₂)` | Com dropout |
| Sigmoide | `1/(1+e⁻ᶻ)` | Só na *saída* (classif. binária) |
| Tanh | `(eᶻ−e⁻ᶻ)/(eᶻ+e⁻ᶻ)` | Melhor que sigmoide em ocultas |

**Por que ReLU é a rainha?** Ela é `max(0, z)` — corta o negativo, deixa passar
o positivo (como um **diodo elétrico**). Sua grande vantagem: para `z > 0`, o
gradiente é sempre **1**, então ele **não desaparece**.

> ⚠️ **Gradiente desvanescente:** sigmoide e tanh têm gradiente ~0 nas
> extremidades. Em redes profundas, multiplicar muitos gradientes pequenos (pela
> regra da cadeia — ver 6.5) faz o gradiente das primeiras camadas virar quase
> zero, e elas param de aprender. **ReLU foi uma das 3 chaves que destravaram o
> Deep Learning.**

---

## 6.4 — Design da arquitetura: profundidade × largura

**Intuição — hierarquia de conceitos.** Como humanos entendem texto? Letras →
sílabas → palavras → frases → sentido. Cada nível usa o anterior. Redes
**profundas** (muitas camadas) aprendem hierarquias assim, e isso é muito mais
eficiente que uma única camada gigante tentando aprender tudo de uma vez.

**Teorema da Aproximação Universal (Cybenko 1989; Hornik et al. 1989):**
uma rede com **uma única camada oculta** e ativação não-polinomial pode
aproximar *qualquer função contínua* com precisão arbitrária.

> ⚠️ **Cuidado com o que o teorema NÃO diz:** ele não diz que é *prático*. O
> número de neurônios necessários numa única camada pode ser
> **exponencialmente grande**. E não garante que a rede seja *treinável*.
> Montufar et al. (2014) mostraram que redes profundas são exponencialmente mais
> eficientes que rasas para a mesma classe de funções. **Profundidade é o
> segredo.**

> **✔️ Verifique você:** se o teorema diz que 1 camada basta, por que usamos
> redes profundas? *(Porque "possível em teoria" ≠ "eficiente na prática" — a
> rede rasa precisaria de um número inviável de neurônios.)*

---

## 6.5 — Retropropagação (backpropagation)

### A grande ideia: atribuição de culpa

**Intuição.** Quando a rede erra, *quem tem culpa*? O backprop é um algoritmo de
**atribuição de culpa**: começa no erro final e rastreia para trás, calculando
quanto cada peso contribuiu. É como uma **investigação de acidente** — parte do
resultado e vai encontrando os responsáveis, cada um com sua fração de culpa
(gradiente).

⚠️ **Importante:** backprop **não é** o algoritmo de aprendizado. Backprop só
*calcula os gradientes*. Quem usa esses gradientes para atualizar os pesos é o
gradiente descendente (SGD). São coisas separadas que trabalham juntas.

### Grafos computacionais

Qualquer cálculo pode ser desenhado como um **grafo**: nós são operações/
variáveis, arestas indicam qual resultado alimenta qual operação. Para um
neurônio: `x` e `w` → `×` → `+b` → `g(z)` → `ŷ`.

### A ferramenta: regra da cadeia

**Intuição.** Se mudar `x` afeta `y`, e mudar `y` afeta `z`, então o efeito de
`x` sobre `z` é o **produto** das duas taxas. É só isso — aplicado milhares de
vezes, de forma organizada.

```
Escalar:   dz/dx = (dz/dy)·(dy/dx)
Vetorial:  ∇ₓz = (∂y/∂x)⊤ · ∇ᵧz     ← Jacobiana transposta vezes gradiente
```

**Exemplo numérico:** `y = 3x`, `z = y²`. Então `dz/dx = (2y)·3 = 18x`.
Para `x=2`: `dz/dx = 36`. Confere: `z = (3·2)² = 36`. ✓

### O algoritmo em dois passos

```
FORWARD:  calcula ŷ camada a camada, guardando os valores intermediários
BACKWARD: do erro final até a entrada, calcula ∇W e ∇b de cada camada
```

**Por que é eficiente?** Sem backprop, calcular gradientes de `n` parâmetros
custaria `n` passes. Com backprop, **um único** pass para trás calcula *todos*
os gradientes — porque reutiliza os valores guardados no forward (isso é
**programação dinâmica**).

### Detalhes que apareceram no capítulo

- **Symbol-to-number** (PyTorch eager, Torch, Caffe): calcula o gradiente
  numericamente. Simples e intuitivo.
- **Symbol-to-symbol** (Theano, TensorFlow graph): constrói um *novo grafo* que
  representa o gradiente. Permite derivadas de derivadas e otimizações de
  compilação.
- **Derivadas de ordem superior (Hessiana):** matriz `n×n` — impraticável de
  armazenar com milhões de parâmetros. Usa-se **produtos Hessiana-vetor** e
  **métodos de Krylov** para trabalhar sem montá-la.

---

## 6.6 — Notas históricas (linha do tempo)

| Ano | Marco | Impacto |
|-----|-------|---------|
| 1943 | McCulloch & Pitts: modelo matemático de neurônio | Base teórica |
| 1958 | Rosenblatt: Perceptron | 1º algoritmo de aprendizado |
| 1969 | Minsky & Papert: XOR impossível com 1 camada | **1º inverno da IA** |
| 1986 | Rumelhart, Hinton & Williams: backprop + camadas ocultas | Ressurreição |
| 1989 | Cybenko / Hornik: Teorema da Aproximação Universal | Fundamento teórico |
| 2006 | Hinton: pré-treino, inicialização inteligente | **Renascença do DL** |
| 2012 | AlexNet: GPUs + big data + ReLU | Era moderna |

**As três mudanças que salvaram as redes neurais:**
1. **MSE → Entropia cruzada** (resolve a saturação)
2. **Sigmoide → ReLU** (resolve o gradiente desvanescente)
3. **Pré-treino → Inicialização calibrada** (Xavier/He — não precisa mais de
   pré-treino não-supervisionado)

---

## 📌 Para lembrar (resumo de bolso)

1. **MLP = linha de montagem** de transformações; informação só flui pra frente.
2. **Cada camada** = combinação linear (`Wx+b`) + ativação não-linear (`g`).
3. **Não-linearidade é essencial** — o XOR prova (rede linear não resolve).
4. **A rede aprende** minimizando um custo via gradiente descendente.
5. **Custo vem da máxima verossimilhança** → entropia cruzada (não MSE em
   classificação, por causa da saturação).
6. **Saída conforme a tarefa:** linear (regressão), sigmoide (binária), softmax
   (multiclasse).
7. **ReLU é a ativação padrão** das camadas ocultas.
8. **Profundidade > largura:** exponencialmente mais eficiente.
9. **Backprop calcula gradientes** com a regra da cadeia, num único pass para
   trás (programação dinâmica). Não confundir com o SGD, que faz a atualização.

---

## 🔗 Conexões com outras aulas

- **Aula 01** — retomamos aqui a ideia de neurônio e a estrutura em camadas.
- **Gradiente** e **função de custo** desta aula serão a base de tudo o que vem:
  regularização, otimização, e as arquiteturas convolucionais/recorrentes.
- O **gradiente desvanescente** visto em 6.3 é exatamente o problema que motiva
  técnicas de normalização e arquiteturas com conexões residuais em aulas
  futuras.

---

*Material original preservado em `cap_6.pdf`. Este caderno é um artefato de
estudo derivado — releia junto com a versão navegável `cap_6_resumo.html`.*
