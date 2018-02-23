const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../models/db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer');

// node js email send form example
var transporter = nodemailer.createTransport({
    service: 'gmail',
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'it@bicchemical.com',
      pass: 'bic-1111'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});
  

passport.use('local',new LocalStrategy(
    function(email,password, done) {
        User.getUserByEmail(email, function(err, user) {
            if(err) throw err;
            if(!user) {
                return done(null, false, {message: 'Unknown User'});
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
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
    User.getUserById(id, function (err,user) {
        done(err, user);
    });
});


router.get('/user/:user', function (req, res) {
    res.cookie('name', req.params.user)
        .send('<p>cookie <a href="/users/user"> veiw </p>');
});

router.get('/user', function (req, res) {
   // res.send(req.cookies.name);
    //res.clearCookie('name')
   //     .send(req.cookies.name);
});

/*router.post('/authenticate', 
    passport.authenticate('local', {successRedirect: '/profile',failureRedirect: '/login'}), (req, res)=> {
        res.json({result: "OK"});
});*/

router.post('/authenticate_one', passport.authenticate('local', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}), (req, res) => {
    res.json({result: "OK"});
});

router.post('/authenticate', function (req, res) {
    MongoClient.connect(config.url, (err, db)=> {
        var dbo = db.db('help4');
        var query = {$and: [
            {$or: [{email: req.body.email}, {password: req.body.password}]}
        ]};
        dbo.collection("res_users").find(query)
            .toArray(function (err,result) {
                if(err) throw err;
                if(result.length > 0) {
                    if(result[0].email == req.body.email && result[0].password == req.body.password) {
                        console.log(result);
                        var msg = {status: "success", result: result};                        
                        res.json(msg);
                    } else {
                        console.log("email and password dones not match");
                        var msg = {status: "fail"};
                        res.json(msg);
                    }
                } else {
                    var msg = {status: "exits"};
                    res.json(msg);
                    console.log("email and password does not exits");
                }
            });
    });
});


router.post('/forgot', (req, res) => {
    MongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var q = {email: req.body.email};
        dbo.collection("res_users").find(q)
            .toArray((err, result) => {
                if(err) throw err;
                console.log(result);
                let mail = result[0].email;
                let pass = result[0].password;
                  let txt = "<h1> สวัสดีคุณ " + result[0].firstname + "   "  + result[0].lastname + "</h1>";
                  let txt2 = "<p> ระบบได้ส่รหัสผ่านให้คุณ คือ <b>" +  result[0].password   +  "</b></p>";

                var mailOptions = {
                    from: 'system admin <it@bicchemical.com>',
                    to: mail,
                    subject: 'ระบบแจ้งรหัสผ่านอัตโนมัติ',
                    //text: 'That was easy!',
                    html: txt + txt2
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if(error) {
                        console.log(error);
                    } else {
                        console.log('Message sent: %s', info.messageId);        
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    }
                    transporter.close();
                });
                let response = {content: "ok", msg: "success"};
                res.json(response);
            });
    });
});



module.exports = router;