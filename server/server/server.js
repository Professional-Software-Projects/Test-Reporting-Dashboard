// importing packages
require('dotenv').config({ path: './config.env' });
import { join } from 'path';
import express, { json } from 'express';
const app = express();
import { make_API_call } from './api_caller';
import cors from 'cors';
import { connectToServer } from '../db_functions/conn';
import e from 'express';
const port = process.env.PORT || 5000;
const pathToIndex = join(__dirname, '/../client/public');

// any information received by the server is put through this middleware
// which will do things such as formatting the body of a request to JSON
app.use(json());
app.use(cors());

// to get the health report, only have the build type (nightlies-passed/)
// to get the general report, add the build number after the build type (nightlies-passed/2/)
// to get the overview, add 'testReport' after the build number (nightlies-passed/2/testReport)
/*
    'http://host.docker.internal:3030/migrator-v1/core-data/nightlies-passed/api/json',                 // 0 
    'http://host.docker.internal:3030/migrator-v1/core-data/nightlies-passed/2/api/json',               // 1
    'http://host.docker.internal:3030/migrator-v1/core-data/nightlies-passed/2/testReport/api/json',    // 2
    'http://host.docker.internal:3030/migrator-v1/core-data/nightlies-failed/api/json',                 // 3
    'http://host.docker.internal:3030/migrator-v1/core-data/nightlies-failed/2/api/json',               // 4
    'http://host.docker.internal:3030/migrator-v1/core-data/nightlies-failed/2/testReport/api/json',    // 5
    
    // 
    'http://host.docker.internal:3030/migrator-v1/ui/integration-passed/api/json',                      // 9
    'http://host.docker.internal:3030/migrator-v1/ui/integration-passed/2/api/json',                    // 10
    'http://host.docker.internal:3030/migrator-v1/ui/integration-passed/2/testReport/api/json',         // 11
    'http://host.docker.internal:3030/migrator-v1/ui/integration-inprogress/api/json',                  // 12
    'http://host.docker.internal:3030/migrator-v1/ui/integration-inprogress/2/api/json',                // 13
    'http://host.docker.internal:3030/migrator-v1/ui/integration-inprogress/2/testReport/api/json',     // 14
    'http://host.docker.internal:3030/migrator-v1/ui/ujs-failed/api/json',                              // 15
    'http://host.docker.internal:3030/migrator-v1/ui/ujs-failed/2/api/json',                            // 16
    'http://host.docker.internal:3030/migrator-v1/ui/ujs-failed/2/testReport/api/json',                 // 17
    
    // 
    'http://host.docker.internal:3030/migrator-v1/metadata/nightlies-failed/api/json',                  // 18
    'http://host.docker.internal:3030/migrator-v1/metadata/nightlies-failed/2/api/json',                // 19
    'http://host.docker.internal:3030/migrator-v1/metadata/nightlies-failed/2/testReport/api/json',     // 20
    'http://host.docker.internal:3030/migrator-v1/metadata/nightlies-passed/api/json',                  // 21
    'http://host.docker.internal:3030/migrator-v1/metadata/nightlies-passed/2/api/json',                // 22
    'http://host.docker.internal:3030/migrator-v1/metadata/nightlies-passed/2/testReport/api/json',     // 23
    
    // 
    'http://host.docker.internal:3030/migrator-v2/core-data/nightlies-passed/api/json',                 // 24
    'http://host.docker.internal:3030/migrator-v2/core-data/nightlies-passed/2/api/json',               // 25
    'http://host.docker.internal:3030/migrator-v2/core-data/nightlies-passed/2/testReport/api/json',    // 26
    'http://host.docker.internal:3030/migrator-v2/core-data/nightlies-failed/api/json',                 // 27
    'http://host.docker.internal:3030/migrator-v2/core-data/nightlies-failed/2/api/json',               // 28
    'http://host.docker.internal:3030/migrator-v2/core-data/nightlies-failed/2/testReport/api/json',    // 29
    
    // 
    'http://host.docker.internal:3030/migrator-v2/ui/integration-passed/api/json',                      // 33
    'http://host.docker.internal:3030/migrator-v2/ui/integration-passed/2/api/json',                    // 34
    'http://host.docker.internal:3030/migrator-v2/ui/integration-passed/2/testReport/api/json',         // 35
    'http://host.docker.internal:3030/migrator-v2/ui/integration-inprogress/api/json',                  // 36
    'http://host.docker.internal:3030/migrator-v2/ui/integration-inprogress/2/api/json',                // 37
    'http://host.docker.internal:3030/migrator-v2/ui/integration-inprogress/2/testReport/api/json',     // 38
    'http://host.docker.internal:3030/migrator-v2/ui/ujs-failed/api/json',                              // 39
    'http://host.docker.internal:3030/migrator-v2/ui/ujs-failed/2/api/json',                            // 40
    'http://host.docker.internal:3030/migrator-v2/ui/ujs-failed/2/testReport/api/json',                 // 41
    
    // 
    'http://host.docker.internal:3030/migrator-v2/metadata/nightlies-failed/api/json',                  // 42
    'http://host.docker.internal:3030/migrator-v2/metadata/nightlies-failed/2/api/json',                // 43
    'http://host.docker.internal:3030/migrator-v2/metadata/nightlies-failed/2/testReport/api/json',     // 44
    'http://host.docker.internal:3030/migrator-v2/metadata/nightlies-passed/api/json',                  // 45
    'http://host.docker.internal:3030/migrator-v2/metadata/nightlies-passed/2/api/json',                // 46
    'http://host.docker.internal:3030/migrator-v2/metadata/nightlies-passed/2/testReport/api/json'      // 47
*/

