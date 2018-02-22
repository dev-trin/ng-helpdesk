var LocalStrategy = require('passport-local').Strategy;

var User = require('./user');

module.exports = function(passport) {

     // used to serialize the user for the session
     passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    //เข้าสู่ระบบ    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err)
                    return done(err);
                //ไม่พบ user ในระบบ
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                //รหัสผ่านไม่ถูกต้อง
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                //เข้่าสู่ระบบสำเร็จ
                return done(null, user);
            });

        }));
}