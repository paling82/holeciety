//Included Nodejs Modules
var express = require('express');

//configurate app
var app = express();
app.configure(function(){
	app.set('port', 8080);
	app.set('views', __dirname + '/views/');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session( { secret : 'ultimate-super-sexy-secret-style-gangnam' } ));
	app.use(express.methodOverride());
	app.use(require('stylus').middleware( {src: __dirname + '/public/'} ));
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

//configuratie DB
var dbUrl = "holeciety";
var collections = ["accounts", "scorecards", "courses", "matches"];
GLOBAL.mongojs = require("mongojs");
GLOBAL.db = mongojs.connect(dbUrl, collections);
GLOBAL.ObjectId = mongojs.ObjectId;

require('./routes/router')(app);

app.listen(app.get('port'), function(){
	console.log('Server is now listing on port ' + app.get('port'));
});

