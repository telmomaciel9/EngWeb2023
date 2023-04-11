var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET Lista de Pessoas */
router.get('/pessoas', function(req, res, next) {
	console.log(req.url)
	Pessoa.list()
		.then(dados => res.json(dados))
		.catch(erro => res.json({erro : erro, message:"Erro ao listar pessoas"}))
});

/* GET de 1 Pessoa */
router.get('/pessoas/:id', function(req, res, next) {
	Pessoa.getPessoa(req.params.id)
		.then(dados => res.json(dados))
		.catch(erro => res.json({erro : erro}))
});

/* POST */
router.post('/pessoas', function(req, res, next) {
	Pessoa.addPessoa(req.body)
		.then(dados => res.json(dados))
		.catch(erro => res.json({erro : erro}))
});

/* PUT */
router.put('/pessoas/:id', function(req, res, next) {
	Pessoa.updatePessoa(req.body)
		.then(dados => res.json(dados))
		.catch(erro => res.json({erro : erro}))
});

/* PUT */
router.delete('/pessoas/:id', function(req, res, next) {
	Pessoa.deletePessoa(req.params.id)
		.then(dados => res.json(dados))
		.catch(erro => res.json({erro : erro}))
});

module.exports = router;