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
const app = express();

// passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// connect to mongodb
mongoose.createConnection('mongodb://localhost:27017/help4');
var db = mongoose.connection


// use session for tacking logins
//app.use(cookieParser());
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

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

// serve static files from template
app.use(express.static(path.join(__dirname, '../dist')));

// include routes
const users = require('./routes/api_user');
app.use('/users', users);


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