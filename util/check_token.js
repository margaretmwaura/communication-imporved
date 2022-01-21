const {AuthenticationError} = require('apollo-server')
const JWT = require("jsonwebtoken")
const user = require('./../models/User')
const SECRET = "Authorizing"

const checkAuth = async function(context){

    const authHeader = context.req.headers.authorization

    if(authHeader){

        const token = authHeader.split('Bearer ')[1]

        if(token){

            try{
                const currentUser = JWT.verify(token, SECRET)
                const authenticatedUser = await user.findById(currentUser.id)
                return authenticatedUser
            }catch{
                throw new AuthenticationError("Invalid/Expired token")
            }
            
        }

    }else{
        throw new Error("Authorization header must be provided")
    }
}

module.exports = {
    checkAuth,
    SECRET
}