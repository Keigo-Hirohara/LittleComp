import express from 'express';
import { existsSync } from 'fs';
import mysql from 'mysql2';
// Todo: build server using graphQL
// import { buildSchema } from 'graphql';
// import { graphqlHTTP } from 'express-graphql';

const app = express();
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'gent',
  password: '158281872keigo',
  connectionLimit: 10,
});

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

app.listen(PORT, () => {
  console.log('Listening on PORT: 5000');
});
