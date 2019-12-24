// import BlogPost file
const BlogPost = require('../models/BlogPost.js');

// create a controller that will get all the posts from the DB so when the user goes to the home page, all the posts are shown there
module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');
    // console.log(req.session)
    res.render('index', {
        blogposts
    });
}