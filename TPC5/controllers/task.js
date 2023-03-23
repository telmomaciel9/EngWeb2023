var axios = require('axios')

module.exports.list = () => {
	return axios.get("http://localhost:3000/tasks")
		.then(answer => {
			return answer.data
		})
		.catch(error => {
			return error
		})
}

module.exports.getTask = id => {
	return axios.get("http://localhost:3000/tasks/"+id)
		.then(answer => {
			return answer.data
		})
		.catch(error => {
			return error
		})
}

module.exports.addTask = task => {
	return axios.post("http://localhost:3000/tasks/", task)
		.then(answer => {
			return answer.data
		})
		.catch(error => {
			return error
		})
}

module.exports.editTask = task => {
	return axios.put("http://localhost:3000/tasks/"+task.id, task)
		.then(answer => {
			return answer.data
		})
		.catch(error => {
			return error
		})
}

module.exports.deleteTask = id => {
	return axios.delete("http://localhost:3000/tasks/"+id)
		.then(answer => {
			return answer.data
		})
		.catch(error => {
			return error
		})
}