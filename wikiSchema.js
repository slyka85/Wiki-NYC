// WIKI NYC GUIDE APP

/////////////////////////////////////// boiler plate
var request = require('request');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
//////////////////////////////////////// boiler plate


db.run("CREATE TABLE articles (id integer primary key, category text, title text, content text, date_created varchar, image varchar, authors_id integer);");

// db.run("CREATE TABLE authors (id integer primary key, username varchar, first_name varchar, last_name varchar, email varchar);");
console.log("Tables created!");