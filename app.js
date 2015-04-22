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

app.get('/', authors.showWelcome); 
app.get('/authors', authors.showAllAuthors);
app.get('/authors/:id', authors.showAuthor);
app.get('/authors/:id/edit', authors.editAuthor);
app.get('/articles/new', articles.showNewArticleForm);
app.get('/articles', articles.showAllArticles);
app.get('/articles/:id', articles.showArticle);

app.put('/articles/:id/', articles.saveArticle);
app.put('/authors/:id/', authors.saveAuthor);

app.post('/authors', authors.newAuthor);
app.post('/articles', articles.newArticle);

app.delete('/authors/:id', authors.deleteAuthor);
app.delete('/articles/:id', articles.deleteArticle);

app.listen(5000, function() {
	console.log("LISTENING!");
});