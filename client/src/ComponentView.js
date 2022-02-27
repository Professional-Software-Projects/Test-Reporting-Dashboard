import React, { useState, useEffect } from 'react';
import './App.css';

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
        componentTitle = 'Migrator UI'
    }

    useEffect(() => {
        console.log('Sending fetch request to http://localhost:5000/' + componentName + '/' + versionNumber + '/passed/2/testReport');
        fetch('http://localhost:5000/' + componentName + '/' + versionNumber + '/passed/2/testReport')
            .then(res => res.json())
            .then(report => getReport(report))
            .then(console.log('Successfully received test data from API.'))
            .catch(err => {
                console.log('Error! Could not communicate with the API.');
                console.log(err);
            });
    }, []);

    const failRate = report.failCount;
    const passRate = report.passCount;
    const skipRate = report.skipCount;

    return (
        <div id='App'>
            <h1 id='component'>{componentTitle}</h1>
            <p id='pass'>Passed: {passRate}</p>
            <p id='fail'>Failed: {failRate}</p>
            <p id='skip'>Skipped: {skipRate}</p>
        </div>
    );
}

export { ComponentView as default }