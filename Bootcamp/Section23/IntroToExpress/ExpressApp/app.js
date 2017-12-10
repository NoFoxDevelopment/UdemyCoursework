var express = require('express');
var app = express();

// '/' => "Hi there!"
app.get('/', function(req, res){
    res.send("Hi there!");
});
// '/bye' => "Goodbye!"
app.get('/bye', function(req, res) {
    res.send("Goodbye!");
});
// '/dog' => "Meow"
app.get('/dog', function(req, res) {
    res.send("Meow");
});
app.get('/r/:subredditName', function(req, res){
    var subreddit = req.params.subredditName;
    console.log(req.params);
    res.send('Welcome to the ' + subreddit + ' Subreddit!');
});
app.get('/r/:subredditName/comments/:id/:title/', function(req, res){
    res.send('Welcome to the comments page!');
});

app.get('*', function(req, res) {
    res.send("You are a star!");
});

//start server
app.listen(3000, function() {
    console.log("Serving ExpressApp on port 3000");
});