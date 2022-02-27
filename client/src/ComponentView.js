import React, { useEffect, useState } from 'react';
import './App.css';

function GetTestDataForComponent(component, version) {
    console.log('Component is ' + component + '\n Version is ' + version.version + '\n');
    const [report, getReport] = useState(null);

    console.log('Sending fetch request to http://localhost:5000/' + component + '/' + version.version + '/passed/2/testReport');
    fetch('http://localhost:5000/' + component + '/' + version.version + '/passed/2/testReport')
        .then(res => res.json())
        .then(report => getReport(report))
        .then(console.log('Successfully received test data from API.'));

    const obj = JSON.parse(report);

    const failRate = obj.failCount;
    const passRate = obj.passCount;
    const skipRate = obj.skipCount;
    const rates = [failRate, passRate, skipRate];

    console.log(failRate + '\n' + passRate + '\n' + skipRate + '\n');

    return rates;
}

function CoreDataView(version) {
    const rates = GetTestDataForComponent('core-data', version);

    return (
        <div id='App'>
            <p id='pass'>Passed: {rates[1]}</p>
            <p id='fail'>Failed: {rates[0]}</p>
            <p id='skip'>Skipped: {rates[2]}</p>
        </div>
    );
}

function MetadataView(version) {
    const rates = GetTestDataForComponent('metadata', version);

    return (
        <div id='App'>
            <p id='pass'>Passed: {rates[1]}</p>
            <p id='fail'>Failed: {rates[0]}</p>
            <p id='skip'>Skipped: {rates[2]}</p>
        </div>
    );
}

function UserInterfaceView(version) {
    const rates = GetTestDataForComponent('ui', version);

    return (
        <div id='App'>
            <p id='pass'>Passed: {rates[1]}</p>
            <p id='fail'>Failed: {rates[0]}</p>
            <p id='skip'>Skipped: {rates[2]}</p>
        </div>
    );
}

function ComponentView() {
    return (
        <div>
            <CoreDataView version='v2' />
            <MetadataView version='v2' />
            <UserInterfaceView version='v2' />
        </div>
    );
}

export { ComponentView as default }