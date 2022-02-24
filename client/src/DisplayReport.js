import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

export default function DisplayReport() {
    const [report, getReport] = React.useState(null);
    const { version, result, buildNumber, test } = useParams();

    useEffect(() => {
        fetch('http://localhost:5000/' + version + '/coreData/' + result + '/' + buildNumber + '/' + test)
            .then(res => res.json())
            .then(report => getReport(report))
            .then(console.log('JSON Received.'))
    }, []);

    return (
        <div className='App'>
            <pre id='json'>{JSON.stringify(report, null, 4)}</pre>
        </div>
    );
}