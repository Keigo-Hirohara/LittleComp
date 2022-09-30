import { gql } from '@apollo/client';
export const GET_STORIES = gql`
  query Query {
    getStories {
      id
      name
    }
  }
`;
