
// prevent logged in user to see the LOGIN and REGISTER menu
module.exports = (req, res, next) =>{ 
    // if user logged in(ie: his id is in session), redirect to home page
    if(req.session.userId){ 
        return res.redirect('/') 
    }
    next() 
}

