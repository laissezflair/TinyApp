'use strict';

// Loading the things we need
var express = require("express");
var app = express();

// Access body-parser library to access POST request parameters
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));


let linktable = [
    { name: 'Google', address: 'http://www.google.com'},
    { name: 'Alta Vista', address: 'http://www.altavista.com'},
    { name: 'Hooli', address: 'http://www.hooli.xyz'}
];

// set the VIEW ENGINE to EJS for our Express application
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let templateVars = { };
  res.send("Good evening");
});

// Render the links table
app.get("/urls" , (req, res) => {
  let templateVars = { linktable: linktable };
  res.render("urls_index", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };
  res.render("urls_show", templateVars);
});

// Express routes requests based not only on PATHS, but also on request METHOD (see the urls_new template!)
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

// render the links table
app.get('/urls_index', function(req, res){


    let urlShort = "Here we will define the URL Shortener";

    res.render('urls_index', {
      linktable: linktable,
      urlShort: urlShort
    });
});

// listen on port 8080
app.listen(8080);
console.log('Now listening on port 8080');
