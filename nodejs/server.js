var http = require('http');

function onRequest(request, response){
    console.log("server listening...")
    response.writeHead(200, {
        'Content-Type':'text/plain'
    }),
    response.write('hello, there');
    response.end()
}

http.createServer(onRequest).listen(3000);