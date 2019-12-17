// import the BlogPost model first
const BlogPost = require('../models/BlogPost.js');
// import path so that we can use path.resolve() function
const path = require('path');

// import express-fileupload in index.js as the following:
// const fileUpload = require('express-fileupload');
// fileUpload is used to upload image files in './controllers/storePost.js' controller
module.exports = (req, res) => {
    
    // express-fileupload adds files property to the req object so that we can access the uploaded files using req.files
    let image = req.files.image;
    
    // move the file to the public/img/ directory with the image file name
    // '..' - two dots means going up a directory
    image.mv(path.resolve(__dirname, '..', 'public/img/', image.name), async (error) => {
        // wait for mongoose to create the model for BlogPost with the following object in the DB. Here async / await is used instead of callback function
        await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name,
                userid: req.session.userId
            })
        // .then(data => console.log('DATA: \n' + data))
        .catch(error => console.log('ERROR: \n' + error));

        res.redirect('/');
    });
}