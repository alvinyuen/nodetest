/**
 * Created by alvin on 14/8/2016.
 */


//supports routing to write responses to specific URL
//support multiple templating engine
//routing maps http requests to a callback
//http request - get/post/put/delete
//node helps you map a http get request

var express = require('express');

var app = express();

app.get('/', function(req, res){
    res.json({message: 'welcome to the api'});

});

app.listen(process.env.PORT || 8080);
