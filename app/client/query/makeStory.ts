import { gql } from '@apollo/client';

export const MAKE_STORY = gql`
  mutation Mutation($name: String!) {
    createStory(name: $name) {
      code
      success
      message
      story {
        id
        name
      }
    }
  }
`;
