const { ApolloServer, gql } = require('apollo-server');

const fakeDatabase = [
  {
    id: 'id1',
    name: 'graphql server setup',
  },
  {
    id: 'id2',
    name: 'mysql integration',
  },
  {
    id: 'id3',
    name: 'implement authentication',
  },
];

const typeDefs = gql`
  type Query {
    getStories: [Story]
  }

  type Story {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    getStories: () => {
      return fakeDatabase;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => {
  console.log('server is listening on port 4000!');
});
