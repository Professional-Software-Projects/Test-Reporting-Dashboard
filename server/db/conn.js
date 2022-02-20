import { MongoClient } from 'mongodb';
import { equal } from 'assert';

// get connection string
const connString = 'mongodb://mongo:27017';
const containerConnString = process.env.MONGODB_CONNSTRING;

var _db;

export function connectToServer(callback) {
    MongoClient.connect(connString, function (err, client) {
        equal(null, err);
        // will only return this message if connection is made
        console.log('Successful connection to the database.');
        client.close();
        return callback(err);
    });
}
export function getDb() {
    return _db;
}