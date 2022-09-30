import { gql } from '@apollo/client';

export const EDIT_STORY = gql`
  mutation Mutation($targetId: ID!, $newName: String!) {
    renameStory(targetId: $targetId, newName: $newName) {
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

export default EDIT_STORY;
