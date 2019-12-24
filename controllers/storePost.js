// import the BlogPost model first
const BlogPost = require('../models/BlogPost.js');
// import path so that we can use path.resolve() function
const path = require('path');

// import express-fileupload in index.js as the following:
// const fileUpload = require('express-fileupload');
// fileUpload is used to upload image files in './controllers/storePost.js' controller
module.exports = (req, res) => {
    console.log('Print out the body')
    console.log(req.body)
    // express-fileupload adds files property to the req object so that we can access the uploaded files using req.files
    let image = req.files.image;
    
    // move the file to the public/img/ directory with the image file name
    // '..' - two dots means going up a directory
    image.mv(path.resolve(__dirname, '..', 'public/img/', image.name), async (error) => {
        // wait for mongoose to create the model for BlogPost with the following object in the DB. Here async / await is used instead of callback function
        await BlogPost.create({
                // append the image property and userid property to req.body by using the spread operator. So before the ...red.body spread operation, req.body only has title abd body properties. After the operation, it has title, body, image and userid properties
                // if not use ...req.body spread operator, then write dulicative code like this
                // title: req.body.title,
                // body: req.body.body,
                ...req.body,
                image: '/img/' + image.name,
                userid: req.session.userId
            })
        // .then(data => console.log('1 - req.body: \n' + data))
        .catch(error => console.log('2 - ERROR: \n' + error));
        res.redirect('/');
    });
}