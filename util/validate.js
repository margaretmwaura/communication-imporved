const validateRegistrationInput = function(first_name, last_name, password, confirm_password, email){

    let errors = {}
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
        valid: Object.keys(errors).length < 0
    }
}

const validateLoginInput = function(first_name, last_name, password){

    let errors = {}
    if(!first_name){
        errors.first_name = "First Name is required"
    }

    if(!last_name){
        errors.last_name = "First Name is required"
    }

    if(!password) {
        errors.password = "password is required"
    }


    return {
        errors : errors,
        valid: Object.keys(errors).length < 0
    }
}

export default {
    validateRegistrationInput,
    validateLoginInput
}