const migratorCoreDataV1 = 'http://host.docker.internal:3030/migrator-v1/core-data/';
const migratorCoreDataV2 = 'http://host.docker.internal:3030/migrator-v2/core-data/';
const migratorMetadataV1 = 'http://host.docker.internal:3030/migrator-v1/metadata/';
const migratorMetadataV2 = 'http://host.docker.internal:3030/migrator-v2/metadata/';
const migratorUIV1 = 'http://host.docker.internal:3030/migrator-v1/ui/';
const migratorUIV2 = 'http://host.docker.internal:3030/migrator-v2/ui/';
const apiSuffix = '/api/json';

function fetchReport(res, req, url) {
    make_API_call(url)
        .then(response => {
            res.json(response);
            console.log(`Communication with the API from ${req.originalUrl} was successful.`);
        })
        .catch(err => {
            console.log(`Unable to communicate with the API from ${req.originalUrl}. Is the API down?`);
            console.log(err);
            res.send(err);
        });
}

app.get('/', (req, res) => {
    res.json(`Successful connection on port: ${port}.`);
});

// core data test report
app.get(['/:version/coreData/:result', '/:version/coreData/:result/:buildNumber([0-9]+)', '/:version/coreData/:result/:buildNumber([0-9]+)/report?'], (req, res) => {
    const version = req.params['version'];
    const result = req.params['result'];
    const buildNumber = req.params['buildNumber'];
    const report = req.params['report'];

    if (version === 'v1' && result === 'passed') {
        if (buildNumber) {
            if (report) {
                fetchReport(res, req, migratorCoreDataV1 + 'nightlies-passed/' + buildNumber + '/' + 'testReport' + apiSuffix);
            } else {
                fetchReport(res, req, migratorCoreDataV1 + 'nightlies-passed/' + buildNumber + apiSuffix);
            }
        } else {
            fetchReport(res, req, migratorCoreDataV1 + 'nightlies-passed' + apiSuffix);
        }

    } else if (version === 'v1' && result === 'failed') {
        fetchReport(res, req, migratorCoreDataV1 + 'nightlies-failed' + apiSuffix);
    } else if (version === 'v2' && result === 'passed') {
        fetchReport(res, req, migratorCoreDataV2 + 'nightlies-passed' + apiSuffix);
    } else if (version === 'v2' && result === 'failed') {
        fetchReport(res, req, migratorCoreDataV2 + 'nightlies-failed' + apiSuffix);
    } else {
        console.log(`${req.originalUrl} is invalid.`);
        res.json({ message: `${req.originalUrl} is invalid.` });
    }
});

// app.get('/:version/coreData/:result/:buildNumber([0-9]+)', (req, res) => {
//     const version = req.params['version'];
//     const result = req.params['result'];
//     const buildNumber = req.params['buildNumber'];

//     if(version === 'v1')
// })

// metadata test report
app.get('/:version/metadata/:result', (req, res) => {
    const version = req.params['version'];
    const result = req.params['result'];

    if (version === 'v1' && result === 'passed') {
        fetchReport(res, req, migratorMetadataV1 + 'nightlies-passed' + apiSuffix);
    } else if (version === 'v1' && result === 'failed') {
        fetchReport(res, req, migratorMetadataV1 + 'nightlies-failed' + apiSuffix);
    } else if (version === 'v2' && result === 'passed') {
        fetchReport(res, req, migratorMetadataV2 + 'nightlies-passed' + apiSuffix);
    } else if (version === 'v2' && result === 'failed') {
        fetchReport(res, req, migratorMetadataV2 + 'nightlies-failed' + apiSuffix);
    } else {
        console.log(`${req.originalUrl} is invalid.`);
        res.json({ message: `${req.originalUrl} is invalid.` });
    }
});

// ui test report
app.get('/:version/ui/:result', (req, res) => {
    const version = req.params['version'];
    const result = req.params['result'];

    if (version === 'v1' && result === 'passed') {
        fetchReport(res, req, migratorUIV1 + 'integration-passed' + apiSuffix);
    } else if (version === 'v1' && result === 'inprogress') {
        fetchReport(res, req, migratorUIV1 + 'integration-inprogress' + apiSuffix);
    } else if (version === 'v1' && result === 'failed') {
        fetchReport(res, req, migratorUIV1 + 'ujs-failed' + apiSuffix);
    } else if (version === 'v2' && result === 'passed') {
        fetchReport(res, req, migratorUIV2 + 'integration-passed' + apiSuffix);
    } else if (version === 'v2' && result === 'inprogress') {
        fetchReport(res, req, migratorUIV2 + 'integration-inprogress' + apiSuffix);
    } else if (version === 'v2' && result === 'failed') {
        fetchReport(res, req, migratorUIV2 + 'ujs-failed' + apiSuffix);
    } else {
        console.log(`${req.originalUrl} is invalid.`);
        res.json({ message: `${req.originalUrl} is invalid.` });
    }
});

app.listen(port, () => {
    connectToServer(function (err) {
        if (err) console.error(err);
    });

    console.log(`Server is running on port: ${port}`);
});