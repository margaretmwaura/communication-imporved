const userResolvers = require('./user')
const chatResolvers = require('./chat')

module.exports = {

    Mutation: {
       ...userResolvers.Mutation,
       ...chatResolvers.Mutation
    },

    Query: {
       ...userResolvers.Query,
       ...chatResolvers.Query
    }

}