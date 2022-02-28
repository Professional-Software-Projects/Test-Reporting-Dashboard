import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function GetReport() {
    const [report, getReport] = useState(0);
    const { component, version, result, buildNumber, test } = useParams();

    useEffect(() => {
        if (buildNumber === undefined) {
            console.log('Sending fetch request to http://localhost:5000/' + component + '/' + version + '/' + result);
            fetch('http://localhost:5000/' + component + '/' + version + '/' + result)
                .then(res => res.json())
                .then(report => getReport(report))
                .then(console.log(`Successfully received job data from API.`))
                .catch(err => {
                    console.log('Error! Could not communicate with the API.');
                    console.log(err);
                });

        } else if (test === undefined) {
            console.log('Sending fetch request to http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber);
            fetch('http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber)
                .then(res => res.json())
                .then(report => getReport(report))
                .then(console.log(`Successfully received build data from API.`))
                .catch(err => {
                    console.log('Error! Could not communicate with the API.');
                    console.log(err);
                });

        } else {
            console.log('Sending fetch request to http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber + '/' + test);
            fetch('http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber + '/' + test)
                .then(res => res.json())
                .then(report => getReport(report))
                .then(console.log(`Successfully received test data from API.`))
                .catch(err => {
                    console.log('Error! Could not communicate with the API.');
                    console.log(err);
                });
        }
    }, [version, component, result, buildNumber, test]);

    return (
        <div className='App'>
            <pre id='json'>{JSON.stringify(report, null, 4)}</pre>
        </div>
    );
}

export { GetReport as default }