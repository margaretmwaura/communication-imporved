import gpl from 'apollo-server'

module.exports = gpl`

    type User {
        id : ID!
        first_name : String!
        last_name : String!
        email : String!
        password : String!
    }

`