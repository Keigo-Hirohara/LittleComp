import express from 'express';
import mysql from 'mysql2';
import crypto from 'crypto';
// Todo: build server using graphQL
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
// import { graphqlHTTP } from 'express-graphql';

const app = express();
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'gent',
  password: '158281872keigo',
  connectionLimit: 10,
});

const schema = buildSchema(`

  input storyInput {
    name: String
  }

  type story {
    id: ID!,
    name: String!
  }

  type Query {
    getStory(id: ID!): String
  }

  type Mutation {
    createStory(name: storyInput): String
    updateStory(id: ID!, name: storyInput): String
  }
`);

const root = {
  getStory: ({ id }: any) => {
    if (!fakeDatabase[id]) {
      throw new Error(`There is no id in database...`);
    }
    return `${fakeDatabase[id].name}`;
  },

  createStory: ({ name }: any) => {
    const id = crypto.randomBytes(10).toString('hex');
    fakeDatabase[id] = name;
    return `new story is successfully created! id:  ${id}`;
  },

  updateStory: ({ id, name }: any) => {
    if (!fakeDatabase[id]) {
      throw new Error(`there is no id in database...`);
    }
    fakeDatabase[id] = name;
    return `new story is successfully updated! ${fakeDatabase[id]}`;
  },

  deleteStory: ({ id }: any) => {
    if (!fakeDatabase[id]) {
      throw new Error(`there is no id in database...`);
    }
    delete fakeDatabase[id];
    return `new story is successfully deleted! new data: ${fakeDatabase}`;
  },
};

let fakeDatabase: any = {};

// If databese gent is not exist, excute <CREATE DATABASE IF NOT EXISTS `gent`;> next, <use `gent`;> command!
pool.getConnection((err, connection) => {
  if (err) throw err;

  console.log('connection established!');
});

const PORT = 5000;

app.get('/', async (req, res) => {
  return res.status(200).send({
    message: 'Hello World!',
  });
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log('Listening on PORT: 5000');
});
