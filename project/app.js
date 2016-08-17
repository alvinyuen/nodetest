/**
 * Created by alvin on 14/8/2016.
 */

var http = require('http');
var path = require('path');
var user = require('./routes/user');
var routes = require('./routes');
var express = require('express');
var mongo = require('mongodb').MongoClient;

var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);

app.get('/users', user.list);
// localhost:3000/users

var server = http.createServer(app);
//create a server variable of our own


var io = require('socket.io')(server);
//initialize a socket io why passing in a http server object


server.listen(app.get('port'), function(){
   console.log('Express server listening on port ' + app.get('port'));
});



io.on('connection', function(socket){
   console.log('a user conneceted');


   //tell mongodb to connect to db mongodb://localhost/chatroom
   mongo.connect('mongodb://localhost/chatroom', function(err, db){
      if(err){
         console.warn(err.message);
      } else {
         var collection = db.collection('chat messages');
         //database that hosts all these collection tables, inside each collection there are documents
         //retrieve the latest 10 messages
         var stream = collection.find().sort().limit(10).stream();
         //stream is a event emitter, read from this stream
         stream.on('data', function(chat){
            console.log('emitting chat');
            //emit to channel chat and display chat content
            socket.emit('chat', chat.content);
         })

      }
   });


   //on disconnect
   socket.on('disconnect', function(){
      console.log('user disconnected');
   });


   //receive message from client socket with 'chat' event
   socket.on('chat', function (msg){
      mongo.connect('mongodb://localhost/chatroom', function(err,db){
         if(err){
            console.warn(err.message);
         } else {
            //insert into collection 'chat messages'
            var collection = db.collection('chat messages');
            collection.insert({content:msg}, function(err,doc){
               if(err) {console.warn(err.message);}
               else {console.log('chat message inserted into db: ' + msg);}
            });
         }
      });

      socket.emit('chat', msg); //self emitting
      socket.broadcast.emit('chat', msg); //broadcast to others

   })

});



//http.createServer(app).listen(app.get('port'), function(){
//
//   console.log('Express server listening on port' + app.get('port'));
//});



//var server = http.createServer(function(request, response){
//
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.end('Hello World\n');
//
//});
//
//server.listen(7000);


//npm - package manager for node
//underscore
//lodash
//async
//request
//commander
//express
//optimist
//coffee-script


//mongodb
// show dbs - show all dbs
// use 'database name' - use db
// show collections - show collections in db





