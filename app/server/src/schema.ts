import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    getUser: User
    getStories: [Story]

    getTasks(storyId: String, status: String): [Task]
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(email: String!, password: String!): Token!

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

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Story {
    id: ID!
    name: String!
    user_id: String!
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
