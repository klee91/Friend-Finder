var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = 3000;

var friends [{

}]

app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req,res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});

app.get("/:friends", function(req,res) {
    var chosen = req.parameters.friends;
    console.log(chosen);
    res.end();
})

app.listen(3000);

app.use(bodyParser.urlendcoded({ extended: false}))

app.use(bodyParser.json());

//adding friend from survey??
// app.post("/api/new", function(req,res) {
//     var newFriend = req.body;
//     newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowercase();

//     console.log(newFriend);

//     friends.push(newFriend);

//     res.json(newFriend);
// });

