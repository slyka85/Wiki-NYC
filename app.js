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
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(methodOverride('_method'));
//////////////////////////////////////// boiler plate



//////////////////////////////////////////////////////
//                    WELCOME PAGE                 //
////////////////////////////////////////////////////

//Welcome page
//reading the index HTML template
app.get('/', function(req, res) {


	var template = fs.readFileSync('index.html', 'utf8');
	db.all('SELECT * FROM authors;', function(err, authors) {
		var html = Mustache.render(template, {
			allAuthors: authors
		});
		//res.send("ok");
			res.send(html);
	});

});

////////////////////////////////////////////////////
//                    AUTHORS STUFF              //
//////////////////////////////////////////////////

//creating new author
app.post('/authors', function(req, res) {
	console.log(req.body);
	db.run("INSERT INTO authors (username, first_name, last_name, email) VALUES ('" + req.body.username + "','" + req.body.first_name + "','" + req.body.last_name + "','" + req.body.email + "')");
	//res.send('author added');
	console.log('authors info sent to database');
	res.redirect("/authors");
});

//view all authors. reading a template and mustaching authors into html
app.get('/authors', function(req, res) {
	var template = fs.readFileSync('./authors.html', 'utf8');

	db.all('SELECT * FROM authors;', function(err, authors) {
		var html = Mustache.render(template, {
			allAuthors: authors
		});
		//res.send("ok");
		res.send(html);
	});
});



//if user wants to see authors profile with articles through the drop menu
// app.get('/authors', function(req, res) {
// 	var id = req.params.id;
// 	var template = fs.readFileSync('./authors.html', 'utf8');

// 	db.all('SELECT * FROM authors;', function(err, authors) {
// 		var html = Mustache.render(template, {
// 			allAuthors: authors
// 		});
// 		//res.send("ok");
// 			console.log(req.query.authors);
// 			res.send(req.query.authors);
// 		//res.send(html);
// 	});
// });


// app.get('/authors/:id', function(req, res) {
// 	var username = req.query.authors;
// 	var id = db.all("SELECT id FROM authors WHERE username=' "+ req.query.authors + "'");
// 	//var id = req.params.id;
// 		fs.readFile('./authorPage.html', 'utf8', function(err, html) {
// 	db.all('SELECT * FROM authors WHERE id= ' +id+ ";", function(err, author) {

// 			console.log(req.query.authors);
// 			var renderedHTML = Mustache.render(html, author[0]);
// 			res.send(id);
// 			//res.send(renderedHTML);
// 		});
// 	});
// });


// app.put('/authors/:id/', function(req, res) {
// 	var id = req.params.id;
// 	var authorInfo = req.body;
// 	db.run("UPDATE authors SET username = '" + authorInfo.username + "',first_name = '" + authorInfo.first_name + "', last_name = '" + authorInfo.last_name + "', email = '" + authorInfo.email + "' WHERE id = " + id + ";");
// 	res.redirect("/authors");
// });

//viewing a particular author and edit or delete

app.get('/authors/:id', function(req, res) {
	var id = req.params.id;
	db.all('SELECT * FROM authors WHERE id= ' + id + ";", function(err, author) {
		fs.readFile('./authorPage.html', 'utf8', function(err, html) {
			console.log(author);
			var renderedHTML = Mustache.render(html, author[0]);
			res.send(renderedHTML);
		});
	});
});
app.delete('/authors/:id', function(req, res) {
	var id = req.params.id;
	db.run("DELETE FROM authors WHERE id =" + id + ";");
	res.redirect("/authors");
});

app.put('/authors/:id/', function(req, res) {
	var id = req.params.id;
	var authorInfo = req.body;
	db.run("UPDATE authors SET username = '" + authorInfo.username + "',first_name = '" + authorInfo.first_name + "', last_name = '" + authorInfo.last_name + "', email = '" + authorInfo.email + "' WHERE id = " + id + ";");
	res.redirect("/authors");
});

////////////////////////////////////////////////////
//                    ARTICLE STUFF               //
///////////////////////////////////////////////////

//reading the template from newarticle to create an article
app.get('/articles/new', function(req, res) {
	res.send(fs.readFileSync('./newarticle.html', 'utf8'));
});
//Create a new article
app.post('/articles', function(req, res) {
	console.log(req.body);
	var authorNameSearchedInArticles = "SELECT ";
	db.run("INSERT INTO articles (category, title, content, date_created, image, authors_id) VALUES ('" + req.body.category + "','" + req.body.title + "','" + req.body.content + "','" + req.body.date_created + "','" + req.body.image + "'2)");
	//res.send('article added');
	console.log('article info sent to database');
	res.redirect("/articles");
});

//view all articles. reading a template and mustaching articles into html
app.get('/articles', function(req, res) {
	var template = fs.readFileSync('./articles.html', 'utf8');

	db.all('SELECT * FROM articles;', function(err, articles) {
		var html = Mustache.render(template, {
			allArticles: articles
		});
		//res.send("ok");
		res.send(html);
	});
});


//editing or deleting article
app.get('/articles/:id', function(req, res) {
	var id = req.params.id;
	db.all('SELECT * FROM articles WHERE id= ' + id + ";", function(err, article) {
		fs.readFile('./articlePage.html', 'utf8', function(err, html) {

			var renderedHTML = Mustache.render(html, article[0]);
			console.log(article);
			res.send(renderedHTML);
		});
	});
});
app.delete('/articles/:id', function(req, res) {
	var id = req.params.id;
	db.run("DELETE FROM articles WHERE id =" + id + ";");
	res.redirect("/articles");
});

app.put('/articles/:id/', function(req, res) {
	var id = req.params.id;
	var articleInfo = req.body;
	db.run("UPDATE articles SET category = '" + articleInfo.category + "', title = '" + articleInfo.title + "', content = '" + articleInfo.content + "', date_created = '" + articleInfo.date_created + "', image = '" + articleInfo.image + "', authors_id = '" + articleInfo.authors_id + "' WHERE id = " + id + ";");
	res.redirect("/articles");
});



app.listen(5000, function() {
	console.log("LISTENING!");
});