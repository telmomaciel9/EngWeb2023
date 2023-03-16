var http = require('http')
var axios = require('axios')
var template = require('./template')
const { parse } = require('querystring');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var server = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

        switch(req.method){
            case "GET": 
                if(req.url == "/"){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(template.tasksPage(tasks))
                        })  
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
                            res.end()   
                        })
                }
                else if (req.url.match(/\/edit\/\d+/)){
			    	var idTask = req.url.split("/")[2]

			    	axios.get("http://localhost:3000/tasks")
			    		.then(response => {
			    			var tasks = response.data
                            var task = null

			    			for (let i=0 ; i<tasks.length ; i++)
			    			{
			    				if (tasks[i].id == idTask)
			    					var task = tasks[i]
			    			}

			    			res.writeHead(200,  {'Content-Type':'text/html ; charset="utf-8"'})
			    			res.end(template.tasksPage(tasks, task))
			    			})
			    		.catch((erro) => {
			    			res.writeHead(200,  {'Content-Type':'text/html ; charset="utf-8"'})
			    			res.end('<p>Erro no acesso à lista de tarefas' + erro + '</p>')
			    		})
			    }
			    else if (req.url.match(/\/done\/\d+/)){
                    
			    	let idTask = req.url.split("/")[2]

			    	axios.get("http://localhost:3000/tasks")
			    		.then(response => {
			    			var tasks = response.data
                            var task = null

			    			for (let i=0 ; i<tasks.length ; i++)
			    			{
			    				if (tasks[i].id == idTask)
			    					task = tasks[i]
			    			}

			    			task.estado = "completa"


			    			axios.put('http://localhost:3000/tasks/'+task.id, task)
			    				.then(response => {
			    					res.writeHead(301, {Location:"http://localhost:7777/"})
			    					res.end()
			    				})
			    				.catch(erro => {
			    					res.writeHead(201,  {'Content-Type':'text/html ; charset="utf-8"'})
			    					res.end(`<p>Error: ${erro}`)
			    				})
			    		})
			    		.catch(erro => {
			    			res.writeHead(200,  {'Content-Type':'text/html ; charset="utf-8"'})
			    			res.end('<p>Erro no acesso à base de dados ' + erro + '</p>')
			    		})
			    }
			    break
            case "POST":
                if (req.url == "/")
			    {
			    	collectRequestBodyData(req, result => {
			    		if (result){
			    				result.estado = "aFazer"    
			    				axios.post('http://localhost:3000/tasks', result)
			    					.then(response => {
			    						res.writeHead(301, {Location:"http://localhost:7777/"})
			    						res.end()
			    					})
			    					.catch(erro => {
			    						res.writeHead(201,  {'Content-Type':'text/html ; charset="utf-8"'})
			    						res.end(`<p>Error: ${erro} </p>`)
			    					})
			    		}

			    	})
			    }
			    else if (req.url.match(/\/edit\/\d+/))
			    {
			    	collectRequestBodyData(req, result => {
			    		if (result)
			    		{
			    			result.estado = "aFazer"
			    			axios.put('http://localhost:3000/tasks/'+result.id, result)
			    				.then(response => {
			    					res.writeHead(301, {Location:"http://localhost:7777/"})
			    					res.end()
			    				})
			    				.catch(error => {
			    					res.writeHead(201,  {'Content-Type':'text/html ; charset="utf-8"'})
			    					res.end(`<p>Error: ${error}`)
			    				})
			    		}
			    		else
			    		{
			    			res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
			    			res.end("<p>Unable to collect data from body...</p>")
			    		}
			    	})

			    }
            
        }

    
})

server.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



