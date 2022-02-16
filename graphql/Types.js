const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = require("graphql");

const bookModel = require("../models/book");
const authorModel = require("../models/author");

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "Represents book written by a author",
  fields: () => ({
    book_id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    author_id: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: async (book) => {
        const response = await authorModel.find({author_id: book.author_id});
        return response[0];
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "Represents list of authors",
  fields: () => ({
    author_id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (author) => {
        const response = await bookModel.find({author_id: author.author_id});
        console.log("books", response);
        return response;
      },
    },
  }),
});

module.exports.AuthorType = AuthorType;
module.exports.BookType = BookType;
