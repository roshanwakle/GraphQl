const bodyParser = require("body-parser");
const express = require("express");
const {graphqlHTTP} = require("express-graphql"); 
const { buildSchema } = require("graphql");



const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type RootQuery{
       events:[String!]!
    }
    type RootMutation{
       createEvent(name:String):String
    }
    schema {
        query:RootQuery
        mutation:RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return [`Roshan`];
      },
    },
    createEvent: (args) => {
      const eventName = args.name;
      return eventName;
    },
    graphiql: true,
  })
);


app.listen(4000, () => {
  console.log("server connected succesfully..");
});
