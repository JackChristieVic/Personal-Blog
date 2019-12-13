
module.exports = (req, res) => {
    let username = '';
    let password = '';
    const data = req.flash('data');

    if(typeof data != 'undefined') {
        username = data.username;
        password = data.password;
    }

    res.render('register', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    });
}



