const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//mongoose.connect('mongodb://localhost:27017/help4');
//var db = mongoose.createConnection;

var UserSchema = mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        //match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true
    },
    passwordConf: {
        type: String,
        required: true,
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.getSalt(10, function (err, salt) {
       bcrypt.hash(newUser.password, salt, function (err,hash) {
           newUser.password = hash;
           newUser.save(callback);
       });
    });
}

module.exports.getUserByEmail = function (email, callback){
    var q = {email: email};
    User.findOne(q, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback ) {
    bcrypt.compare(candidatePassword, hash, function (err,isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}