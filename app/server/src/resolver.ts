import {
  getStories,
  createStory,
  changeStoryName,
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
    createStory: async (_: any, args: any) => {
      try {
        const story = await createStory(args.name);
        return {
          code: 201,
          success: true,
          message: 'New story was successfully created!',
          story,
        };
      } catch (error) {
        console.log(error);
        return {
          code: 500,
          success: false,
          message: 'Something went wrong on creating new story...',
        };
      }
    },
    renameStory: async (_: any, args: any) => {
      try {
        const newStory = await changeStoryName(args.targetId, args.newName);
        return {
          code: 201,
          success: true,
          message: 'The Story was successfully renamed!',
          story: newStory,
        };
      } catch (error) {
        console.log(error);
        return {
          code: 500,
          success: false,
          message: 'Something went wrong on updating story...',
        };
      }
    },
    deleteStory: async (_: null, args: any) => {
      try {
        await deleteStory(args.targetId);
        return {
          code: 204,
          success: true,
          message: 'The story was successfully deleted!',
        };
      } catch (error) {
        console.log(error);
        return {
          code: 500,
          success: false,
          message: 'Something went wrong on deleting story...',
        };
      }
    },
    createTask,
    renameTask,
    updateTaskStatus,
    deleteTask,
  },
};
