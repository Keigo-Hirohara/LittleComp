import { ApolloQueryResult } from '@apollo/client';

export type TaskModalArgsType = {
  storyId: string;
  isOpen: boolean;
  onClose: () => void;
  status?: string;
  id?: string;
  name?: string;
};
