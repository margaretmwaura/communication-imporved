const bcrypt = require("bcryptjs")
const {sign} = require("jsonwebtoken")
const {UserInputError} = require("apollo-server")
const { validateRegistrationInput, validateLoginInput } = require("../../util/validate")
const { SECRET, checkAuth } = require("../../util/check_token")
const {user} = require("communication-imroved-models")

function generateToken(user){
    return sign({
       id : user.id,
       email : user.email,
       firstname : user.firstname
    },
    SECRET,
    {expiresIn: '1h'}
    )
}

module.exports = {

    Mutation: {

        async userRegistration(_, {first_name, last_name, password, confirm_password, email}, context){
            const {errors, valid} = validateRegistrationInput(first_name, last_name, password, confirm_password, email)

            if(!valid){
                throw new UserInputError('Errors', errors)
            }

            password = await bcrypt.hash(password, 12)

            const new_user = new user({first_name, last_name, password, email})

            const newest_user = await new_user.save();

            const token = generateToken(newest_user)

            return {
                ...newest_user._doc,
                id: newest_user._id,
                message : "User created successfully",
                token
            }
        },

        async userLogin(_, {first_name , password}, context){

            const {errors, valid} = validateLoginInput(first_name, password)

            if(!valid){
                throw new UserInputError('Errors', errors)
            }

            let loggingUser = await user.findOne({first_name})

            if(!loggingUser){
                throw new UserInputError('There is no user with that name', errors)
            }

            let passwordMatch = await bcrypt.compare(password, loggingUser.password)

            if(!passwordMatch){
                throw new UserInputError('You entered the wrong password', errors)
            }

            let token = generateToken(loggingUser)

            console.log(loggingUser._doc)

            return {
                ...loggingUser._doc,
                id: loggingUser._id,
                message : "User Logged successfully",
                token
            }

        }
    },

    Query: {

        async getAllUsers(_, {}, context){
            const {id} = await checkAuth(context)
            try{
                const users = user.find({});
                return users
            }catch(err){
                throw new Error(err);
            }
        }
    }

}