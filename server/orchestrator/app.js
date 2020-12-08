require('dotenv').config()

const { ApolloServer } = require('apollo-server');
const resolvers = require('./schemas/config/resolvers');
const typeDefs = require('./schemas/config/typeDefs')
const corsOptions = {
  origin: 'http://localhost:3000'
}

const server = new ApolloServer({ typeDefs, resolvers, cors: corsOptions})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});