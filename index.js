const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// express session/cookie middleware
const expressSession = require('express-session');

// connect-flash provides a special area of the session used for stroing messages. Messages can be written to this area and cleared after being displayed to the user. In this case, it's used to display the error messages when user forgets to enter username or password when register or log in
const flash = require('connect-flash');


// fileUpload is used to upload image files in './controllers/storePost.js' controller
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');

// for user registration
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
// for user log in
const loginUserController = require('./controllers/loginUser');

const validateMiddleware = require('./middleware/validateMiddleware');

// const loginValidateMiddleware = require('./middleware/loginValidateMiddleware');


// for user log in but to check if user exists in DB or session
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout');

mongoose.connect('mongodb+srv://jack_vic:88886666@cluster0-swh3j.mongodb.net/my_database',
{useNewUrlParser:true, useUnifiedTopology: true,  useCreateIndex: true});

app.set('view engine', 'ejs');
// app.set('trust proxy', 1)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.use('/posts/store', validateMiddleware);
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {}
}));



// hide NEW USER and LOGIN menu if the user is already logged in
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
// register the connection-flash middleware
app.use(flash());
// register the public folder as our static files
app.use(express.static('public'));

app.listen(4000, () => {
    console.log('App is listening on port 4000.');
})

// When user visit these routes, call these controllers
app.get('/', homeController);
app.get('/post/:id', getPostController);
// app.get('/posts/new', newPostController);
app.get('/auth/register', newUserController);
app.post('/posts/store', storePostController);

app.get('/auth/login', loginController);

// for user log in
app.post('/users/login', loginUserController);

// prevent unlogged in user to access NEW POST menu and submit a post
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);


// new user registration route and controller
app.post('/users/register', storeUserController);


// prevent logged in user to see the LOGIN and REGISTER menu
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)


app.get('/auth/logout', logoutController);
// this has to be the last controller
app.use((req, res) => res.render('notFound'));








