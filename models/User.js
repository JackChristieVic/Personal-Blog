const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
let uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        // trim: true,
        required: [true, "Please provide username"],
        unique: true,
        minlength: 3
        // maxLength: 12
    },
    password: {
        type: String,
        // trim: true,
        required: [true, "Please provide password"],
        minlength: 6
        // maxLength: 12
    }
});

UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});


const User = mongoose.model('User', UserSchema);

module.exports = User;


