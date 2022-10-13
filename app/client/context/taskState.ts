import { makeVar } from '@apollo/client';
import { CreateTaskModalState } from '../types/CreateTaskModalState';
import { EditTaskModalState } from '../types/EditTaskModalState';

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
