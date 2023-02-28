var http = require('http')
var url = require('url')
var fs= require('fs')

var myServer = http.createServer(function(req, res){
    console.log(req.method + " " + req.url)

    var pedido = url.parse(req.url, true).pathname

    if (pedido== '/') {
        fs.readFile("./Cidades/index.html", function(err,data){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            if(err){
                res.write("ERRO: na leitura do ficheiro :: " + err)
            }
            else{
                res.write(data)
            }
            res.end()
        })
    }
    else {  
        fs.readFile("./Cidades" + pedido + ".html", function(err,data){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            if(err){
                res.write("ERRO: na leitura do ficheiro :: " + err)
            }
            else{
                res.write(data)
            }
            res.end()
        })
    }
    
})

myServer.listen(7777)

console.log("Servidor à escuta na porta 7777...")