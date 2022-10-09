import { makeVar } from '@apollo/client';

export const initStateOfTaskModal = {
  isOpen: false,
  storyId: '',
};

export const createTaskModalState = makeVar(initStateOfTaskModal);
