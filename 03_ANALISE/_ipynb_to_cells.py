# -*- coding: utf-8 -*-
"""
Conversor reverso: notebook (.ipynb) -> arquivo-fonte de celulas (.txt).
Produz o formato que _gen_notebooks.py consome (sentinelas %%CELL).

Regra de round-trip exato:
    para cada celula, emitir  "%%CELL <tipo>\n" + "".join(source) + "\n"
    _gen_notebooks.py remove exatamente 1 newline final ao reparsear,
    entao o conteudo "".join(source) volta identico.

Uso: python _ipynb_to_cells.py <entrada.ipynb> <saida.txt>
"""
import json, sys, io

def ipynb_to_cells(nb_path, out_path):
    with io.open(nb_path, "r", encoding="utf-8") as f:
        nb = json.load(f)
    linhas = []
    for i, cell in enumerate(nb["cells"]):
        tipo = cell["cell_type"]
        if tipo not in ("markdown", "code"):
            raise ValueError(
                f"Celula {i} tem tipo '{tipo}' nao suportado pelo gerador "
                f"(apenas 'markdown'/'code')."
            )
        src = cell.get("source", [])
        conteudo = "".join(src) if isinstance(src, list) else src
        linhas.append(f"%%CELL {tipo}\n")
        linhas.append(conteudo)
        linhas.append("\n")
    with io.open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write("".join(linhas))
    print(f"OK: {out_path} <- {nb_path} ({len(nb['cells'])} celulas)")

if __name__ == "__main__":
    ipynb_to_cells(sys.argv[1], sys.argv[2])
