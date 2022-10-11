const { ApolloServer } = require('apollo-server');
import { typeDefs } from './schema';
import { resolvers } from './resolver';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationError } from 'apollo-server';
// Todo: Federate each service into subqueries locatedError...
dotenv.config();

const authContext = async ({ req }: any) => {
  const token = req.headers.authorization.split(' ');
  const { email, password } = req.body.variables;
  let verified = null;
  const secret = process.env.JWT_SECRET || '';

  try {
    verified = await jwt.verify(token[1], secret);
  } catch (error: any) {
    console.log(error.message);
    if (!email || !password) {
      throw new AuthenticationError('トークンが有効ではありません');
    }
  }
  return {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    verified,
  };
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
    credentials: true,
  },
  context: authContext,
});
server.listen(4000).then(async () => {
  console.log('server is listening on port 4000!');
});
