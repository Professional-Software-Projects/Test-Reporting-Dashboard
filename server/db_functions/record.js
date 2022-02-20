import { Router } from 'express';
const recordRoutes = Router();
// connect to the database
import { getDb } from '../db/conn';
// converts record id to an object
import { ObjectId } from 'mongodb';

// returns a list of the records
recordRoutes.route('/record').get(function (req, res) {
    // connect to the database
    let dbConnect = getDb('tests');
    // gets all records and puts them into an array
    dbConnect
        .collection('records')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// returns a single record by id 
recordRoutes.route("/record/:id").get(function (req, res) {
    let dbConnect = getDb();
    // gets all records and returns whichever record matches the supplied id
    let myQuery = { _id: ObjectId(req.params.id) };
    dbConnect
        .connect('records')
        .findOne(myQuery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// add a record
recordRoutes.route('/record/add').post(function (req, response) {
    let dbConnect = getDb();
    // construct record
    let myObj = {
        test_number: req.body.test_number,
        test_no_passed: req.body.test_no_passed,
        test_no_failed: req.body.test_no_failed,
    };
    // insert record
    dbConnect.collection("records").insertOne(myObj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// update a record by id
recordRoutes.route('/update/:id').post(function (req, response) {
    let dbConnect = getDb();
    let myQuery = { _id: ObjectId(req.params.id) };
    // construct new record
    let newValues = {
        $set: {
            test_number: req.body.test_number,
            test_no_passed: req.body.test_no_passed,
            test_no_failed: req.body.test_no_failed,
        },
    };

    // replace old record with new record
    dbConnect
        .collection("records")
        .updateOne(myQuery, newValues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated.");
            response.json(res);
        });
});

// delete a record by id
recordRoutes.route('/:id').delete((req, response) => {
    let dbConnect = getDb();
    let myQuery = { _id: ObjectId(req.params.id) };
    dbConnect
        .collection("records")
        .deleteOne(myQuery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted.");
            response.status(obj);
        });
});

export default recordRoutes;