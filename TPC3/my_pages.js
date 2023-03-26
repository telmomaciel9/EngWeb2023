

exports.genMainPage = function () {
	pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>TPC3 - Índice</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
		</head>
		<body>
			<div class="w3-card">
				<header class="w3-container w3-deep-purple w3-xlarge">
					<p>Índice</p>
				</header>	

				<ul class="w3-ul w3-large w3-hoverable">
					<li class="w3-padding-medium">
						<a href="http://localhost:7777/pessoas/">
							Lista de Pessoas 
						</a>
					</li>
					<li class="w3-padding-medium"> 
						<a href="http://localhost:7777/pessoas/ord">
							Lista de Pessoas Ordenadas
						</a>
					</li>
					<li class="w3-padding-medium">
						<a href="http://localhost:7777/pessoas/sexo">
							Distribuição por Sexo
						</a>
					</li>
					<li class="w3-padding-medium">
						<a href="http://localhost:7777/pessoas/desporto">
							Distribuição por Desporto
						</a>
					</li>
					<li class="w3-padding-medium">
						<a href="http://localhost:7777/pessoas/profissoes">
							Top 10 Profissões
						</a>
					</li>
				</ul>
			</div>
		</body>
	</html>
	`

	return pagHTML
}

exports.genListPage = function (lista, titulo) {
	pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>TPC3 - ${titulo}</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
		</head>
		<body>
			<div class="w3-card">
				<header class="w3-container w3-deep-purple w3-xlarge">
					<h1>${titulo}</h1>
				</header>	

				<table class="w3-table-all w3-hoverable">
					<tr>
						<th>Id</th>
						<th>
							<a href="http://localhost:7777/pessoas/">
								Nome
							</a>
						</th>
						<th>Idade</th>
						<th>Sexo</th>
						<th>Cidade</th>
					</tr>`

	for (let i=0 ; i<lista.length ; i++)
	{
		let pessoa = lista[i]

		pagHTML += `
						<tr>
							<td>${pessoa.id}</td>
							<td>${pessoa.nome}</td>
							<td>${pessoa.idade}</td>
							<td>${pessoa.sexo}</td>
							<td>${pessoa.morada.cidade}</td>
						</tr>
		`
	}

	pagHTML += `
				</table>

				<a href="http://localhost:7777">
					<p class="w3-centered">Voltar ao Índice</p>
				</a>

				<footer class="w3-container w3-deep-purple">
					<h5>Generated by the server</h5>
				</footer>

			</div>
		</body>
	</html>
	`
	return pagHTML
}

