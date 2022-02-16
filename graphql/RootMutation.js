const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const bookModel = require("../models/book");
const authorModel = require("../models/author");

const { AuthorType, BookType } = require("./Types");

RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "RootMutation",
  fields: () => ({
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const booksLength = await bookModel.countDocuments({});

        const book = {
          book_id: booksLength + 1,
          name: args.name,
          author_id: args.authorId,
        };

        const response = await bookModel.create(book);
        return response;
      },
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const authorLength = await authorModel.countDocuments({});

        const author = {
          author_id: authorLength + 1,
          name: args.name,
        };

        const response = await authorModel.create(author);
        return response;
      },
    },
  }),
});

module.exports = RootMutationType;
