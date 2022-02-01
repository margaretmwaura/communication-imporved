const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./datahandlers/typeDefs');
const resolvers = require('./datahandlers/resolvers');

const {MONGODB } = require('./config');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});


mongoose.connect(MONGODB, 
{   
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify: false })
        .then(() => {
            console.log('You are connected to the database')
            return server.listen({port: 6001})
        })
        .then(res => {
            console.log(`Server running at ${res.url}`)
        })