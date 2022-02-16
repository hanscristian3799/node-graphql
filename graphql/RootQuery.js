const { GraphQLObjectType, GraphQLInt, GraphQLList } = require("graphql");

const bookModel = require("../models/book");
const authorModel = require("../models/author");

const { AuthorType, BookType } = require("./Types");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "RootQuery",
  fields: () => ({
    book: {
      type: BookType,
      description: "A book",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const response = await bookModel.find({ book_id: args.id });
        return response[0];
      },
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of all books",
      resolve: async () => await bookModel.find({}),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all authors",
      resolve: async () => await authorModel.find({}),
    },
    author: {
      type: AuthorType,
      description: "A author",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const response = await authorModel.find({ author_id: args.id });
        return response[0];
      },
    },
  }),
});

module.exports = RootQueryType;
