const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const session = require('express-session');
const hoursStorage = require('./savetime'); 

app.use(session({
  secret: '123'
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// rotas
app.get("/home", function (req, res) {
  const intervals = hoursStorage.getHours(req.session.userId); 
  res.render("inputs", { interval: intervals });
});

app.post("/save", function (req, res) {
  const { inicialTime, finalTime, desc, resultTime } = req.body;
  for (let i = 0; i < inicialTime.length; i++) {
    const intervalData = `${inicialTime[i]} ${finalTime[i]} ${desc[i]} ${resultTime[i]}`;
    hoursStorage.saveHours(req.session.userId, intervalData); 
  }
  setTimeout(() => {
    res.redirect("/home");
  }, 500);
});

app.get("/delete/:id", function (req, res) {

  //criar delete depois

  setTimeout(() => {
    res.redirect("/home");
  }, 500);
});

app.get("/", function (req, res) {
  if (req.session.isLogged) {
    res.redirect("/home");
  } else {
    res.render("login");
  }
});

app.post("/login", function (req, res) {
  //criar uma lógica de login em algum momento
  
});

app.listen(8081, function (req, res) {
  console.log("Server running on port 8081");
});
