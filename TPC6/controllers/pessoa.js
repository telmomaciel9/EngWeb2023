const Pessoa = require('../models/pessoa')

// Lista de Pessoas
module.exports.list = () => {
	return Pessoa
		.find()
		.sort({_id:1})
		.then(dados => {
			return dados
		})
		.catch(erro => {
			return erro
		})
}


// 1 Pessoa
module.exports.getPessoa = id => {
	return Pessoa.findOne({_id : id})
		.then(dados => {
			return dados
		})
		.catch(erro => {
			return erro
		})
}

// Adicionar Pessoa
module.exports.addPessoa = p => {
	return Pessoa.create(p)
		.then(dados => {
			return dados
		})
		.catch(erro => {
			return erro
		})
}

// Atualizar Pessoa
module.exports.updatePessoa = p => {
	return Pessoa.updateOne({_id : p._id}, p)
		.then(dados => {
			return dados
		})
		.catch(erro => {
			return erro
		})
}

// Apagar Pessoa
module.exports.deletePessoa = id => {
	return Pessoa.deleteOne({_id : id})
		.then(dados => {
			return dados
		})
		.catch(erro => {
			return erro
		})
}