
/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
  //, user = require('./routes/user')
  , http = require('http')
  //, path = require('path');
  , mongoose = require('mongoose')



//var secrets = require('./secrets');
//global.mongodb = mongoose.createConnection(secrets.mongoURI);    


//express routes
//var route = require('./route');
//var route = require('./mongoroute');







var app = express();

// all environments
app.set('port', 3000);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(app.router);
app.use('/json', express.static(__dirname + '/public/json'));
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', route.simple);
//app.get('/programs', route.programs);
//app.get('/partnerinstitutions', route.partnerinstitutions);
//app.get('/programspartnerinstitutions', route.programspartnerinstitutions);
//app.get('/programsclasslevels', route.programsclasslevels);
//app.get('/packages', route.packages);



//console.log(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

