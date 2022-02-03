const express = require('express');
const recordRoutes = express.Router();
// connect to the database
const dbo = require('../db/conn');
// converts record id to an object
const ObjectId = require('mongodb').ObjectId;

// returns a list of the records
recordRoutes.route('/record').get(function(req, res) {
    let dbConnect = dbo.getDb('tests');
    dbConnect
        .collection('records')
        .find({})
        .toArray(function(err, result) {
            if(err) throw err;
            res.json(result);
        });
});

// returns a single record by id 
recordRoutes.route("/record/:id").get(function(req, res) {
    let dbConnect = dbo.getDb();
    let myQuery = { _id: ObjectId(req.params.id) };
    dbConnect
        .connect('records')
        .findOne(myQuery, function(err, result) {
            if(err) throw err;
            res.json(result);
        });
});

// add a record
recordRoutes.route('/record/add').post(function(req, response) {
    let dbConnect = dbo.getDb();
    let myObj = {
        test_number: req.body.test_number,
        test_no_passed: req.body.test_no_passed,
        test_no_failed: req.body.test_no_failed,
    };
    dbConnect.collection("records").insertOne(myObj, function(err, res){
        if(err) throw err;
        response.json(res);
    });
});

// update a record by id
recordRoutes.route('/update/:id').post(function(req, response) {
    let dbConnect = dbo.getDb();
    let myQuery = { _id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            test_number: req.body.test_number,
            test_no_passed: req.body.test_no_passed,
            test_no_failed: req.body.test_no_failed,
        },
    };

    dbConnect
        .collection("records")
        .updateOne(myQuery, newValues, function(err, res) {
            if(err) throw err;
            console.log("1 document updated.");
            response.json(res);
        });
});

recordRoutes.route('/:id').delete((req, response) => {
    let dbConnect = dbo.getDb();
    let myQuery = { _id: ObjectId(req.params.id )};
    dbConnect
        .collection("records")
        .deleteOne(myQuery, function(err, obj) {
            if(err) throw err;
            console.log("1 document deleted.");
            response.status(obj);
        });
});

module.exports = recordRoutes;