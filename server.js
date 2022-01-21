const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./datahandlers/typeDefs');
const resolvers = require('./datahandlers/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});


mongoose.connect("mongodb://localhost:27017/communication", 
{ useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify: false })
        .then(() => {
            console.log('You are connected to the database')
            return server.listen({port: 6000})
        })
        .then(res => {
            console.log(`Server running at ${res.url}`)
        })