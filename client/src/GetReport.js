import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style/report.css';

function GetReport() {
    const [report, getReport] = useState(0);
    const { component, version, result, buildNumber, test } = useParams();

    useEffect(() => {
        let isMounted = true;

        if (buildNumber === undefined) {
            console.log('Sending fetch request to http://localhost:5000/' + component + '/' + version + '/' + result);
            fetch('http://localhost:5000/' + component + '/' + version + '/' + result)
                .then(res => res.json())
                .then(report => {
                    if (isMounted) {
                        getReport(report);
                    }
                })
                .catch(err => {
                    console.log('Error! Could not communicate with the API.');
                    console.log(err);
                });

        } else if (test === undefined) {
            console.log('Sending fetch request to http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber);
            fetch('http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber)
                .then(res => res.json())
                .then(report => {
                    if (isMounted) {
                        getReport(report);
                    }
                })
                .catch(err => {
                    console.log('Error! Could not communicate with the API.');
                    console.log(err);
                });

        } else {
            console.log('Sending fetch request to http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber + '/' + test);
            fetch('http://localhost:5000/' + component + '/' + version + '/' + result + '/' + buildNumber + '/' + test)
                .then(res => res.json())
                .then(report => {
                    if (isMounted) {
                        getReport(report);
                    }
                })
                .catch(err => {
                    console.log('Error! Could not communicate with the API.');
                    console.log(err);
                });
        }

        return () => isMounted = false;
    }, [version, component, result, buildNumber, test]);

    return (
        <div className='report'>
            <pre id='json'>{JSON.stringify(report, null, 4)}</pre>
        </div>
    );
}

export { GetReport as default }