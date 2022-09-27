import { gql } from '@apollo/client';

export const DELETE_STORY = gql`
  mutation RenameStory($targetId: ID!) {
    deleteStory(targetId: $targetId) {
      code
      success
      message
    }
  }
`;
