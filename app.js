// WIKI NYC GUIDE APP

/////////////////////////////////////// boiler plate
var express = require('express');
var sqlite3 = require('sqlite3');
var fs = require('fs');
var Mustache = require('mustache');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = new sqlite3.Database('./database.db');
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
//////////////////////////////////////// boiler plate


//Welcome page
//reading the index HTML template
app.get('/', function(req, res) {
	res.send(fs.readFileSync('./index.html', 'utf8'));
});

app.get('/articles/new', function(req, res) {
	res.send(fs.readFileSync('./newarticle.html', 'utf8'));
});

//Create a new article
app.post('/articles', function(req, res) {
	console.log(req.body);
	db.run("INSERT INTO articles (id, category, title, content, date_created, authors_id) VALUES (1,'" + req.body.category + "','" + req.body.title + "','" + req.body.content + "','" + req.body.date_created + "')");
	//res.send('article added');
		console.log('article added');
	res.redirect("/articles");
});











app.listen(5000, function() {
	console.log("LISTENING!");
});
