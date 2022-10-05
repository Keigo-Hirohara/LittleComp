import { CreateStoryArgsType } from './types/CreateStoryArgsType';
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
import { RenameStoryArgsType } from './types/RenameStoryArgsType';
import { DeleteStoryArgsType } from './types/DeleteStoryArgsType';

export const resolvers = {
  Query: {
    getStories,
    getTasks,
  },
  Mutation: {
    createStory: async (_: null, { name }: CreateStoryArgsType) => {
      try {
        const story = await createStory(name);
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
    renameStory: async (
      _: null,
      { targetId, newName }: RenameStoryArgsType
    ) => {
      try {
        const newStory = await changeStoryName(targetId, newName);
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
    deleteStory: async (_: null, { targetId }: DeleteStoryArgsType) => {
      try {
        await deleteStory(targetId);
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
