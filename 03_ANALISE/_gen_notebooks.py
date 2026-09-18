# -*- coding: utf-8 -*-
"""
Gerador de notebooks a partir de arquivos-fonte delimitados por sentinela.
Formato do arquivo-fonte:
    %%CELL markdown
    <conteudo...>
    %%CELL code
    <conteudo...>
Cada bloco vira uma celula do notebook. Evita problemas de escape de aspas/f-strings.
"""
import json, sys, io, re

def parse_cells(path):
    with io.open(path, "r", encoding="utf-8") as f:
        text = f.read()
    # separa em blocos comecando por linha "%%CELL <tipo>"
    parts = re.split(r"(?m)^%%CELL[ \t]+(markdown|code)[ \t]*$\n", text)
    # parts[0] = preambulo (ignorado). Depois pares (tipo, conteudo)
    cells = []
    it = iter(parts[1:])
    for tipo, conteudo in zip(it, it):
        # remove exatamente 1 newline final para nao inflar a celula
        if conteudo.endswith("\n"):
            conteudo = conteudo[:-1]
        cells.append((tipo, conteudo))
    return cells

def build_nb(cells):
    nb = {
        "cells": [],
        "metadata": {
            "kernelspec": {"display_name": "Python 3", "name": "python3"},
            "language_info": {"name": "python"},
            "colab": {"provenance": []},
        },
        "nbformat": 4,
        "nbformat_minor": 0,
    }
    for tipo, src in cells:
        # guarda como lista de linhas com \n ao final (padrao Jupyter)
        lines = src.splitlines(keepends=True)
        cell = {"cell_type": tipo, "metadata": {}, "source": lines}
        if tipo == "code":
            cell["execution_count"] = None
            cell["outputs"] = []
        nb["cells"].append(cell)
    return nb

if __name__ == "__main__":
    src_path, out_path = sys.argv[1], sys.argv[2]
    cells = parse_cells(src_path)
    nb = build_nb(cells)
    with io.open(out_path, "w", encoding="utf-8") as f:
        json.dump(nb, f, ensure_ascii=False, indent=1)
    print(f"OK: {out_path} <- {src_path} ({len(cells)} celulas)")
