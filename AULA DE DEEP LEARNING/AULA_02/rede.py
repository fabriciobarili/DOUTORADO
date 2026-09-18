import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

# ---------------------------------------------------------------------------
# Arquitetura (conforme Teoria.txt):
#   Camada oculta:  A1.1 = g(x1*w1 + x2*w2 + Bias1)
#                   A1.2 = g(x1*w3 + x2*w4 + Bias2)
#   Saída:          A2   = g(A1.1*w5 + A1.2*w6 + Bias3)
#                   y'   = A2
# ---------------------------------------------------------------------------

# Pesos: shape (entradas, neurônios)
W1 = np.random.randn(2, 2)   # w1,w2 (→ A1.1) e w3,w4 (→ A1.2)
b1 = np.zeros((1, 2))        # Bias1, Bias2

W2 = np.random.randn(2, 1)   # w5 (A1.1→A2), w6 (A1.2→A2)
b2 = np.zeros((1, 1))        # Bias3

# ---------------------------------------------------------------------------
# Funções de ativação
# Sigmoid: 1/(1+e^(-x))  — quanto mais positivo, maior o peso da info
# ReLU:    max(0, x)      — abaixo de zero envia 0, positivo envia x
# ---------------------------------------------------------------------------

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def sigmoid_deriv(z):
    s = sigmoid(z)
    return s * (1 - s)

def relu(z):
    return np.maximum(0, z)

def relu_deriv(z):
    return (z > 0).astype(float)


# Escolha da função de ativação ('sigmoid' ou 'relu')
ACTIVATION = 'sigmoid'

def activate(z):
    return sigmoid(z) if ACTIVATION == 'sigmoid' else relu(z)

def activate_deriv(z):
    return sigmoid_deriv(z) if ACTIVATION == 'sigmoid' else relu_deriv(z)


# ---------------------------------------------------------------------------
# Forward pass
# ---------------------------------------------------------------------------

def forward(X):
    Z1 = X @ W1 + b1      # somatório para cada neurônio da camada oculta
    A1 = activate(Z1)     # A1.1 = coluna 0, A1.2 = coluna 1

    Z2 = A1 @ W2 + b2     # somatório do neurônio de saída
    A2 = sigmoid(Z2)      # y' — saída final sempre sigmoid (classificação)

    cache = (X, Z1, A1, Z2, A2)
    return A2, cache


# ---------------------------------------------------------------------------
# Loss: MSE — erro quadrático médio (conforme Teoria.txt)
#   Loss = (1/m) * Σ (y - y')²
# ---------------------------------------------------------------------------

def mse(Y_pred, Y):
    return np.mean((Y - Y_pred) ** 2)


# ---------------------------------------------------------------------------
# Backward pass (gradiente do MSE)
#   dL/dA2 = -2*(Y - A2)/m  →  simplificado como (A2 - Y)
# ---------------------------------------------------------------------------

def backward(cache, Y, lr=1e-3):
    global W1, b1, W2, b2
    X, Z1, A1, Z2, A2 = cache
    m = X.shape[0]

    dA2 = (A2 - Y) / m            # dL/dy'
    dZ2 = dA2 * sigmoid_deriv(Z2)
    dW2 = A1.T @ dZ2
    db2 = dZ2.sum(axis=0, keepdims=True)

    dA1 = dZ2 @ W2.T
    dZ1 = dA1 * activate_deriv(Z1)
    dW1 = X.T @ dZ1
    db1 = dZ1.sum(axis=0, keepdims=True)

    W2 -= lr * dW2
    b2 -= lr * db2
    W1 -= lr * dW1
    b1 -= lr * db1


# ---------------------------------------------------------------------------
# Dados: ((x1, x2), y) — porta XOR
# ---------------------------------------------------------------------------
X = np.array([[0, 0],
              [0, 1],
              [1, 0],
              [1, 1]], dtype=float)

Y = np.array([[0], [1], [1], [0]], dtype=float)

# ---------------------------------------------------------------------------
# Treinamento
# Learning rate = 1e-3 (conforme Teoria.txt: "É o valor de y * 1e-³")
# ---------------------------------------------------------------------------
epochs = 20_000
lr = 1e-3

print(f"Treinando com ativação={ACTIVATION}, lr={lr}, epochs={epochs}\n")

historico_loss = []

for epoch in range(epochs):
    Y_pred, cache = forward(X)
    backward(cache, Y, lr=lr)

    loss = mse(Y_pred, Y)
    historico_loss.append(loss)

    if epoch % 2000 == 0:
        print(f"Época {epoch:6d} | MSE Loss: {loss:.6f}")

print("\nPredições finais (y' vs y):")
Y_pred, _ = forward(X)
predicoes = []
for xi, yi, yp in zip(X, Y, Y_pred):
    y_bin = 1 if yp[0] >= 0.5 else 0   # função STEP
    certo = "✓" if y_bin == int(yi[0]) else "✗"
    predicoes.append((xi, int(yi[0]), yp[0], y_bin, certo))
    print(f"  ({int(xi[0])},{int(xi[1])}) → y={int(yi[0])}  y'={yp[0]:.4f}  step={y_bin} {certo}")

# ---------------------------------------------------------------------------
# Gráficos de treinamento
# ---------------------------------------------------------------------------
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
fig.suptitle(f"Treinamento — ativação={ACTIVATION}, lr={lr}", fontsize=13)

# Gráfico 1: MSE ao longo das épocas
axes[0].plot(historico_loss, color='steelblue', linewidth=1.2)
axes[0].set_title("MSE Loss por Época")
axes[0].set_xlabel("Época")
axes[0].set_ylabel("Loss  (y − y')²  médio")
axes[0].set_yscale('log')
axes[0].grid(True, alpha=0.3)

# Gráfico 2: y esperado vs y' predito para cada amostra
rotulos = [f"({int(p[0][0])},{int(p[0][1])})" for p in predicoes]
y_real  = [p[1] for p in predicoes]
y_pred  = [p[2] for p in predicoes]
x_pos   = range(len(predicoes))

axes[1].bar(x_pos, y_real,  width=0.4, align='edge',  label="y esperado",
            color='steelblue', alpha=0.7)
axes[1].bar([p + 0.4 for p in x_pos], y_pred, width=0.4, align='edge',
            label="y' predito", color='tomato', alpha=0.7)
axes[1].axhline(0.5, color='gray', linestyle='--', linewidth=0.8, label='limiar STEP=0.5')
axes[1].set_title("Predições Finais vs Esperado")
axes[1].set_xlabel("Amostra (x1, x2)")
axes[1].set_ylabel("Valor")
axes[1].set_xticks([p + 0.4 for p in x_pos])
axes[1].set_xticklabels(rotulos)
axes[1].set_ylim(0, 1.2)
axes[1].legend()
axes[1].grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.show()
