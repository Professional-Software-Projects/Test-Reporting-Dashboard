import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/App.css';

function ComponentView(component) {
    const [report, getReport] = useState(0);
    const componentName = component.component;
    const versionNumber = component.version;
    let componentTitle;

    if (componentName === 'core-data') {
        componentTitle = 'Migrator Core Data';
    } else if (componentName === 'metadata') {
        componentTitle = 'Migrator Metadata';
    } else if (componentName === 'ui') {
        componentTitle = 'Migrator UI';
    }

    useEffect(() => {
        console.log('Sending fetch request to http://localhost:5000/' + componentName + '/' + versionNumber + '/passed/2/testReport');
        fetch('http://localhost:5000/' + componentName + '/' + versionNumber + '/passed/2/testReport')
            .then(res => res.json())
            .then(getReport)
            .then(console.log('Successfully received test data from API.'))
            .catch(err => {
                console.log('Error! Could not communicate with the API.');
                console.log(err);
            });
    }, [componentName, versionNumber]);

    const failRate = report.failCount;
    const passRate = report.passCount;
    const skipRate = report.skipCount;

    return (
        <div id='App'>
            <h1 id='component'>LiveData {componentTitle}</h1>
            <p id='pass'>Tests Passed: {passRate}</p>
            <p id='fail'>Tests Failed: {failRate}</p>
            <p id='skip'>Tests Skipped: {skipRate}</p>
            <div id='App'>
                <p>Click the button below to view a more detailed reports of {componentName}</p>
                <Link to={'/components/' + componentName + '/v2/passed'}>
                    <button>{componentTitle} Health Report</button>
                </Link>
                <Link to={'/components/' + componentName + '/v2/passed/2'}>
                    <button>{componentTitle} Build Data</button>
                </Link>
                <Link to={'/components/' + componentName + '/v2/passed/2/testReport'}>
                    <button>{componentTitle} Test Report</button>
                </Link>
            </div>
        </div>
    );
}

export { ComponentView as default }