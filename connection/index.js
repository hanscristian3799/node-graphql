const mongoose = require("mongoose");

exports.connectToDB = () => {
  mongoose.connect("mongodb://localhost:27017/graphql", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error: "))
  db.once("open", () => {
      console.log("Database connected!");
  })
};
