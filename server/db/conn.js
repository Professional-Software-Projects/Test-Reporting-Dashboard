const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// get connection string
const connString = 'mongodb://localhost:27017';

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