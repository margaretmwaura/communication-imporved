const userResolver = require("./user")

module.exports = {

    Mutation : {
       ... userResolver.Mutation
    },

    Query : {
      ... userResolver.Query
    }

}