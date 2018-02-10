const express = require('express');
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectID  = require('mongodb').ObjectID;
const config = require('../models/db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// set stroage engine
var storage = multer.diskStorage({
    //destination: './public/uploads/',
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        //var originalname = file.originalname;
        //var extension = originalname.split(".");
        //filename = Date.now() + '.' + extension[extension.length-1];
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file , cb) {
        checkFileType(file,cb);
    }
}).single('photo');

// checkfiletype
function checkFileType(file, cb) {

    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;

    // check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimtype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Image Only');
    }
}


router.get('/index', function (req, res) {
    MongoClient.connect(config.url, (err, db)=> {
        if(err) throw err;
        var dbo = db.db("help4");
        var perPage = 9;
        var page = req.params.page || 1;
        dbo.collection("res_users").find({})
            //.skip((perPage * page) - perPage)
            //.limit(perPage)
            .toArray(function (err, result) {
                if(err) throw err;
                console.log(result);
                res.json(result);
                
            });
    });
});

router.post('/file', function (req, res) {
    upload(req ,res, (err) => {
        if(err) {
            res.render('index', {
                msg: err
            });
        } else {
            if(req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected'
                });
            } else {
                res.render('index', {
                    msg: 'File Uploaded',
                    file: 'uploads/${req.file.filename}'
                });
            }
        }
    });
});

router.post('/add', function (req, res) {
    MongoClient.connect(config.url, (err, db)=> {
        var dbo = db.db("help4");
        var myobj = {
                "firstname": req.body.firstname,
                "lastname": req.body.lastname,
                "password": req.body.password,
                "email": req.body.email,
                "code": req.body.code,
                "date_at": new Date(),
                "active": req.body.active,
                "state": req.body.state,
                "company": req.body.company,
                "group": req.body.group,
            };
        dbo.collection('res_users').insert(myobj, (err, result)=> {
            if(err) throw err;
            const response = {result: 'ok', message: result.result.n};
            res.json(response);
            
        });
    });
});

router.post('/update/', function (req, res) {
    MongoClient.connect(config.url, (err, db) => {
        var dbo = db.db("help4");
        var id = {"_id": new ObjectID(req.body._id)};
        dbo.collection("res_users").update(id, 
            {$set: {
                "firstname": req.body.firstname,
                "lastname": req.body.lastname,
                "password": req.body.password,
                "email": req.body.email,
                "code": req.body.code,
                "active": req.body.active,
                "state": req.body.state,
                "company": req.body.company,
                "group": req.body.group,
            }}, 
            
            function (err, result) {
            if(err) throw err;
            console.log("update success");
            const response = {result: 'ok', message: result.result.n};
            res.json(response);
        });
    });
});

router.post('/delete/', function (req, res) {
    MongoClient.connect(config.url, (err, db) => {
        if(err) throw err;
        var dbo = db.db('help4');
        var myquery = {_id: new ObjectID(req.body._id)};
        dbo.collection("res_users").remove(myquery, (err, result) => {
            if(err) throw err;
            console.log("deleted success");
            const response = {result: 'ok', message: result.result.n};
            res.json(response);
        });
    });
});
module.exports = router;