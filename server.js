// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var passengers = [];
var waitingList =[];
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});
app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/passengerList", function(req, res){
    res.json(passengers);
})
app.get("/api/waitingList", function(req, res){
    res.json(waitingList);
})
//res.json(waitingList);
app.post("/api/reserve", function(req, res) {
  var newPassenger = req.body;
  newPassenger.routeName = newPassenger.name.replace(/\s+/g, "").toLowerCase();

  console.log(newPassenger);

  passengers.push(newPassenger);

  res.json(newPassenger);
});
app.post("/api/waitList", function(req, res) {
  var newPassenger = req.body;
  newPassenger.routeName = newPassenger.name.replace(/\s+/g, "").toLowerCase();

  console.log(newPassenger);

  waitingList.push(newPassenger);

  res.json(newPassenger);
});

// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
