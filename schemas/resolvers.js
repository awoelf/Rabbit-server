const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('friends');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    allUsers: async (parent, args, context) => {
      const users = await User.find().populate('friends');

      return users;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      console.log(user);

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      const saltRounds = 10;
    
      if (args._id) {
        const validateUser = await User.findById(args._id);
        const correctPw = await validateUser.isCorrectPassword(args.currentPassword);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const user = await User.findByIdAndUpdate(
          // context.user._id,
          args._id,
          {
            email: args.newEmail,
            firstName: args.newId,
            lastName: args.newNickname,
            password: await bcrypt.hash(args.newPassword, saltRounds),
          },
          { new: true }
        );

        // return user;
        const token = signToken(user);

        return { token, user };
      }

      // throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);
      console.log(token);

      return { token, user };
    },
    addFriend: async (parent, args) => {
      const friend = User.findOneAndUpdate(
        { _id: args.userId },
        { $addToSet: { friends: args.friendId } },
        { new: true }
      );
    },
    removeFriend: async (parent, args) => {
      const friend = User.findOneAndUpdate(
        { _id: args.userId },
        { $pull: { friends: args.friendId } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
