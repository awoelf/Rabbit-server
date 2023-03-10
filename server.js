const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.json(`Use GraphQL at https://rabbit-app.herokuapp.com${server.graphqlPath}`);
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
	await server.start();
	server.applyMiddleware({ app });

	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`Use GraphQL at https://rabbit-app.herokuapp.com${server.graphqlPath}`);
			console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
		});
	});
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
