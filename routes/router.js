var register = require('./register');
var login = require('./login');

module.exports = function(app){
	
	app.get('/', function (req, res){
		res.render('home');
		//res.end("hallo");
	});

	//Registering new User
	app.get('/register', function (req, res){
		//res.render('register');
		register.findUsers(req, res);
	});

	app.get('/login', function (req, res){
		res.render('login')
	});

	app.post('/dashboard', function (req, res){
		login.manualLogin(req.param('user'), req.param('password'), function (err, output){
			if(!output){
				res.send(err, 400);
			} else {
				req.session.user = output;
				req.session.password = req.param('password');
				res.render('wall');
			}
		});
	});

	app.get('/dashboard', function (req, res){
		if(req.session.user==undefined || req.session.password == undefined){
			res.render('login');
		} else {
			login.autoLogin(req.session.user, req.session.password, function (output){
				if(!output){
					res.render('login', {error : 'Something went wrong with autologin.'});
				} else {
					res.render('wall');
				}
			});
		}
	});

	app.get('/friends', function (req, res){
		res.render('friends');
	});

	app.get('/scorecard', function (req, res){
		res.render('scorecard');
	});

	app.get('/matches', function (req, res){
		res.render('matches');
	});
}