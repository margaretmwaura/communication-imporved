const userResolvers = require('./user')
const chatResolvers = require('./chat')
const {Datetime} = require('./datetime')

module.exports = {

    Mutation: {
       ...userResolvers.Mutation,
       ...chatResolvers.Mutation
    },

    Query: {
       ...userResolvers.Query,
       ...chatResolvers.Query
    },

    Datetime : Datetime
}