const {Kind, GraphQLScalarType} = require('graphql')

module.exports = {
    Datetime : new GraphQLScalarType({
        name : 'DateTime',
        description : 'DateTime scalar type',

        parseValue(){},
        parseLiteral(){},
        serialize(value){
            return new Date(value).toLocaleDateString()
        }
    })
}