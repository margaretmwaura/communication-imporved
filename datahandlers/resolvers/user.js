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

            console.log(errors)
            if(!valid){
                throw new UserInputError('Errors', errors)
            }

            password = await bcrypt.hash(password, 12)

            const new_user = new user({first_name, last_name, password, email})

            const newest_user = await new_user.save();

            console.log(newest_user)

            const token = generateToken(newest_user)

            return{
                ...newest_user._doc,
                message : "User created successfully",
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