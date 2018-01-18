const 	express 	= require('express'),
		app 		= express(),
		bodyParser 	= require('body-parser'),
		mongoose 	= require('mongoose'),
		Campground 	= require('./models/campground'),
		Comment 	= require('./models/comment'),
		seedDB		= require('./seeds');

mongoose.connect('mongodb://localhost/yelpCamp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
seedDB();


app.get('/', function(req, res){
	res.redirect('/campgrounds');
	//res.render('home');
});

// INDEX - Display all CGs
app.get('/campgrounds', function(req, res){
	Campground.find({}, function(err, allCampgrounds) {
		err ? console.log(err) : res.render('campgrounds/index', {campgrounds:allCampgrounds});
	})
});

// NEW - Display form to add new CG
app.get('/campgrounds/new', function(req, res){
	res.render('campgrounds/new');
});

// CREATE - Add new CG to DB
app.post('/campgrounds', function(req, res){
	// get data from form and add to campgrounds array
	const name = req.body.name;
		 image = req.body.image;
		 desc = req.body.description;
		 newCampground = {name: name, image: image, description: desc};
	// Create a new campground and save to db
	Campground.create(newCampground, function(error, newCG){
		error ? console.log(err) : res.redirect('/campgrounds');
	});
});

//SHOW - Show more info about one CG
app.get('/campgrounds/:id', function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCG) {
		err ? console.log(err) : res.render('campgrounds/show', {campground: foundCG});
	});
});

//==================
// COMMENTS ROUTES |
//==================

//NEW - Display form to add new comment
app.get('/campgrounds/:id/comments/new', function(req, res) {
	//find campgrounds by id
	Campground.findById(req.params.id, function(err, campground) {
		err ? console.log(err) : res.render('comments/new', {campground: campground});
	});
});

//SHOW - Show campground info with new comment
app.post('/campgrounds/:id/comments', function(req, res) {
	//find campground by id
	Campground.findById(req.params.id, function(err, campground) {
		err ? res.redirect('/campgrounds')
		: Comment.create(req.body.comment, function(err, comment) {
			err ? console.log(err) : (
				campground.comments.push(comment._id),
				campground.save(),
				res.redirect('/campgrounds/' + campground._id)
			);
		});
	});
	//create new comment
	//connect new comment to campground
	//redirect to CG showpage
});

//===============
// START SERVER |
//===============

app.listen(3000, function(){
	console.log('YelpCamp being served on port 3000');
});

/********************************************************CAMPGROUNDS*********************************************************
* Name 			| Path 					| HTTP Verb | Purpose 									| mongoose method 			*
*===========================================================================================================================*
* Index 		| /campgrounds 			| GET 		| List all CGs 								| Campground.find()			*
*---------------------------------------------------------------------------------------------------------------------------*
* New 			| /campgrounds/new 		| GET 		| Show new CG form 							| n/a 						*
*---------------------------------------------------------------------------------------------------------------------------*
*  ↳ Create 	| /campgrounds 			| POST 		| Add new CG to DB, then redir to that CG 	| Dog.create() 				*
*---------------------------------------------------------------------------------------------------------------------------*
* Show 			| /campgrounds/:id 		| GET 		| Show info about one CG 					| Dog.findById() 			*
*---------------------------------------------------------------------------------------------------------------------------*
* Edit			| /campgrounds/:id/edit | GET 		| Show edit form for one CG 				| Dog.findById() 			*
*---------------------------------------------------------------------------------------------------------------------------*
*  ↳ Update 	| /campgrounds/:id 		| PUT 		| Update CG in DB, then redir to that CG 	| Dog.findByIdAndUpdate() 	*
*---------------------------------------------------------------------------------------------------------------------------*
* Destroy		| /campgrounds/:id 		| DELETE	| Delete CG, then redir to Index 			| Dog.findByIdAndRemove() 	*
****************************************************************************************************************************/

/*********************************************************COMMENTS***************************************************************
* Name 			| Path 								| HTTP Verb | Purpose 									| mongoose method	*
*===============================================================================================================================*
* New 			| /campgrounds/:id/comments/new 	| GET 		| Show new CG form 							| n/a 				*
*-------------------------------------------------------------------------------------------------------------------------------*
*  ↳ Create 	| /campgrounds/:id/comments			| POST 		| Add new CG to DB, then redir to that CG 	| Dog.create() 		*
*-------------------------------------------------------------------------------------------------------------------------------*
********************************************************************************************************************************/