const http = require('http')

const server = http.createServer((req,res)=>{
  if(req.url === '/' && req.method === 'GET'){

    res.writeHead(200, {"content-type":'text/plain'})
    res.end("Server is running"); 
  }else{
    res.writeHead(404, {"content-type":'text/plain'})
    res.end("Not found"); 
  }
}
)

server.listen(5000, ()=>{
  console.log("Server is running on http://localhost:5000 !!")
});