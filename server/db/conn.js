const { MongoClient } = require('mongodb');
const assert = require('assert');

// get connection string
const Db = 'mongodb://superuser:DgM8orMPzzmyJY!m@localhost:27017/admin';

var _db;

module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(Db, function(err, client) {
            if(assert.equal(null, err)) {
                console.log('Successfully connected to MongoDB.');
            }
            MongoClient.close();
            return callback(err);
        });
    },

    getDb: function() {
        return _db;
    }
};