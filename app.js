const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

let now = new Date();

console.log(now.getUTCHours());

let brazilTimezoneOffSet = -3;
let startBusinessHours = 6;
let endBusinessHours = 18;
let currentHour = now.getUTCHours() + brazilTimezoneOffSet;

console.log(currentHour);

console.log(currentHour >= startBusinessHours && currentHour <= endBusinessHours);

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            controlesDeSaude: [String!]!
        }

        type RootMutation {
            createControleDeSaude(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        controlesDeSaude: () =>{
            return ['XXx','xxxxx','xxxx'];
        },
        createControleDeSaude: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}));

app.listen(3001);