import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function DisplayReport() {
    const [report, getReport] = React.useState(null);
    const { version, component, result, buildNumber, test } = useParams();
    console.log('Calling fetch request to http://localhost:5000/' + version + '/' + component + '/' + result + '/' + buildNumber + '/' + test);

    useEffect(() => {
        if (test === undefined) {

            fetch('http://localhost:5000/' + version + '/' + component + '/' + result + '/' + buildNumber)
                .then(res => res.json())
                .then(report => getReport(report))
                .then(console.log(`Successfully received JSON from API. Displaying to ${window.href}.`));

        } else if (buildNumber === undefined) {

            fetch('http://localhost:5000/' + version + '/' + component + '/' + result)
                .then(res => res.json())
                .then(report => getReport(report))
                .then(console.log(`Successfully received JSON from API. Displaying to ${window.href}.`));

        } else {

            fetch('http://localhost:5000/' + version + '/' + component + '/' + result + '/' + buildNumber + '/' + test)
                .then(res => res.json())
                .then(report => getReport(report))
                .then(console.log(`Successfully received JSON from API. Displaying to ${window.href}.`));
        }
    }, [version, component, result, buildNumber, test]);

    return (
        <div className='App'>
            <pre id='json'>{JSON.stringify(report, null, 4)}</pre>
        </div>
    );
}

export { DisplayReport as default }