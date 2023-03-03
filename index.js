const express = require("express");
const express_graphql = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const app = express();
app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  express_graphql({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const uri =
  "mongodb+srv://renish0105:01051999@e-shop.r50ylc9.mongodb.net/Booking-Applicaqtion";
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(4000, () =>
      console.log(
        "`Express GraphQL Server Now Running On  http://localhost:4000 "
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });
