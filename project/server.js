
var net = require('net');

var server = net.createServer(function(socket){

    console.log("Connection from " + socket.remoteAddress);
    socket.end("Hello Server\n");
});

server.listen(7000, "127.0.0.1");
