var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create a new schema object like sequelize
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  // Used to populate with notes  
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  saved: {
    type: Boolean,
    required: false
  }
});

// "Article" model to export
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
