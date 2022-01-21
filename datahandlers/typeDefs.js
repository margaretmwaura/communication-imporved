const { gql } = require('apollo-server');

module.exports = gql `

    type User {
        id : ID!
        first_name : String!
        last_name : String!
        email : String!
        password : String!
    }

    type Query{
        getAllUsers:[User]
    }

    type Mutation {
        userRegistration(first_name:String!, last_name:String!, password:String!, confirm_password:String!, email:String!): User!      
    }

`