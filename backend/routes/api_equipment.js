const express = require('express');
const router = express.Router();
const config = require('../models/db');
const mongoClient = require('mongodb').MongoClient;
const mongoID = require('mongodb').ObjectID;

router.get('/all', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        dbo.collection('res_equipment')
            .find()
            .toArray()
            .then(data=> {
                res.json(data);
            });
    });
});

router.post('/insert', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        let input = {name: req.body.name};
        dbo.collection('res_equipment').insert(input, (err, result) => {
            if(err) throw err;
            let response = {result: 'ok', message: result.result.n + " inserted"};
            res.json(response);
        });
    });
});

router.post('/update', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        let json = {name: req.body.name};
        dbo.collection('res_equipment')
            .update({'_id': new mongoID.ObjectID(req.body._id)},
            { $set: json}, (err, result) => {
                if(err) throw err;
                res.json(result);
            });
    });
});

router.delete('/delete/:_id', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        let del = {_id: new mongoID.ObjectID(req.params._id)};
        dbo.collection('res_equipment').deleteOne(del, (err, result) => {
            var msg = {result: "ok", message: result.result.n + " Delete"};
            console.log(msg);
            res.json(msg);
        });
    });
});

module.exports = router;