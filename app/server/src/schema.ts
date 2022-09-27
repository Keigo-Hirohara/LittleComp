import { gql } from 'apollo-server';

export const typeDefs = gql`
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
