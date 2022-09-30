import { gql } from '@apollo/client';

export const DELETE_TASK = gql`
  mutation Mutation($targetId: ID!) {
    deleteTask(targetId: $targetId) {
      code
      success
      message
    }
  }
`;
