/**
 * Created by alvin on 14/8/2016.
 */



var http = require('http');
var path = require('path');
var user = require('./routes/user');
var routes = require('./routes');
var express = require('express');

var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//development only
//if('development' == app.get('env')){
//    app.use(express.errorHandler());
//}

app.get('/', routes.index);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){

   console.log('Express server listening on port' + app.get('port'));
});



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




