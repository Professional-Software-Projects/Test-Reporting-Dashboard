// importing packages
require('dotenv').config({ path: './config.env' });
const path = require('path');
const express = require('express');
const app = express();
const api_caller = require('./api_caller');
const cors = require('cors');
const dbo = require('./db/conn');
const port = process.env.PORT || 5000;
const pathToIndex = path.join(__dirname, '/../client/public');

// any information received by the server is put through this middleware
// which will do things such as formatting the body of a request to JSON
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json("Successful Connection.");
});

// gets test results from an API endpoint
app.get('/json', (req, res) => {
    api_caller.make_API_call('http://localhost:3030/migrator-v2/metadata/nightlies-passed/2/testReport/api/json')
        .then(response => { 
            console.log('Succesful API call.');
            res.json(response);
        })
        .catch(err => {
            console.log('Unsuccessful API call.')
            console.log(err);
            res.send(err);
        });
});

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if(err) console.error(err);
    });
    
    console.log(`Server is running on port: ${port}`);
});