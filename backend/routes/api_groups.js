const express = require('express');
const router = express.Router();
const config = require('../models/db');
const mongoClient = require('mongodb').MongoClient;
const mongoID = require('mongodb').ObjectID;

router.get('/show', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        dbo.collection('res_groups')
            .find()
            .toArray()
            .then( data => {
                const output = {result: "ok", message: data};
                console.log(output);
                res.json(data);
            });
    });
});

router.post('/insert', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var input = {
            group: req.body.group,
            department: req.body.department
        };
        dbo.collection('res_groups').insert(input, (err, result) => {
            if(err) throw err;
            var response = {result: "ok", message: result.result.n + " Inserted"};
            res.json(response);
        });
    });
});

router.post('/update', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var input = {
            group: req.body.group,
            department: req.body.department
        };
        dbo.collection('res_groups')
        .update({'_id': new mongoID.ObjectID(req.body._id)},
        { $set: input}, function (err, result) {
            if(err) throw err;
            res.json(result);
        });
    })
})

router.delete('/delete/:_id', (req, res, next) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var q = {_id: new mongoID.ObjectID(req.params._id)};
        dbo.collection('res_groups').deleteOne(q, (err, result)=> {
            var msg = {result: "ok", message: result.result.n + " Delete"};
            console.log(msg);
            res.json(msg);
        });
    });
});

module.exports = router;