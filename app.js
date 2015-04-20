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
var path = require('path');
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

//var sendgrid = require("sendgrid")(api_user, api_key);
//var email = new sendgrid.Email();

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use("/styles", express.static(__dirname + '/public/css'));
// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/views'));
// app.use(express.static(__dirname + '/uploads'));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/'));
//app.use(express.static('/views'));
//////////////////////////////////////// boiler plate



//////////////////////////////////////////////////////////////////////////////
//                             WELCOME PAGE                                //
////////////////////////////////////////////////////////////////////////////

//reading the index HTML template
app.get('/', function(req, res) {

	//sending new authors to a dropdown menu
	var template = fs.readFileSync('./views/index.html', 'utf8');
	db.all('SELECT * FROM authors;', function(err, authors) {
		var html = Mustache.render(template, {allAuthors: authors}); //end of mustache
		res.send(html);
	}); //end of db all
}); //end of app get

/////////////////////////////////////////////////////////////////////////////
//                          AUTHORS STUFF                                 //
///////////////////////////////////////////////////////////////////////////

//creating new author
app.post('/authors', function(req, res) {
	console.log(req.body);
	db.run("INSERT INTO authors (username, first_name, last_name, email, profile_image) VALUES ('" + req.body.username + "','" + req.body.first_name + "','" + req.body.last_name + "','" + req.body.email + "','" + req.body.profile_image + "')");
	console.log('authors info sent to database');
	res.redirect("/authors");
});

//view all authors. reading a template and mustaching authors into html
app.get('/authors', function(req, res) {
	var template = fs.readFileSync('./views/authors.html', 'utf8');

	db.all('SELECT * FROM authors;', function(err, authors) {
		var html = Mustache.render(template, {
			allAuthors: authors
		});
		res.send(html);
	});
});

//accessing a page of a particular author to view
app.get('/authors/:id', function(req, res) {
	var id = req.params.id;
	db.all('SELECT * FROM authors WHERE id= ' + id + ";", function(err, author) {
		fs.readFile('./views/authorPage2.html', 'utf8', function(err, html) {
			//console.log(author);
			var renderedHTML = Mustache.render(html, author[0]);
			res.send(renderedHTML);
		}); //end of fa readFile
	}); //end of db all
}); //end of app get authors id

//to edit a particular author
app.get('/authors/:id/edit', function(req, res) {
	var id = req.params.id;

	//var template = fs.readFileSync('./authorPageEdit.html', 'utf8');

	db.all('SELECT * FROM authors WHERE id= ' + id + ";", function(err, author) {
				// fs.readFile('./authorPage2.html', 'utf8', function(err, html) {
		fs.readFile('./views/authorPageEdit.html', 'utf8', function(err, html) {
			console.log(author);
			var renderedHTMLEdit = Mustache.render(html, author[0]);
			//res.send(id);
			res.send(renderedHTMLEdit);
		}); //end of fs read
	}); //end of db all
}); //end of app get

//deleting the authors profile
app.delete('/authors/:id', function(req, res) {
	var id = req.params.id;
	db.run("DELETE FROM authors WHERE id =" + id + ";");
	res.redirect("/authors");
});

//sending changes of the author to a database
app.put('/authors/:id/', function(req, res) {
	var id = req.params.id;
	var authorInfo = req.body;
	db.run("UPDATE authors SET username = '" + authorInfo.username + "',first_name = '" + authorInfo.first_name + "', last_name = '" + authorInfo.last_name + "', email = '" + authorInfo.email + "', profile_image = '" + authorInfo.profile_image + "' WHERE id = " + id + ";");
	res.redirect("/authors");
});


///////////////////////////////////////////////////////////////////////////
//                 ARTICLE STUFF                                        //
/////////////////////////////////////////////////////////////////////////

//reading the template from newarticle to create an article
app.get('/articles/new', function(req, res) {
	var template = fs.readFileSync('./views/newarticle.html', 'utf8');

	//sending new authors to a dropdown menu
	db.all('SELECT * FROM authors;', function(err, authors) {
		var html = Mustache.render(template, {
			allAuthors: authors
		}); //end of mustache
		res.send(html);
	}); //end of db all
}); //end of app get

//Create a new article
app.post('/articles', function(req, res) {
	var category = req.body.categories;
	var author = req.body.authors;
	//console.log(author);
	db.run("INSERT INTO articles (category, title, content, date_created, image, authors_id) VALUES ('" + category + "','" + req.body.title + "','" + unescape(marked(req.body.content)) + "','" + req.body.date_created + "','" + req.body.image + "','" + author + "')");
	console.log('article info sent to database');
	res.redirect("/articles");
});


//view all articles. reading a template and mustaching articles into html
app.get('/articles', function(req, res) {
	var template = fs.readFileSync('./views/articles.html', 'utf8');
	var allAuthors = "SELECT * FROM authors;";
	var allArticles = "SELECT * FROM articles;";
	var authorSearch = req.query.authors;
	console.log(authorSearch);

	var authorNameSearchedInArticles = "SELECT * FROM articles WHERE authors_id = " + authorSearch + ";";

	//accessing ALL articles of a particular user
	if (authorSearch) {
		db.all(authorNameSearchedInArticles, function(err, articles) {
			var html = Mustache.render(template, {allArticles: articles});
			res.send(html);
		}); //end of db all nested
	} //end of if statement
	else {
		//accessing ALL articles of ALL users
		db.all(allArticles, function(err, articles) {
			var html = Mustache.render(template, {allArticles: articles});
			res.send(html);
		}); //end of db all nested
	} //end of else
	// END OF ACCESSING ALL ARTICLES	
}); // end of app get

//accessing article page to edit an article
app.get('/articles/:id', function(req, res) {
	var id = req.params.id;
	db.all('SELECT * FROM articles WHERE id= ' + id + ";", function(err, article) {
		fs.readFile('./views/articlePage.html', 'utf8', function(err, html) {

			var renderedHTML = Mustache.render(html, article[0]);
			console.log(article);
			res.send(renderedHTML);
		});
	});
});
//deleting article
app.delete('/articles/:id', function(req, res) {
	var id = req.params.id;
	db.run("DELETE FROM articles WHERE id =" + id + ";");
	res.redirect("/articles");
}); //end of app delete

//sending changes to a server
app.put('/articles/:id/', function(req, res) {
	var id = req.params.id;
	var articleInfo = req.body;
	db.run("UPDATE articles SET category = '" + articleInfo.category + "', title = '" + articleInfo.title + "', content = '" + unescape(marked(articleInfo.content)) + "', date_created = '" + articleInfo.date_created + "', image = '" + articleInfo.image + "', authors_id = '" + articleInfo.authors_id + "' WHERE id = " + id + ";");
	res.redirect("/articles");
}); //end of app put


app.listen(5000, function() {
	console.log("LISTENING!");
});