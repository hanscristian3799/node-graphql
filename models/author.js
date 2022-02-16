const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  author_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
