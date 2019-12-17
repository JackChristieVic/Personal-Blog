const BlogPost = require('../models/BlogPost.js');

// Create a controller that will find the post by id
module.exports = async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');
    // console.log(blogpost);
    // render and post.ejs page and pass the blogpost object to it
    res.render('post', {
        blogpost
    })
}