const express = require('express');
const router = express.Router();
const config = require('../models/db');
const mongoClient = require('mongodb').MongoClient;
const mongoID = require('mongodb').ObjectID;


router.get('/all', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        dbo.collection('res_supplier')
            .find()
            .toArray()
            .then(data => {
                if(err) throw err;
                res.json(data);
            });
    });
});

router.post('/insert', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var input = {
            name: req.body.name,
            address: req.body.address,
            district: req.body.district,
            subdistrict: req.body.subdistrict,
            province: req.body.province,
            zipcode: req.body.zipcode,
            email: req.body.email,
            note: req.body.note,
            tel: req.body.tel,
            fax: req.body.fax,
            contact: req.body.contact
        };
        dbo.collection('res_supplier').insert(input, (err, result) => {
            const response = {result: 'ok', message: result.result.n + " inserted"};
            res.json(response);
        });
    });
});

router.post('/update', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var json = {
            name: req.body.name,
            address: req.body.address,
            district: req.body.district,
            subdistrict: req.body.subdistrict,
            province: req.body.province,
            zipcode: req.body.zipcode,
            email: req.body.email,
            note: req.body.note,
            tel: req.body.tel,
            fax: req.body.fax,
            contact: req.body.contact
        };
        dbo.collection('res_supplier')
            .update({_id: new mongoID.ObjectID(req.body._id)}, 
            { $set: json}, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
    });
});

router.delete('/delete/:_id', (req, res) => {
    mongoClient.connect(config.url, (err,db) => {
        var dbo = db.db('help4');
        let del = {_id: new mongoID.ObjectID(req.params._id)};
        dbo.collection('res_supplier').deleteOne(del, (err, result) => {
            var msg = {result: "ok", message: result.result.n + " Delete"};
            console.log(msg);
            res.json(msg);
        });
    });
});

module.exports = router;