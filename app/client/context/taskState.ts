import { makeVar } from '@apollo/client';
import { CreateTaskModalState } from '../types/state/CreateTaskModalState';
import { EditTaskModalState } from '../types/state/EditTaskModalState';

export const initStateOfTaskModal: CreateTaskModalState = {
  isOpen: false,
  storyId: '',
};

export const initStateOfEditTaskModal: EditTaskModalState = {
  isOpen: false,
  storyId: '',
  name: '',
  status: '',
  taskId: '',
};

export const createTaskModalState = makeVar(initStateOfTaskModal);

export const editTaskModalState = makeVar(initStateOfEditTaskModal);
