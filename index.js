const express = require('express');
const app = new express();

// const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const BlogPost = require('./models/BlogPost.js');

const fileUpload = require('express-fileupload');

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleware = require('./middleware/validateMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout');

const flash = require('connect-flash');


global.loggedIn = null;

mongoose.connect('mongodb+srv://jack_vic:88886666@cluster0-swh3j.mongodb.net/my_database',
{useNewUrlParser:true, useUnifiedTopology: true,  useCreateIndex: true});

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use('/posts/store', validateMiddleware);
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.use(flash());
// register the public folder as our static files
app.use(express.static('public'));

app.listen(4000, () => {
    console.log('App is listening on port 4000.');
})

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);


app.get('/auth/register', newUserController);

app.post('/posts/store', storePostController);
app.post('/users/register', storeUserController);

app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);

app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notFound'));








