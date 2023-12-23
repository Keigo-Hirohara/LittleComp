const { ApolloServer } = require('apollo-server');
import { typeDefs } from './schema';
import { resolvers } from './resolver';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Context, Jwt } from './types/Context';

// Todo: Federate each service into subqueries locatedError...
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const authContext = async ({ req }: any): Promise<Context> => {
  const jwtInfo: Jwt = {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  };
  if (!req.headers.authorization) {
    return {
      jwt: jwtInfo,
      verified: null,
    };
  }
  const token = req.headers.authorization.split(' ');
  let verified = null;
  const secret = process.env.JWT_SECRET || '';

  try {
    verified = await jwt.verify(token[1], secret);
  } catch (error: any) {
    console.log(error.message);
  }
  return {
    jwt: jwtInfo,
    verified,
  };
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: [
      process.env.CLIENT_URL || 'http://localhost:3002',
      'https://studio.apollographql.com',
    ],
    credentials: true,
  },
  context: authContext,
  cache: 'bounded',
});

const PORT = process.env.PORT || 5000;
server.listen(PORT).then(async () => {
  console.log(`server is listening on port ${PORT}!`);
});
