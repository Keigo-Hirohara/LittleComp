import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getStories: [Story]

    getTasks(status: String): [Task]
  }

  type Mutation {
    createStory(name: String!): StoryResponse
    renameStory(targetId: ID!, newName: String!): StoryResponse
    deleteStory(targetId: ID!): DeleteStoryResponse

    createTask(storyId: String, taskName: String): TaskResponse
    renameTask(targetId: ID!, newName: String): TaskResponse
    updateTaskStatus(targetId: ID!, newStatus: String!): TaskResponse
    deleteTask(targetId: ID!): DeleteTaskResponse
  }

  type StoryResponse {
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

  type TaskResponse {
    code: Int!
    success: Boolean!
    message: String!
    task: Task
  }

  type DeleteTaskResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type Task {
    id: ID!
    name: String!
    status: String!
    story_id: ID!
  }
`;
