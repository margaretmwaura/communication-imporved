const {UserInputError} = require("apollo-server")
const {chat} = require("communication-imroved-models");
const { Query } = require(".");
const {checkAuth} = require("./../../util/check_token")

module.exports = {

    Mutation : {

        async postAChat(_, {body}, context){

            let authUser = await checkAuth(context);

            if(!authUser){
                throw new UserInputError("You are required to be authenticated " , {})
            }

            if(!body){
                throw new UserInputError("A body of text is required" , {})
            }

            let newChat =  await new chat({userId : authUser._id, body : body}).save()

            return {
                ...newChat._doc,
                message : "Message saved successfuly"
            }
        }
    },

    Query : {
        async getAllUserChats(_, {}, context){

            let authUser = await checkAuth(context);

            if(!authUser){
                throw new UserInputError("You are required to be authenticated " , {})
            }

            let chats = await chat.find({ userId : authUser._id})

            return chats

        }
    }
}