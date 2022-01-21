const{ model, Schema} = require('mongoose');

// username to be removed as of new requirements

const userSchema = new Schema({
    first_name : String,
    last_name : String,
    password : String,
    email : String,
},{timestamps: true});

module.exports = model('User', userSchema);