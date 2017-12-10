var express = require('express');
var app = express();

//home page should print "Hi there, welcome to my assignment!"
app.get('/', function(req, res) {
    res.send('Hi there, welcome to my assignment!');
});

// /speak/* should print the following:
//where * = pig => "The pig says 'Oink'"
//where * = cow => "The cow says 'Moo'"
//where * = dog => "The dog says 'Woof'"
app.get('/speak/:anim', function(req, res) {
    var animal = req.params.anim;
    var saying = "";
    var err = false;

    animal === 'pig' ? saying = "'Oink'." : animal === 'cow' ? saying = "'Moo'." : animal === 'dog' ? saying = "'Woof'." : err = true;

    !err ? res.send('The ' + animal + ' says: ' + saying) : res.send('Sorry, that animal is not supported in this version.');
})

// /repeat/*/# should print * # of times.
app.get('/repeat/:str/:num/', function(req, res) {
    var str = req.params.str;
    var num = req.params.num;
    var bod = "";

    for (var i=0; i<num; i++) {
        bod += str + " ";
    }

    res.send(bod);
});

// 404 = "Sorry, page not found...What are you doing with your life?"
app.get('*', function(req, res) {
    res.send('Sorry, page not found... What are you doing with your life?');
});

app.listen(3000, function () {
    console.log('Server successfully started on port 3000.');
});