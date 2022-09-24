const { ApolloServer, gql } = require('apollo-server');

const fakeDatabase = [
  {
    id: 'id1',
    name: 'graphql server setup',
  },
  {
    id: 'id2',
    name: 'mysql integration',
  },
  {
    id: 'id3',
    name: 'implement authentication',
  },
];

const typeDefs = gql`
  type Query {
    getStories: [Story]
  }

  type Mutation {
    createStory(name: String!): CreateStoryResponse
    renameStory(targetId: ID!, newName: String!): RenameStoryResponse
    deleteStory(targetId: ID!): DeleteStoryResponse
  }

  type CreateStoryResponse {
    code: Int!
    success: Boolean!
    message: String!
    story: Story
  }

  type RenameStoryResponse {
    code: Int!
    success: Boolean!
    message: String!
    story: Story
  }

  type DeleteStoryResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type Story {
    id: ID!
    name: String!
  }
`;

const resolvers = {
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
      const targetStory = fakeDatabase.find((elm) => (elm.id = args.targetId));
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
      const targetStoryId = fakeDatabase.findIndex(
        (elm) => (elm.id = args.targetId)
      );
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

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(() => {
  console.log('server is listening on port 4000!');
});
