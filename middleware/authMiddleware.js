const User = require('../models/User');

module.exports = (req, res, next) => {
    // fetch user from DB, check to see if user exists or retrieved. If no user found in DB or there is error, redirect to home page 
    User.findById(req.session.userId, (error, user) => {
        if(error || !user) {
            return res.redirect('/');
        }
        // otherwise, move on by next()
        next();
    });
}