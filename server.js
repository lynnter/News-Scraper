// Add dependencies
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var axios = require("axios");


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI,{useNewUrlParser: true});

// Use Axios to request for HTML page
axios.get("https://www.wired.com/category/science/page/1/").then(response => {

// Load HTML into cheerio and save to a variable
     var $ = cheerio.load(response.data)
     // console.log(response.data)
     // console.log($.html());
// Make an empty array for saving our scraped info
     var results = [];
    
     var h2 = $(".archive-list-component__items").html()
     // console.log(h2);

// Use cheerio to find child element... why do i suck so badly at this?
$(".archive-list-component__items").each(function(i, elem) {
     console.log($(elem).find(".archive-item-component__title").text());
   });
})
