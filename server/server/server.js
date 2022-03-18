require('dotenv').config({ path: './config.env' });
import express, { json } from 'express';
const app = express();
import { make_API_call } from './api_caller';
import cors from 'cors';
import { connectToServer } from '../db_functions/conn';
const port = process.env.PORT || 5000;

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

// check the various parameters and use them to build the fetch request
function buildFetchRequest(req, res, url, component, result, buildNumber, test) {
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

// for testing connection and verifying that json data can be sent to the frontend
app.get('/', (req, res) => {
    res.json(`Successful connection on port: ${port}.`);
});

// enter in the url, and the parameters will be extracted and used to build the api fetch request
app.get('/:component/:version/:result/:buildNumber([1-9]+)?/:test?', (req, res) => {

    // required parameters
    const component = req.params['component'];      // core-data, metadata, ui
    const version = req.params['version'];          // v1, v2
    const result = req.params['result'];            // passed, failed, inprogress (ui only)

    // optional parameters
    const buildNumber = req.params['buildNumber'];  // at least one number
    const test = req.params['test'];                // testReport

    const url = 'http://localhost:3030/migrator-' + version + '/' + component + '/';

    // component needs to be passed in because the ui component has different names for builds
    // core-data and metadata use 'nightlies-passed'/'nightlies-failed'
    // ui uses 'integration-passed'/'integration-inprogress' and 'ujs-failed'
    // this means we need to check for the ui component so that the correct build name will be entered into the fetch request
    buildFetchRequest(req, res, url, component, result, buildNumber, test);
});

// start the server
app.listen(port, () => {
    try {
        connectToServer(function (err) {
            if (err) console.error(err);
        });
    } catch (err) {
        console.error(err);
    } finally {
        console.log(`Server is running on port: ${port}`);
    }

});