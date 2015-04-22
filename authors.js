// WikiPIZZiA APP

/////////////////////////////////////////////////////////////////// boiler plate
var express = require('express');
var sqlite3 = require('sqlite3');
var fs = require('fs');
var Mustache = require('mustache');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = new sqlite3.Database('./database.db');
var marked = require('marked');
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});
var app = express();
var he = require('he');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use("/styles", express.static(__dirname + '/public/styles'));
var authors = require('./authors.js');
var articles = require('./articles.js');
/////////////////////////////////////////////////////////////////// boiler plate

var authors = {

	showWelcome: function(req, res) {
		//sending new authors to a dropdown menu
		var template = fs.readFileSync('./views/index.html', 'utf8');
		db.all("SELECT * FROM authors;", {}, function(err, authors) {
			var html = Mustache.render(template, {
				allAuthors: authors
			}); //end of mustache
			res.send(html);
		}); //end of db al
	}, //end of showWelcome
	newAuthor: function(req, res) {
		console.log(req.body);
		db.run("INSERT INTO authors (username, first_name, last_name, email, profile_image) VALUES ($username, $first_name, $last_name, $email, $profile_image)", {
			$username: req.body.username,
			$first_name: req.body.first_name,
			$last_name: req.body.last_name,
			$email: req.body.email,
			$profile_image: req.body.profile_image
		});
		console.log('authors info sent to database');
		res.redirect("/authors");
	}, //end of newAuthor
	showAllAuthors: function(req, res) {
		var template = fs.readFileSync('./views/authors.html', 'utf8');
		db.all('SELECT * FROM authors;', {}, function(err, authors) {
			var html = Mustache.render(template, {
				allAuthors: authors
			});
			res.send(html);
		}); //end of db a
	}, //end of showAthors
	showAuthor: function(req, res) {
		var id = req.params.id;
		//view all articles. reading a template and mustaching articles into html
		var template = fs.readFileSync('./views/articles.html', 'utf8');
		var authorNameSearchedInArticles = "SELECT * FROM articles WHERE authors_id = " + id + ";";
		var authorsArticles = req.query.authorsArticles;
		console.log(authorsArticles);
		//accessing ALL articles of a particular user
		if (authorsArticles) {
			db.all(authorNameSearchedInArticles, {}, function(err, articles) {
				var html = Mustache.render(template, {
					allArticles: articles
				});
				res.send(html);
			}); //end of db all nested
			//accessing a page of a particular author to view
		} else {
			db.all("SELECT * FROM authors WHERE id = " + id + ";", {}, function(err, author) {
				fs.readFile('./views/authorPage2.html', 'utf8', function(err, html) {
					//console.log(author);
					var renderedHTML = Mustache.render(html, author[0]);
					res.send(renderedHTML);
				}); //end of fa readFile
			}); //end of db all
		} //end of else
	}, //end of showOneAuthor
	editAuthor: function(req, res) {
		var id = req.params.id;
		db.all("SELECT * FROM authors WHERE id = " + id + ";", {}, function(err, author) {
			fs.readFile('./views/authorPageEdit.html', 'utf8', function(err, html) {
				console.log(author);
				var renderedHTMLEdit = Mustache.render(html, author[0]);
				res.send(renderedHTMLEdit);
			}); //end of fs read
		}); //end of db all
	}, //end of editOneAuthor
	deleteAuthor: function(req, res) {
		var id = req.params.id;
		db.run("DELETE FROM authors WHERE id = " + id + ";");
		res.redirect("/authors");
	}, //end of deleteAuthor
	saveAuthor: function(req, res) {
		//var id = req.params.id;
		var authorInfo = req.body;
		db.run("UPDATE authors SET username = $username ,first_name = $first_name, last_name = $last_name, email = $email, profile_image = $profile_image WHERE id = $id " + ";", {
			$id: req.params.id,
			$username: req.body.username,
			$first_name: req.body.first_name,
			$last_name: req.body.last_name,
			$email: req.body.email,
			$profile_image: req.body.profile_image
		});
		res.redirect("/authors");
	}, //end of saveAuthor

}; //end of authors

module.exports = authors;
