var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Create a new schema object like sequelize
var NoteSchema = new Schema({
  title: String,
  body: String
});

// "Note" model to export
var Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
