/**
 * Created by alvin on 14/8/2016.
 */

var net = require('net');

var client = new net.Socket();

client.connect(7000,  "127.0.0.1");

//on data event, run the callback
client.on('data', function(data){
    console.log('Data:'+ data);
    client.destroy();
});

//Add a 'close' event handler for the client socket
client.on('close', function(){
    console.log('Connection closed');
});