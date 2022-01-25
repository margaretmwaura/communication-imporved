const { gql } = require('apollo-server');

module.exports = gql `

    scalar Datetime

    type User {
        id : ID!
        first_name : String!
        last_name : String!
        email : String!
        password : String!
        token: String!
    }

    type Chat {
        id : ID!
        body : String!
        userId : String!
        createdAt : Datetime!
    }

    type Mutation {
        userRegistration(first_name:String!, last_name:String!, password:String!, confirm_password:String!, email:String!): User!   
        userLogin(first_name:String!, password:String!) :  User! 
        postAChat(body:String!) : Chat!
    }

    type Query{
        getAllUsers:[User]
        getAllUserChats:[Chat]
    }

`