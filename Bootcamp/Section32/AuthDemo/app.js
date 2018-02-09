const express               = require('express'),
			mongoose              = require('mongoose'),
			passport              = require('passport'),
			LocalStrategy         = require('passport-local'),
			passportLocalMongoose = require('passport-local-mongoose'),
			bodyParser            = require('body-parser'),
			User                  = require ('./models/user.js');

mongoose.connect('mongodb://localhost/plebianpalace');

const app = express();

app.set('view engine', 'ejs');

app.use(require('express-session')({
	secret: "A still more glorious dawn awaits",
	resave: false,
	saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//======
//ROUTES
//======

app.get('/', function(req, res) {
	res.render('login');
});

app.get('/secret', function(req, res) {
	res.render('secret');
});


//Auth Routes
//show signup form
app.get('/register', function(req, res) {
	res.render('register');
});

//user signup handling
app.post('/register', function(req, res) {
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		err ? (
			console.log(err),
			res.render('register')
		) : (
			passport.authenticate('local')(req, res, function(){
				res.redirect('/secret');
			})
		);
	});
});

//Login Routes
//show login form
app.get('/login', function(req, res) {
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/secret',
	failureRedirect: '/login'
}) ,function(req, res) {
});

app.listen(5000, function() {
	console.log('app being served on port 5000...');
});
