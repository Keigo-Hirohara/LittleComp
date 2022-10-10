import { makeVar } from '@apollo/client';

export const initStateOfTaskModal = {
  isOpen: false,
  storyId: '',
};

export const initStateOfEditTaskModal = {
  isOpen: false,
  storyId: '',
  name: '',
  status: '',
  id: '',
};

export const createTaskModalState = makeVar(initStateOfTaskModal);

export const editTaskModalState = makeVar(initStateOfEditTaskModal);
