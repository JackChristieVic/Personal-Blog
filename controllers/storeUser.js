// import User schema first
const User = require('../models/User.js');
const path = require('path');

// for user registration
module.exports = (req, res) => {
    // Mongoose creates a database based on the User schema
    User.create(req.body, (error, user) => {
        if(error) {
            // Object.keys: allow you to access the properties of the error array Object
            // Map thru the error.errors array keys to access error message property associated with the keys. In this case, keys are: username, password. messages are: please provide username, please provide password
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            // connect-flash middleware enables all requests to have a req.flash() function. In flash(), we specify that validation errors will be stored in the validationErrors key
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            
            return res.redirect('/auth/register');
        }
        res.redirect('/');
    });
}