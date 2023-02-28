import json

f = open("mapa.json")

mapa = json.load(f)

cidades = mapa['cidades']
ligacoes = mapa['ligações']


def ordCidade(cidade):
    return cidade["nome"]
cidades.sort(key=ordCidade)


nomesCidades = {}
for c in cidades:
    nomesCidades[c["id"]] = c

indexHTML="""
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <!-- Índice -->
                <td valign="top" width=30%>
                    <a name="indice"/>
                    <h3>Índice</h3>
                    <ul>
"""

for c in cidades:
    indexHTML+= f"""
    <li>
        <a href="{c['id']}">{c['nome']}</a>
    </li>
    """

open("./Cidades/index.html", "w").write(indexHTML)

pagHTML=""""""

for c in cidades:
    pagHTML+= f"""
                    <a name={c['id']}></a>
                    <h3>{c['nome']}</h3>
                    <p><b>População: </b>{c['população']}</p>
                    <p><b>Descrição: </b>{c['descrição']}</p>
                    <p><b>Distrito: </b>{c['distrito']}</p>
                    <p><b>Ligações: </b>
                    
                        <ul/>
    """

    for l in ligacoes:
        if l['origem'] == c['id']:
            pagHTML += f"""
                                <li>
                                    <a href="{l['destino']}">{nomesCidades[l['destino']]['nome']}</a> 
                                </li>
            """
        elif l['destino'] == c['id']:
            pagHTML += f"""
                                <li>
                                    <a href="{l['origem']}">{nomesCidades[l['origem']]['nome']}</a>
                                </li>
            """
    
    pagHTML+= f"""
        <p> <a href="index">Voltar à página inicial</a> </p>
    """

    open("./Cidades/" + c['id'] + ".html","w").write(pagHTML)
    pagHTML=""
