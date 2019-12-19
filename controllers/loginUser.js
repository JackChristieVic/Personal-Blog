const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (req, res) => {
    // get the username and password from req.body by destructring
    const {username, password} = req.body;
    
    // User.findOne() function tries to find the user with the inputted username
    // 1st username is the username in database
    // 2nd username is the username from webpage input
    User.findOne({username: username}, (error, user) => {
        // if user exist in the database, then compare passwords, else redirect to login page
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    // add a property called userId to session and set it to user._id in database
                    req.session.userId = user._id;
                    res.redirect('/');
                }else{
                    res.redirect('/auth/login');
                }
            })
        } else {
            res.redirect('/auth/login');
        }
    })
}