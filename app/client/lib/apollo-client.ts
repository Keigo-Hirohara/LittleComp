import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();
export const graphqlClient = new ApolloClient({
  // Todo: Replace new uri using environment variable when deploying
  uri: `http://localhost:4000/graphql`,
  cache,
});
