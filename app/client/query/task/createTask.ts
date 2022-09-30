import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation Mutation($storyId: String, $taskName: String) {
    createTask(storyId: $storyId, taskName: $taskName) {
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
