import express from 'express';
import mysql from 'mysql2';
// Todo: build server using graphQL
// import { buildSchema } from 'graphql';
// import { graphqlHTTP } from 'express-graphql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '158281872keigo',
  database: 'test',
});

const app = express();
connection.connect((error) => {
  if (error) {
    console.log(`Error occured cause: ${error}`);
    return;
  }
  console.log(`Connection established! id: ${connection.threadId}`);
});
const PORT = 5000;

app.get('/', async (req, res) => {
  return res.status(200).send({
    message: 'Hello World!',
  });
});

app.listen(PORT, () => {
  console.log('Listening on PORT: 5000');
});
