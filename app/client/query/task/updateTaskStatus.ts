import { gql } from '@apollo/client';

export const UPDATE_TASK_STATUS = gql`
  mutation Mutation($updateTaskStatusTargetId2: ID!, $newStatus: String!) {
    updateTaskStatus(
      targetId: $updateTaskStatusTargetId2
      newStatus: $newStatus
    ) {
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
