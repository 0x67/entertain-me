const { ApolloServer } = require('apollo-server');
const resolvers = require('./schemas/config/resolvers');
const typeDefs = require('./schemas/config/typeDefs')

const server = new ApolloServer({ typeDefs, resolvers})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});