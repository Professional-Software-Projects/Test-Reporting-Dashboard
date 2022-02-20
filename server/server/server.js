// importing packages
require('dotenv').config({ path: './config.env' });
import { join } from 'path';
import express, { json } from 'express';
const app = express();
import { make_API_call } from './api_caller';
import cors from 'cors';
import { connectToServer } from '../db_functions/conn';
const port = process.env.PORT || 5000;
const pathToIndex = join(__dirname, '/../client/public');

// any information received by the server is put through this middleware
// which will do things such as formatting the body of a request to JSON
app.use(json());
app.use(cors());

app.get('/', (req, res) => {
    res.json(`Successful connection on port ${port}.`);
});

// gets test results from an API endpoint
app.get('/json', (req, res) => {
    make_API_call('http://host.docker.internal:3030/migrator-v2/metadata/nightlies-passed/2/testReport/api/json')
        .then(response => {
            console.log('Successful API call.');
            res.json(response);
        })
        .catch(err => {
            console.log('Unsuccessful API call.')
            console.log(err);
            res.send(err);
        });
});


app.listen(port, () => {
    connectToServer(function (err) {
        if (err) console.error(err);
    });

    console.log(`Server is running on port: ${port}`);
});