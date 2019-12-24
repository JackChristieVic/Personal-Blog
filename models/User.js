const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// encrypt password when user register an account
const bcrypt = require('bcryptjs');
// make sure the username is unique
let uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    // pass in a config object and specify validation rules
    username: {
        type: String,
        trim: true,
        // the message will be displayed as alert when the user doesn't provide a username
        required: [true, "Please provide username"],
        // Mongoose checks uniqueness of the username before saving it to database
        unique: [true, "This username is already taken"],
        minlength: 3
        // maxLength: 12
    },
    password: {
        type: String,
        trim: true,
        // the message will be displayed as alert when the user doesn't provide a password
        required: [true, "Please provide password"],
        minlength: 6
        // maxLength: 12
    }
});

UserSchema.plugin(uniqueValidator);

// 'save' tells Mongoose to save any records into the User schema or User collection, execute the function passed in. It lets us change the user data before saving into the database
UserSchema.pre('save', function(next) {
    //Mongoose makes the UserSchema available via 'this' keyword
    const user = this;

    //bcrypt.hash() function takes in password to be hashed, hash it for 10 times
    bcrypt.hash(user.password, 10, (error, hash) => {
        // now the password is the hashed version
        user.password = hash;
        // call next() to tell mongoose to continue creating the user data
        next();
    });
});


const User = mongoose.model('User', UserSchema);

module.exports = User;


