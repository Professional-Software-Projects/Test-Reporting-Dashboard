const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// get connection string
const connString = 'mongodb://mongo:27017';
const containerConnString = process.env.MONGODB_CONNSTRING;

var _db;

module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(connString, function(err, client) {
            assert.equal(null, err);
            // will only return this message if connection is made
            console.log('Successful connection to the database.');
            client.close();
            return callback(err);
        });
    },

    getDb: function() {
        return _db;
    }
};