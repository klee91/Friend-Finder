// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

//Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; 

// Data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use('/app', express.static(path.join(__dirname, 'public')));

require("./app/routing/api-routes")(app);
require("./app/routing/html-routes")(app);

app.get("/api/friends", function(req,res) {
        res.json(friendsData);
    });

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT) });