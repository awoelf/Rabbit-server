const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    friends: [User]!
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
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      newEmail: String!
      newId: String!
      newNickname: String!
      newPassword: String!
      currentPassword: String!
    ): User
    login(email: String!, password: String!): Auth
    addFriend(_id: ID): User
    removeFriend(_id: ID): User
  }
`;

module.exports = typeDefs;
