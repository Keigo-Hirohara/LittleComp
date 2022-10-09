import { gql } from '@apollo/client';

export const CREATE_STORY = gql`
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

export default CREATE_STORY;
