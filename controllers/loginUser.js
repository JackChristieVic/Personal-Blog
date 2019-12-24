const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (req, res) => {
    // get the username and password from req.body by destructring
    const {username, password} = req.body;
    
    // User.findOne() function tries to find the user with the inputted username
    // 1st username is the username in database
    // 2nd username is the username from webpage input
    User.findOne({username: username}, (error, user) => {
        // console.log(error)
         if(user) {
            //  console.log(`14 - ${username} exists`)
            bcrypt.compare(password, user.password, (error, same) => {
                console.log(`same is: ${same}`)
                if(same) {
                    // add a property called userId to session and set it to user._id in database
                    // res.json(same);
                    req.session.userId = user._id;
                    res.redirect('/');
                } else {
                    
                    // const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
                    // req.flash('validationErrors', validationErrors);
                    // req.flash('data', req.body);
                }
            })
        } else {
            // console.log(`29 - ${username} does not exist`)
            // console.log(error)
            res.redirect('/auth/login');
        }
    })
}