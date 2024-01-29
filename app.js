const bodyParser = require("body-parser");
const title =require( './model');
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const dbConnection= require("./db")

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
    type Event {
        name:String!
        title:String!
    }
    input EventInput{
        name:String!
        title:String!
    }
    type RootQuery{
       events:[Event!]!
    }
    type RootMutation{
       createEvent(eventInput:EventInput):Event
    }
    schema {
        query:RootQuery
        mutation:RootMutation
    }
    `),
    rootValue: {
      events: () => {
        return events;
      },
    },
    createEvent: (args) => {
      
      const data =new title({
        name: args.eventInput.name,
        title: args.eventInput.title,
      })
      data.save()
      return {...data._doc}
    },
    graphiql: true,
  })
);

dbConnection();

app.listen(4000, () => {
  console.log("server connected succesfully..");
});
