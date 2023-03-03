// const express = require('express')
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const graphqlHttp = require("express-graphql");

// const app = express()
// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo!')
// })
// app.listen(process.env.PORT || 3000)

const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
// const GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
const root = {
  message: () => "Hello World!",
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () =>
  console.log("`Express GraphQL Server Now Running On  http://localhost:4000 ")
);
