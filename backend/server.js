const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const cors = require('cors');
const app = express();

// passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// cors middleware
app.use(cors());
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
}


// use session for tacking logins
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    key: 'user_sid',
    cookie: {
        expires: 600000
    }
}));

// Passport init
//require('./models/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg , value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param: formParam,
        msg: msg,
        value: value
    };
    }
}));

// parser incoming request
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(allowCrossDomain);

// serve static files from template
app.use(express.static(path.join(__dirname, '../dist')));


// connect flash
app.use(flash());

// global vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// include routes
const users = require('./routes/api_user');
const system = require('./routes/api_system');
app.use('/users', users);
app.use('/system', system);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('File not found');
    err.status = 404;
    next(err);
});

  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

const server = app.listen(3000, function () {
    const port = server.address().port;
    console.log("server running at %s", port);
});