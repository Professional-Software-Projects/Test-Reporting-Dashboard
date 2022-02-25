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

function getPages(req, res, url, component, result, buildNumber, test) {
    if (component === 'ui') {
        if (result === 'passed') {
            if (buildNumber) {
                if (test === 'testReport') {
                    fetchReport(res, req, url + 'integration-passed/' + buildNumber + '/testReport' + apiSuffix);
                } else {
                    fetchReport(res, req, url + 'integration-passed/' + buildNumber + apiSuffix);
                }
            } else {
                fetchReport(res, req, url + 'integration-passed' + apiSuffix);
            }
        } else if (result === 'failed') {
            if (buildNumber) {
                if (test === 'testReport') {
                    fetchReport(res, req, url + 'ujs-failed/' + buildNumber + '/testReport' + apiSuffix);
                } else {
                    fetchReport(res, req, url + 'ujs-failed/' + buildNumber + apiSuffix);
                }
            } else {
                fetchReport(res, req, url + 'ujs-failed' + apiSuffix);
            }
        }
        else if (result === 'inprogress') {
            if (buildNumber) {
                if (test === 'testReport') {
                    fetchReport(res, req, url + 'integration-inprogress/' + buildNumber + '/testReport' + apiSuffix);
                } else {
                    fetchReport(res, req, url + 'integration-inprogress/' + buildNumber + apiSuffix);
                }
            } else {
                fetchReport(res, req, url + 'integration-inprogress' + apiSuffix);
            }
        } else {
            console.log(`${req.originalUrl} is invalid.`);
            res.json({ message: `${req.originalUrl} is invalid.` });
        }
    } else {
        if (result === 'passed') {
            if (buildNumber) {
                if (test === 'testReport') {
                    fetchReport(res, req, url + 'nightlies-passed/' + buildNumber + '/testReport' + apiSuffix);
                } else {
                    fetchReport(res, req, url + 'nightlies-passed/' + buildNumber + apiSuffix);
                }
            } else {
                fetchReport(res, req, url + 'nightlies-passed' + apiSuffix);
            }
        } else if (result === 'failed') {
            if (buildNumber) {
                if (test === 'testReport') {
                    fetchReport(res, req, url + 'nightlies-failed/' + buildNumber + '/testReport' + apiSuffix);
                } else {
                    fetchReport(res, req, url + 'nightlies-failed/' + buildNumber + apiSuffix);
                }
            } else {
                fetchReport(res, req, url + 'nightlies-failed' + apiSuffix);
            }
        } else {
            console.log(`${req.originalUrl} is invalid.`);
            res.json({ message: `${req.originalUrl} is invalid.` });
        }
    }
}

app.get('/', (req, res) => {
    res.json(`Successful connection on port: ${port}.`);
});

// core data test reports
app.get('/:component/:version/:result/:buildNumber([0-9]+)?/:test?', (req, res) => {
    const component = req.params['component'];
    const version = req.params['version'];
    const result = req.params['result'];
    const buildNumber = req.params['buildNumber'];
    const test = req.params['test'];
    const url = 'http://host.docker.internal:3030/migrator-' + version + '/' + component + '/';

    getPages(req, res, url, component, result, buildNumber, test);
});

app.listen(port, () => {
    connectToServer(function (err) {
        if (err) console.error(err);
    });

    console.log(`Server is running on port: ${port}`);
});