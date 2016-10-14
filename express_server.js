'use strict';

// Loading the things we need
var express = require("express");
var app = express();

// Access body-parser library to access POST request parameters
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));


let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// set the VIEW ENGINE to EJS for our Express application
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let templateVars = { };
  res.send("Good evening");
});

// Render the links table
app.get("/urls" , (req, res) => {
  console.log("Brett is Awesome");
  let templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };
  console.log("All work and no play");
  res.render("urls_show", templateVars);
});

// Express routes requests based not only on PATHS, but also on request METHOD (see the urls_new template!)
app.get("/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  urlDatabase[generateRandomString()] = req.body.longURL;
  console.log(urlDatabase);  // debug statement to see POST parameters
  res.redirect("/urls")         // Respond with 'Ok' (we will replace this)
});



// Random string-generatng function
function generateRandomString() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i=0; i < 6; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    return text;
}


// listen on port 8080
app.listen(8080);
console.log('Now listening on port 8080');
