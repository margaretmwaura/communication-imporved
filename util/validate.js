const {user} = require("communication-imroved-models")

module.exports.validateRegistrationInput = async (first_name, last_name, password, confirm_password, email) => {

    let errors = {}

    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email.match(regexEmail)) {
        errors.email_format = "email does not have the correct email format"
    }

    const existing_user = await user.findOne({email : email})

    if(existing_user){
        errors.email_used = "Email has already been used"
    }

    if(!first_name){
        errors.first_name = "First Name is required"
    }

    if(!last_name){
        errors.last_name = "First Name is required"
    }

   if(!password || !confirm_password) {
        errors.password = "Both password and confirm password are required"
    }

    if(!email){
        errors.email = "email is required"
    }

    if(password != confirm_password){
        errors.password = "The password and the confirm password do not mathc"
    }

    return {
        errors : errors,
        valid: Object.keys(errors).length <= 0
    }
}

module.exports.validateLoginInput = (first_name, password) => {

    let errors = {}
    if(!first_name){
        errors.first_name = "First Name is required"
    }

    if(!password) {
        errors.password = "password is required"
    }


    return {
        errors : errors,
        valid: Object.keys(errors).length <= 0
    }
}
