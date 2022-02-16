const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const { GraphQLSchema } = require("graphql");
const cors = require("cors");
const app = express();

const db = require("./connection/index");

const RootQueryType = require("./graphql/RootQuery");
const RootMutationType = require("./graphql/RootMutation");

app.use(cors("*"));

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server is running");
});

db.connectToDB();
