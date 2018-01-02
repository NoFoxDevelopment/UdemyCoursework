//App config
const express		= require("express"),
		app 		= express(),
		bodyParser 	= require('body-parser'),
		mongoose 	= require('mongoose');

mongoose.connect('mongodb://localhost/restfulBlogApp');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose Model Config
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

Blog.create({
	title: 'Test Blog Post',
	image: 'https://source.unsplash.com/hAsyQkjbPMM',
	body: 'Cillum qui deserunt et proident pariatur sed tempor occaecat et occaecat aliquip officia aute adipisicing veniam deserunt laboris aliquip occaecat adipisicing duis magna eu veniam ut id dolor duis et magna reprehenderit cillum occaecat cupidatat commodo amet dolor et pariatur et amet cupidatat sed elit aliquip reprehenderit amet dolore reprehenderit reprehenderit sint anim anim sint velit irure aliqua ex id consectetur dolor ex sed reprehenderit aliquip eiusmod tempor et laborum pariatur culpa occaecat irure ut eu qui fugiat et do nostrud ex esse esse anim aliquip in tempor in quis in et aliquip culpa est in et elit fugiat aliquip nostrud minim do nostrud velit amet aute culpa aliqua in reprehenderit laboris proident sint veniam reprehenderit anim sed proident laboris dolore ex magna excepteur nisi minim in elit et est ad minim aliquip sit consectetur nisi sit elit qui sit ex quis amet consequat nulla est voluptate fugiat ut aute labore dolor officia quis ea do proident incididunt commodo ut et commodo anim ea aute consectetur officia aute tempor dolor pariatur quis nostrud ut aute incididunt minim adipisicing aute ut in aliquip in commodo aliqua.'
});
//RESTful routes



app.listen(3000, function(){
	console.log('Being served on port 3000');
});
