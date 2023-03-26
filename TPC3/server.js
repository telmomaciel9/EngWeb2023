const http = require('http')
const url = require('url')
const axios = require('axios')
const my_pages = require('./my_pages')
const querystring = require('querystring')

const port = 7777

http.createServer( (req, res) => {
	var d = new Date().toISOString().substring(0,16)
	console.log(req.method + " " + req.url + " " + d)

	var pedido = url.parse(req.url, true).path

	if (pedido == "/") 
	{
		res.writeHead(200, {'Content-Type':'text/html; charset="utf-8"'})

		res.end(my_pages.genMainPage())
	}
	else if (pedido == "/pessoas" || pedido == "/pessoas/")
	{
		axios.get('http://localhost:3000/pessoas/')
			.then( (resp) => {
				var pessoas = resp.data

				res.writeHead(200,{'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genListPage(pessoas, "Lista de Pessoas"))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados: " + error + "</p>")

			})
	}
	else if (pedido.match(/\/pessoas\/p\d+/))
	{
		let id = pedido.substring(9)
		axios.get('http://localhost:3000/pessoas/' + id)
			.then( (resp) => {
				var pessoa = resp.data

				res.writeHead(200,{'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genPessoaPage(pessoa))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else if (pedido == "/pessoas/ord")
	{
		axios.get('http://localhost:3000/pessoas/')
			.then( (resp) => {
				var pessoas = resp.data

				pessoas.sort( (pessoa1, pessoa2) => (pessoa1.nome < pessoa2.nome) ?-1 :1)

				res.writeHead(200,{'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genListPage(pessoas, "Lista de Pessoas Ordenada"))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else if (pedido == "/pessoas/sexo")
	{
		axios.get('http://localhost:3000/pessoas/')
			.then( (resp) => {
				var pessoas = resp.data

				res.writeHead(200,{'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genListByGender(pessoas))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else if (pedido == "/pessoas/desporto")
	{
		axios.get('http://localhost:3000/pessoas')
			.then( (resp) => {
				var pessoas = resp.data

				res.writeHead(200, {'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genSportsPage(pessoas, "Distribuição por Desporto"))
			})
	}
	else if (pedido.match(/pessoas\/desporto\/\w+/))
	{
		axios.get('http://localhost:3000/pessoas')
			.then( (resp) => {
				var pessoas = resp.data
				let desporto = decodeURI(pedido.substring(18))

				pessoasFiltrado = pessoas.filter( (p) => p.desportos.includes(desporto))

				res.writeHead(200, {'Content-Type':'text/html; charset="utf-8"'})
				res.end(my_pages.genListPage(pessoasFiltrado, "Lista de Pessoas que Praticam " + desporto))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else if (pedido == "/pessoas/profissoes")
	{
		axios.get('http://localhost:3000/pessoas')
			.then((resp) => {
				var pessoas = resp.data
				
				res.writeHead(200, {'Content-Type':'text/html; charset="utf-8"'})
				res.end(my_pages.genWorkPage(pessoas))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else if (pedido.match(/pessoas\/profissoes\/\w+/))
	{
		axios.get('http://localhost:3000/pessoas')
			.then( (resp) => {
				var pessoas = resp.data
				let profissao = decodeURI(pedido.substring(20))

				var pessoasFiltrado = pessoas.filter( (p) => p.profissao==profissao)

				res.writeHead(200, {'Content-Type':'text/html; charset="utf-8"'})
				res.end(my_pages.genListPage(pessoasFiltrado, "Lista de Pessoas que trabalham como: " + profissao))
			})
			.catch( (error) => {
				res.writeHead(404, {'Contet-Type': 'text/html; charset="utf-8"'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else if (pedido.match(/\/pessoas\?(\w+=\w+)+/))
	{
		var query = url.parse(req.url, true).query
		var qs = querystring.stringify(query)

		axios.get('http://localhost:3000/pessoas?' + qs)
			.then( (resp) => {
				var pessoas = resp.data
				
				res.writeHead(200, {'Content-Type':'text/html ; charset="utf-8"'})
				res.end(my_pages.genListPage(pessoas, "Lista de Pessoas"))
			})
			.catch( (error) => {
				res.writeHead(200, {'Content-Type':'text/html ; charset="utf-8"'})
				res.end("<p>ERRO: Não foi possível aceder à Base de Dados</p>")
			})
	}
	else
	{
		res.writeHead(200, {'Content-Type':'text/html ; charset="utf-8"'})
		res.end("<p>ERRO: Operação não suportada</p>")
	}
}).listen(port)

console.log("Servidor à escuta na porta " + port)
