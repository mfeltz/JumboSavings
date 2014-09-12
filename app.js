// Express initialization
var express = require('express');
var app = express(express.logger());

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use('/static', express.static(__dirname + '/static'));

app.use(express.json());
app.use(express.urlencoded());
app.set('title', 'nodeapp');

var pricePage_CONST = .1;
var totalPrintCost;

// Mongo initialization, setting up a connection to a MongoDB (on Heroku or localhost)
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27016/jumbocashers'; // comp20 is the name of the database we are using in MongoDB

var mongo = require('mongodb');

var db = mongo.Db.connect(mongoUri, function (error, database) {
    db = database;
});

app.post('/submit.json', function(request, response) {
response.header("Access-Control-Allow-Origin", "*");
response.header("Access-Control-Allow-Headers", "X-Requested-With");
        var theString = request.body.json;
        var user = request.body.username;
        var mealPlan = request.body.mealPlan;
        var email = request.body.email;
        var password = request.body.password;
		var parsed = JSON.parse(theString);
		//the user must be stipulated on entry
        // 1. Specify a collection to use
        db.collection(user, function(error, col) {
        		col.drop();
              	col.insert(parsed, function(error, saved){
                	response.send(200);
          		});
        });
});

app.get('/', function(request, response) {
	response.render('cover',{

	});
});


app.get('/dining', function(request, response) {
	response.render('dining',{

	});
});

app.get('/printing', function(request, response) {
	response.render('printing',{

	});
});

app.get('/faq', function(request, response) {
	response.render('faq',{

	});
});

app.get('/contact', function(request, response) {
	response.render('contact',{

	});
});

app.get('/cover', function(request, response) {
	response.render('cover',{

	});
});

app.get('/about', function(request, response) {
	response.render('about',{

	});
});

app.get('/home', function(request, response) {
	response.render('/',{

	});
});

app.get('/user/:username', function(request, response){
	totalPrintCost = 0;
	var mealPlan;
	var username = request.param('username');
	var j = 0; //printerUse index
	db.collection(username, function(err, col){
		col.find().toArray(function(er, results){
			response.render('user/' + username, {
				username: username,
				results: results
			});
		});
	});
});


app.get('/upload', function(request, response){
	response.render('upload', {
	});
});

var port = (process.env.PORT || 3000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});


app.get('/upload', function(request, response){
	response.render('upload', {
	});
});

var port = (process.env.PORT || 3000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});
