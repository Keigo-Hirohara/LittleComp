import {
  getStories,
  createStory,
  changeStoryName,
  deleteStory,
} from './service/story';

export const resolvers = {
  Query: {
    getStories,
  },
  Mutation: {
    createStory: (_: any, args: any) => {
      try {
        const story = createStory(args.name);
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
    renameStory: (_: any, args: any) => {
      try {
        const newStory = changeStoryName(args.targetId, args.newName);
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
    deleteStory: (_: null, args: any) => {
      try {
        deleteStory(args.targetId);
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
  },
};
