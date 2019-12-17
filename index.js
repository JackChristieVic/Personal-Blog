const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// fileUpload is used to upload image files in './controllers/storePost.js' controller
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const flash = require('connect-flash');

const validateMiddleware = require('./middleware/validateMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout');




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

// When user visit these routes, call these controllers
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

// this has to be the last controller
app.use((req, res) => res.render('notFound'));








