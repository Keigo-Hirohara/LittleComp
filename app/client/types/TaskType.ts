import { ApolloQueryResult } from '@apollo/client';

export type TaskType = {
  id: string;
  name: string;
  status: string;
  storyId: string;
};
