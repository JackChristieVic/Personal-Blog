
// Controller that handles the request from the user to create a new post
// and export it as a default module
module.exports = (req, res) => {
    if(req.session.userId) {
        return res.render('create', {
            createPost: true
        });
    }
    res.redirect('/auth/login');
}
