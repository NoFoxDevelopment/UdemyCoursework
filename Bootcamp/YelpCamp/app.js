/**************************************************
***            TO BE MOVED TO DB                ***
**************************************************/

var campgrounds = [
		{name: 'Salmon Creek', image:'https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197__340.jpg'},
		{name: 'Running Elk', image:'https://cdn.pixabay.com/photo/2016/09/18/18/18/tent-camping-1678714__340.jpg'},
		{name: 'Caboose Lake', image:'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg'},
		{name: 'Krat Hills', image:'https://cdn.pixabay.com/photo/2015/09/14/13/57/campground-939588__340.jpg'},
		{name: 'Stony Point', image:'https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg'},
		{name: 'Woodenfrog', image:'https://cdn.pixabay.com/photo/2017/04/05/01/11/bridge-2203661__340.jpg'},
		{name: 'Buck Pond', image:'https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412__340.jpg'},
		{name: 'Hearthstone Point', image:'https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg'},
		{name: 'Devil\'s Tombstone', image:'https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg'},
		{name: 'Beaverkill', image:'https://cdn.pixabay.com/photo/2017/08/07/15/35/travel-2604981__340.jpg'}
	];

/******************************************************
****                START APP CODE                 ****
******************************************************/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index.ejs');
});

app.get('/campgrounds', function(req, res){
	res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

app.post('/campgrounds', function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	//redirect to campgrounds page (get)
	res.redirect('/campgrounds');
});

app.listen(3000, function(){
	console.log('YelpCamp being served on port 3000');
});