// Add dependencies
var express = require('express')
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var axios = require('axios');
var exphbs = require("express-handlebars");



// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI,{useNewUrlParser: true});

// require all models
var db = require("./models");
var PORT = process.env.PORT || 3000;

// set up express
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//       defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");


// GET request for scraping WIRED 
app.get("/scrape", (req, res) => {
     // Use Axios to request for HTML page
     axios.get("https://www.wired.com/category/science/page/1/").then(response => {
     // Load HTML into cheerio and save to a variable
     var $ = cheerio.load(response.data)

    $(".archive-item-component__info").each((i, elem) => {
     var result = {};
      // Store title, link, and summary to result object
      result.title = $(elem).children("a").children("h2").text();
      result.link = "https://www.wired.com" + $(elem).children("a").attr("href");
      result.summary = $(elem).children("a").children("p").text();
     console.log(result)
     

     // Using Mongoose, create a new Article using the `result` object built from scraping
     db.Article.create(result)
     .then(dbArticle => {
          // View the added result in the console
          console.log(dbArticle);
     })
     .catch(err => {
          // If an error occurred, log it
          console.log(err);
     });

});
     
     res.send("Scrape Complete");
     });
});

// Route for getting all Articles from the db
app.get("/articles", (req, res) => {
     // Grab every document in the Articles collection
     db.Article.find({})
       .then(dbArticle => {
         res.json(dbArticle);
       })
       .catch(err => {
         res.json(err);
       });
   });


// Route for grabbing a specific Article by id, and populate it with it's note
app.get("/articles/:id", (req, res) => {
     //Find article by id and populate all the notes associated with it
     db.Article.findOne({ _id: req.params.id })
       .populate("note")
       .then(dbArticle => {
         res.json(dbArticle);
       })
       .catch(function(err) {
         res.json(err);
       });
   });

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", (req, res) => {
     db.Note.create(req.body)
       .then(dbNote => {
         return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
       })
       .then(dbArticle => {
         res.json(dbArticle);
       })
       .catch(function(err) {
         res.json(err);
       });
   });
   
// Routes
// require("./htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
     console.log("App running on port " + PORT + "!");
   });
   
   
  //  module.exports = app;