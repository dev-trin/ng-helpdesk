const express = require('express');
const router = express.Router();
const config = require('../models/db');
const mongoClient = require('mongodb').MongoClient;
const mongoID = require('mongodb').ObjectID;

router.get('/show', (req, res) => {
    mongoClient.connect(config.url, (err, db)=> {
        var dbo = db.db('help4');
        dbo.collection('res_system')
            .find()
            .toArray()
            .then(data=> {
                const output = {result: "ok", message: data}                
                res.json(data);
                
            });
    });
});

router.get('/findall', (req, res)=> {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        dbo.collection('system_problems')
            .aggregate([
                {
                    $lookup: {
                        from: 'res_users',
                        localField: 'name',
                        foreignField: 'email',
                        as: 'users'
                    }
                }
            ])
            .toArray()
            .then(data=> {
                res.json(data);
                
            });
    });
});

router.post('/add', (req, res) => {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var input = {name: req.body.name};
        dbo.collection('res_system').insertOne(input, (err, result) => {
            if(err) throw err;
            var response = {result: "ok", message: result.result.n + " Inserted"};
            res.json(response);
        });
    });
});

router.post('/edit', (req, res)=> {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var name = req.body.name;
        dbo.collection('res_system')
            .update({'_id': new mongoID.ObjectID(req.body.id)},
            { $set: {'name': name}}, function (err, result) {
                if(err) throw err;
                res.json(result);
            });
    });
});

router.delete('/delete/:name', function (req, res) {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var q = {name: req.params.name};
        dbo.collection('res_system').deleteOne(q, function (err, result) {
            var response = {result: "ok", message: result.result.n + "Delete"};
            res.json(response);
        });
    });
});

router.post('/insert', (req, res) => {
    mongoClient.connect(config.url, (err, db)=> {
        var dbo = db.db('help4');
        var arr = req.body.currenetUser;
        var query = {
            items:  req.body.items,
            date: req.body.date,
            subject: req.body.subject,
            edit: req.body.edit,
            description: req.body.description,
            name: arr
        };
        dbo.collection('system_problems')
            .insert(query, (err, result) => {
                if(err) throw err;
                var response = {result: "ok", message: result.result.n + " Inserted"};
                res.json(response);
            });
    });
});

router.post('/update', (req, res) => {
    mongoClient.connect(config.url , (err, db) => {
        var dbo = db.db('help4');
        var q = {
            subject: req.body.subject,
            items: req.body.items,
            description: req.body.description,
            edit: req.body.edit,
            date: req.body.date
        };
        dbo.collection('system_problems')
        .update({'_id': new mongoID.ObjectID(req.body._id)},
        { $set: q}, function (err, result) {
            if(err) throw err;
            res.json(result);
        });
    })
})

router.delete('/dellistdata/:subject', function (req, res) {
    mongoClient.connect(config.url, (err, db) => {
        var dbo = db.db('help4');
        var q = {subject: req.params.subject};
        dbo.collection('system_problems').deleteOne(q, function (err, result) {
            var response = {result: "ok", message: result.result.n + "Delete"};
            res.json(response);
        });
    });
});

module.exports = router;