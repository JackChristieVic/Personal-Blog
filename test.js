const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my__databse', {useNewUrlParser: true});

BlogPost.create({
    title: "The Mythbuster's Guide to Saving Money on Enery Bills",
    body: "if YOu have beeing here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. .............................They go like this:"
}, (error, blogpost) => {
    console.log(error, blogpost);
});

BlogPost.find({}, (error, blogpost) => {
    console.log(error, blogpost)
})