const { ApolloServer } = require('apollo-server');
import { typeDefs } from './schema';
import { resolvers } from './resolver';
import dotenv from 'dotenv';
// Todo: Federate each service into subqueries locatedError...
dotenv.config();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  },
});

server.listen(4000).then(async () => {
  console.log('server is listening on port 4000!');
});
