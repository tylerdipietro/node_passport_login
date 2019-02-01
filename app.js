const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//db config
const db = require('./config/keys').MongoURI;

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
var path = require('path');
var routes = require('./routes/index');
const bodyparser = require('body-parser');



const app = express();

// Passport config
require('./config/passport')(passport);



//connect to mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err =>console.log(err));

//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
//html engine
app.engine('html', require('ejs').renderFile);
//Bodyparser
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//CSS Middleware
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.static(path.join(__dirname, '/public/css')));
//connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/calendar', require('./routes/index'));
app.use('/stats', require('./routes/index'));
app.use('/registration', require('./routes/index'));
app.use('/contact', require('./routes/index'));
app.use('/profile', require('./routes/index'));
app.use('/profileEditor', require('./routes/index'));
app.use('/list', require('./routes/index'));
app.use('/refresh', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));
