module.exports = (req, res) => {
    res.render('login', {
        // retrieve errors from 'validationErrors and present it in the view
        errors: req.session.validationErrors,
    });
}