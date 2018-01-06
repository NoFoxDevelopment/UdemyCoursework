//App config
const 	express				= require("express"),
		app 				= express(),
		bodyParser 			= require('body-parser'),
		mongoose 			= require('mongoose'),
		methodOverride 		= require('method-override'),
		expressSanitizer 	= require('express-sanitizer');

mongoose.connect('mongodb://localhost/restfulBlogApp', {useMongoClient: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//Mongoose Model Config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

app.get('/', function(req, res){
	res.redirect('/blogs');
});

//INDEX Route
app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs) {
		err ? console.log(err) : res.render('index', {blogs: blogs});
	});
});

//NEW Route
app.get('/blogs/new', function(req, res){
	res.render('new');
});

//CREATE Route
app.post('/blogs', function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//Create Blog
	Blog.create(req.body.blog, function(err, newPost){
		err ? res.render('new') : res.redirect('/blogs');
	});
});

//SHOW Route
app.get('/blogs/:id', function(req, res){
	Blog.findById(req.params.id, function(err, foundPost){
		err ? console.log(err) : res.render('show', {blog: foundPost});
	});
});

//EDIT Route
app.get('/blogs/:id/edit', function(req, res){
	Blog.findById(req.params.id, function(err, foundPost){
		err ? console.log(err) : res.render('edit', {blog: foundPost});
	})
});

//UPDATE Route
app.put('/blogs/:id', function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedPost){
		err ? console.log(err) : res.redirect('/blogs/' + req.params.id);
	});
});

//DESTROY Route
app.delete('/blogs/:id', function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		err ? console.log(err) : res.redirect('/blogs');
	});
});

app.listen(3000, function(){
	console.log('Being served on port 3000');
});
