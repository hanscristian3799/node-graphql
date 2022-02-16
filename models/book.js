const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author_id: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
