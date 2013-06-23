
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , mongoose = require('mongoose')




var app = express();

// all environments
app.set('port', 3000);
app.use(express.favicon());
app.use(app.router);
app.use('/json', express.static(__dirname + '/public/json'));
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

