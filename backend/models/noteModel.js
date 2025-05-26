const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  isImportant: Boolean,
  uploadedBy: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Check if model exists, else create it
module.exports = mongoose.models.Notes || mongoose.model("Notes", notesSchema);
