import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query Query($storyId: String, $status: String) {
    getTasks(storyId: $storyId, status: $status) {
      id
      name
      status
      story_id
    }
  }
`;
