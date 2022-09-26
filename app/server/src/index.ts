const { ApolloServer, gql } = require('apollo-server');
import { typeDefs } from './schema';
import { resolvers } from './resolver';

// Todo: Federate each service into subqueries locatedError...

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(() => {
  console.log('server is listening on port 4000!');
});
