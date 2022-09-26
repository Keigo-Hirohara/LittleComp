const fakeDatabase = [
  {
    id: 'id1',
    name: 'option1',
  },
  {
    id: 'id2',
    name: 'option2',
  },
  {
    id: 'id3',
    name: 'option3',
  },
  {
    id: 'id4',
    name: 'option4',
  },
  {
    id: 'id5',
    name: 'option5',
  },
  {
    id: 'id6',
    name: 'option6',
  },
  {
    id: 'id7',
    name: 'option7',
  },
  {
    id: 'id8',
    name: 'option8',
  },
  {
    id: 'id9',
    name: 'option9',
  },
  {
    id: 'id10',
    name: 'option10',
  },
];

export const resolvers = {
  Query: {
    getStories: () => {
      return fakeDatabase;
    },
  },
  Mutation: {
    createStory: (_: null, args: any) => {
      const id = new Date().getTime().toString();
      const newStory = {
        id,
        name: args.name,
      };
      try {
        fakeDatabase.push(newStory);
        return {
          code: 201,
          success: true,
          message: 'New story was successfully created!',
          story: newStory,
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
    renameStory: (_: null, args: any) => {
      const targetStory = fakeDatabase.find((elm) => elm.id == args.targetId);
      if (targetStory == null) {
        return {
          code: 400,
          success: false,
          message: `The id: ${args.targetId} is not existed in DB...`,
        };
      }
      try {
        targetStory.name = args.newName;
        return {
          code: 201,
          success: true,
          message: 'The Story was successfully renamed!',
          story: targetStory,
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
      const targetStoryId = fakeDatabase.findIndex((elm) => {
        return elm.id == args.targetId;
      });
      if (targetStoryId == null) {
        return {
          code: 400,
          success: false,
          message: `The id: ${args.targetId} is not existed in DB...`,
        };
      }
      try {
        fakeDatabase.splice(targetStoryId, 1);
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
