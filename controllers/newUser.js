
module.exports = (req, res) => {
    let username = '';
    let password = '';
    const data = req.flash('data');

    if(typeof data != 'undefined') {
        username = data.username;
        password = data.password;
    }

    // if(req.session.userId) {
    //     return res.render('create')
    // }
    // res.redirect('/auth/login');

    // retrieve the errors from the session using req.session.validation errors and pass it to register.ejs
    res.render('register', {
        // retrieve errors from 'validationErrors and present it in the view
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    });
}



