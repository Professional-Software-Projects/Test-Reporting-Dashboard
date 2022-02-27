import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function GetReport() {
    const [report, getReport] = React.useState(null);
    const { component, version, result, buildNumber, test } = useParams();

    useEffect(() => {
        if (buildNumber === undefined) {
            console.log('Calling fetch request to http://localhost:5000/' + component + '/' + version + '/' + result);
            fetch('http://localhost:5000/' + component + '/' + version + '/' + result)
                .then(res => res.json())
                .then(report => getReport(report))
                .then(console.log(`Successfully received job data from API.`));

        } else if (test === undefined) {
            console.log('Calling fetch request to http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber);
            fetch('http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber)
                .then(res => res.json())
                .then(report => getReport(report))
                .then(console.log(`Successfully received build data from API.`));

        } else {
            console.log('Calling fetch request to http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber + '/' + test);
            fetch('http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber + '/' + test)
                .then(res => res.json())
                .then(report => getReport(report))
                .then(console.log(`Successfully received test data from API.`));
        }
    }, [version, component, result, buildNumber, test]);

    return (
        <div className='App'>
            <pre id='json'>{JSON.stringify(report, null, 4)}</pre>
        </div>
    );
}

export { GetReport as default }