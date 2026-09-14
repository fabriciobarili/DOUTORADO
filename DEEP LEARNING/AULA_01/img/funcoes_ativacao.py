# AULA_01/img/funcoes_ativacao.py
# Gera funcoes_ativacao.svg — a versão "de verdade" das curvas de ativação,
# calculada com os valores exatos das funções (reprodutível).
#
# Por que este script existe: o SVG desenhado à mão é ótimo para leitura rápida,
# mas se você quiser as curvas com precisão numérica (ou mudar o intervalo),
# rode este arquivo. Requer: numpy e matplotlib (pip install numpy matplotlib).
#
# Uso:  python funcoes_ativacao.py   → salva funcoes_ativacao.svg nesta pasta

import numpy as np
import matplotlib.pyplot as plt

# Eixo x: 200 pontos entre -5 e 5 (suave o bastante para a curva não "quebrar")
x = np.linspace(-5, 5, 200)

# As três funções de ativação vistas na aula
relu = np.maximum(0, x)          # ReLU: zera o negativo, deixa passar o positivo
sigmoid = 1 / (1 + np.exp(-x))   # sigmoid: espreme tudo para o intervalo (0, 1)
tanh = np.tanh(x)                # tanh: mesma forma em S, mas de -1 a 1

fig, ax = plt.subplots(figsize=(5, 3.2))
ax.plot(x, relu, label="ReLU", color="#2563eb", linewidth=2.5)
ax.plot(x, sigmoid, label="sigmoid (0 a 1)", color="#d97706", linewidth=2)
ax.plot(x, tanh, label="tanh (-1 a 1)", color="#7c3aed", linewidth=2)

# Eixos cruzando na origem, para enxergar o comportamento em torno do zero
ax.axhline(0, color="#334155", linewidth=0.8)
ax.axvline(0, color="#334155", linewidth=0.8)
ax.set_ylim(-1.5, 2.5)          # recorta o topo do ReLU (que cresce sem limite)
ax.set_xlabel("x")
ax.set_title("Funções de ativação")
ax.legend(loc="upper left", fontsize=8)
fig.tight_layout()
fig.savefig("funcoes_ativacao.svg")
print("Salvo: funcoes_ativacao.svg")
