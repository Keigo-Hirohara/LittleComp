import {
  getStories,
  createStory,
  renameStory,
  deleteStory,
} from './service/story';

import {
  getTasks,
  createTask,
  renameTask,
  updateTaskStatus,
  deleteTask,
} from './service/task';

export const resolvers = {
  Query: {
    getStories,
    getTasks,
  },
  Mutation: {
    createStory,
    renameStory,
    deleteStory,
    createTask,
    renameTask,
    updateTaskStatus,
    deleteTask,
  },
};
