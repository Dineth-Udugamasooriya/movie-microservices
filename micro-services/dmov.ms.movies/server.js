const { ApolloServer } = require('@apollo/server');
const { resolvers } = require('./schema/resolver');
const { readFileSync } = require('fs');

const typeDefs = readFileSync(require.resolve('./schema/typedefs.graphql')).toString('utf-8');
const queries = readFileSync(require.resolve('./schema/queries.graphql')).toString('utf-8');
const mutations = readFileSync(require.resolve('./schema/mutations.graphql')).toString('utf-8');

const server = new ApolloServer({ // creating a new apollo server instance with the type definitions, queries, mutations, and resolvers
    typeDefs: [typeDefs, queries, mutations],
    resolvers,
});

module.exports = server;