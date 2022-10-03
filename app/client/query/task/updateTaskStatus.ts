import { gql } from '@apollo/client';

export const UPDATE_TASK_STATUS = gql`
  mutation Mutation($targetId: ID!, $newStatus: String!) {
    updateTaskStatus(targetId: $targetId, newStatus: $newStatus) {
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
