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
        let input = {
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            note: req.body.note,
            zipcode: req.body.zipcode,
            district: req.body.district,
            subdistrict: req.body.subdistrict,
            province: req.body.province,
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

module.exports = router;