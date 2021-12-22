import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Error {
    message: String
    field: [String]
  }

  type User {
    email: String
    id: String
    username: String
    firstName: String
    lastName: String
    createdAt: String
    updatedAt: String
  }


  type Response {
    user: User
    error: Error
  }


  type Query {
    files: [String]
    me: User
  }

  type Mutation {
    logout: Boolean
    uploadFile(file: Upload!): Boolean
    login(email: String, password: String, username: String): Response
    register(
      firstName: String
      lastName: String
      email: String
      username: String
      password: String
      confirmPassword: String
    ): Response
    confirmUser(token: String): Boolean
  }
`;
