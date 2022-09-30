import { gql } from '@apollo/client';

export const RENAME_TASK = gql`
  mutation Mutation($targetId: ID!, $newName: String) {
    renameTask(targetId: $targetId, newName: $newName) {
      code
      success
      message
      task {
        id
        name
        status
        story_id
      }
    }
  }
`;
