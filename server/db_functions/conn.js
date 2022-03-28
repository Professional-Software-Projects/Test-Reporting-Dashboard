import { MongoClient } from 'mongodb';

// get connection string
const connString = 'mongodb://mongo:27017';

var _db;

export function connectToServer(callback) {
    MongoClient.connect(connString, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log('Error connecting to the database. ');
        } else {
            // will only return this message if connection is made
            console.log('Successful connection to the database.');
            client.close();
            return callback(err);
        }
    });
}
export function getDb() {
    return _db;
}

export { MongoClient };