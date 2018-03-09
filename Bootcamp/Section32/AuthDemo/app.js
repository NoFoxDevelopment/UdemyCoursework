var express = require ('express');

const app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/secret', function(req, res){
	res.render('secret');
});

app.listen(5000, function(){
	console.log('app.js being served on port 5000...');
});	
