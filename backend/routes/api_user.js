const express = require('express');
const router = express.Router();
const Users = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
    function(email,password, done) {
        Users.getUserByEmail(email, function(err, user) {
            if(err) throw err;
            if(!user) {
                return done(null, false, {message: 'Unknown User'});
            }
            Users.comparePassword(password, user.password, function (err, isMatch) {
                if(err) throw err;
                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false,{message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Users.getUserById(id, function (err,user) {
        done(err, user);
    });
});

/* Handle Login POST */
router.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true , 
}), function (req, res) {
    res.redirect('/main/request/');
});

router.post('/api', function (req, res) {
    console.log("node");
    console.log(req.body.name);
}); 

module.exports = router;