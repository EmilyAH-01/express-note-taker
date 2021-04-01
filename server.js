
// Dependencies:
var express = require("express");

// Express configuration:
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Specify use of "public" folder- necessary for usage of style.css and index.js
app.use(express.static("public")); 

// Router:
require("./public/assets/js/htmlRoutes")(app);

// Listener:
app.listen(PORT, function() {
  console.log("App is listening on PORT: " + PORT);
});


