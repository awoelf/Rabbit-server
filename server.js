// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = Number.parseInt(process.env.PORT) || 3001;
// const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('/', (req, res) => {
//   res.json('Hello');
// });

// Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async (typeDefs, resolvers) => {
//   await server.start();
//   server.applyMiddleware({ app });
  
//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at https://rabbit-app.herokuapp.com/${PORT}${server.graphqlPath}`);
//     })
//   })
//  };
  
  // Call the async function to start the server
  // startApolloServer(typeDefs, resolvers);

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`Server ready at ${url}`);