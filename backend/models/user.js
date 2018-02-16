const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/help4');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
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

var User = mongoose.model('User', UserSchema);
module.exports = User;

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