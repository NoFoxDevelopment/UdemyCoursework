const 	express 	= require('express'),
		app 		= express(),
		bodyParser 	= require('body-parser'),
		mongoose 	= require('mongoose');

mongoose.connect('mongodb://localhost/yelpCamp', { useMongoClient: true });
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: 			String,
	image: 			String,
	description: 	String
});

var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function(req, res){
	res.redirect('/campgrounds');
	//res.render('home');
});

// INDEX - Display all CGs
app.get('/campgrounds', function(req, res){
	Campground.find({}, function(err, allCampgrounds) {
		err ? console.log(err) : res.render('index', {campgrounds:allCampgrounds});
	})
});

// NEW - Display form to add new CG
app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

// CREATE - Add new CG to DB
app.post('/campgrounds', function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	// Create a new campground and save to db
	Campground.create(newCampground, function(error, newCG){
		error ? console.log(err) : res.redirect('/campgrounds');
	});
});

//SHOW - Show more info about one CG
app.get('/campgrounds/:id', function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id, function(err, foundCG){
		err ? console.log(err) : res.render('show', {campground: foundCG});
	});
});

app.listen(3000, function(){
	console.log('YelpCamp being served on port 3000');
});

/************************************************************************************************
* Name 			Path 					HTTP Verb 	Purpose 									*
*===============================================================================================*
* Index 		/campgrounds 			GET 		List all CGs 								*
* New 			/campgrounds/new 		GET 		Show new CG form 							*
*  -Create 		/campgrounds 			POST 		Add new CG to DB, then redir to that CG 	*
* Show 			/campgrounds/:id 		GET 		Show info about one CG 						*
* Edit			/campgrounds/:id/edit 	GET 		Show edit form for one CG 					*
*  -Update 		/campgrounds/:id 		PUT 		Update CG in DB, then redir to that CG 		*
* Destroy		/campgrounds/:id 		DELETE		Delete CG, then redir to Index 				*
************************************************************************************************/