exports.genListByGender = function (lista) 
{
	let numMasc = 0
	let numOutro = 0
	let numFem = 0

	for (let i=0 ; i<lista.length ; i++)
	{
		if (lista[i].sexo == "masculino")
		{
			numMasc++
		}
		else if (lista[i].sexo == "outro")
		{
			numOutro++
		}
		else if (lista[i].sexo == "feminino")
		{
			numFem++
		}
	}

	pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>TPC3 - Distribuição por Sexo</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
		</head>
		<body>
			<div class="w3-card">
				<header class="w3-container w3-deep-purple w3-xlarge">
					<h1>Distribuição por Sexo</h1>
				</header>	

				<table class="w3-table-all w3-hoverable">
					<tr>
						<th>Sexo</th>
						<th>Número de Pessoas</th>
					</tr>
					<tr>
						<td>Masculino</td>
						<td>
							<a href="http://localhost:7777/pessoas?sexo=masculino">
								${numMasc}
							</a>
						</td>
					</tr>
					<tr>
						<td>Feminino</td>
						<td>
							<a href="http://localhost:7777/pessoas?sexo=feminino">
								${numFem}
							</a>
						</td>
					</tr>
					<tr>
						<td>Outro</td>
						<td>
							<a href="http://localhost:7777/pessoas?sexo=outro">
								${numOutro}
							</a>
						</td>
					</tr>
				</table>

				<a href="http://localhost:7777">
					<p class="w3-centered">Voltar ao Índice</p>
				</a>

				<footer class="w3-container w3-deep-purple">
					<h5>Generated by the server</h5>
				</footer>

			</div>
		</body>
	</html>
	`
	return pagHTML
}


exports.genSportsPage = function(lista)
{
	var dist = {}
	
	for (let i = 0 ; i<lista.length ; i++)
	{
		let pessoa = lista[i]
		for (let j=0 ; j<pessoa.desportos.length ; j++)
		{
			let desporto = pessoa.desportos[j]
			if (dist[desporto] == undefined)
			{
				dist[desporto] = 0
			}
			dist[desporto]++
		}
	}

	pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>TPC3 - Distribuição por Desportos Praticados</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
		</head>
		<body>
			<div class="w3-card">
				<header class="w3-container w3-deep-purple w3-xlarge">
					<h1>Distribuição por Desportos Praticados</h1>
				</header>	

				<table class="w3-table-all w3-hoverable">
					<tr>
						<th>Desporto</th>
						<th>Número de Pessoas</th>
					</tr>`

	Object.keys(dist).forEach( (key) => {
		pagHTML += `
						<tr>
							<td>${key}</td>
							<td>
								<a href="http://localhost:7777/pessoas/desporto/${key}">
									${dist[key]}
								</a>
							</td>
						</tr>
		`
	})

	pagHTML += `
				</table>

				<a href="http://localhost:7777">
					<p class="w3-centered">Voltar ao Índice</p>
				</a>

				<footer class="w3-container w3-deep-purple">
					<h5>Generated by the server</h5>
				</footer>

			</div>
		</body>
	</html>
	`

	return pagHTML
}

exports.genWorkPage = function(lista)
{
	var dist = {}
	
	for (let i = 0 ; i<lista.length ; i++)
	{
		let pessoa = lista[i]
		let profissao = pessoa.profissao
		if (dist[profissao] == undefined)
		{
			dist[profissao] = 0
		}
		dist[profissao]++
	}

	pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>TPC3 - Top 10 Profissões</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
		</head>
		<body>
			<div class="w3-card">
				<header class="w3-container w3-deep-purple w3-xlarge">
					<h1>Top 10 Profissões</h1>
				</header>	

				<table class="w3-table-all w3-hoverable">
					<tr>
						<th>Profissão</th>
						<th>Número de Pessoas</th>
					</tr>`

	Object.keys(dist).forEach( (key) => {
		pagHTML += `
						<tr>
							<td>${key}</td>
							<td>
								<a href="http://localhost:7777/pessoas/profissoes/${key}">
									${dist[key]}
								</a>
							</td>
						</tr>
		`
	})

	pagHTML += `
				</table>

				<a href="http://localhost:7777">
					<p class="w3-centered">Voltar ao Índice</p>
				</a>

				<footer class="w3-container w3-deep-purple">
					<h5>Generated by the server</h5>
				</footer>

			</div>
		</body>
	</html>
	`

	return pagHTML
}

exports.genPessoaPage = function (pessoa) {
	var pagHTML = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<title>TPC3 - Página de ${pessoa.nome}</title>
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
		</head>
		<body>
			<div class="w3-card-4">
				<header class="w3-container w3-deep-purple">
					<h1>${pessoa.nome}</h1>
				</header>

				<div class="w3-container">`

	pagHTML += `
					<p>${pessoa.id}</p>
					<p>${pessoa.nome}</p>
					<p>${pessoa.idade}</p>
					<p>${pessoa.sexo}</p>
					<p>${pessoa.morada.cidade}</p>
	`

	pagHTML += `
					</div>

					<footer class="w3-container w3-deep-purple">
						<h5>Generated by the server</h5>
					</footer>
				</div> 
		</body>
	</html>
	`

	return pagHTML
}

