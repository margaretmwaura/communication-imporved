const userResolvers = require('./user')

module.exports = {

    Mutation: {
       ...userResolvers.Mutation
    },

    Query: {
       ...userResolvers.Query
    }

}