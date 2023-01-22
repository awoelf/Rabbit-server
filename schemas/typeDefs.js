const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Post {
    _id: ID
    postAuthor: String
    title: String
    textContent: String
    imageContent: String
    likes: Int
    createdAt: Date
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: ID
    createdAt: Date
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    allUsers: [User]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
