const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const mongoID = require('mongodb').ObjectID;
const config = require('../models/db');

router.get('/show', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        dbo.collection('res_locations')
            .find()
            .toArray()
            .then(data => {
                res.json(data);
            });
    });
});

router.post('/insert', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        let input = {
            name: req.body.name
        };
        dbo.collection('res_locations').insert(input, (err, result) => {
            if(err) throw err;
            var response = {result: 'ok', message: result.result.n + " Inserted"};
            res.json(response);
        });
    });
});

router.post('/update', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        let json = {name: req.body.name};
        dbo.collection('res_locations')
            .update({'_id': new mongoID.ObjectID(req.body._id)},
        { $set: json}, function (err, result) {
            if(err) throw err;
            res.json(result);
        });
    });
});

router.delete('/delete/:_id', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        let del = {_id: new mongoID.ObjectID(req.params._id)};
        dbo.collection('res_locations').deleteOne(del, (err, result) => {
            var msg = {result: "ok", message: result.result.n + " Delete"};
            console.log(msg);
            res.json(msg);
        });
    });
});

module.exports = router;