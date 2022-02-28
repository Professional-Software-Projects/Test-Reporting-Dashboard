import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function MigratorView() {
    const [coreDataReport, getCoreDataReport] = useState(0);
    const [metadataReport, getMetadataReport] = useState(0);
    const [userInterfaceReport, getUserInterfaceReport] = useState(0);


    useEffect(() => {

        console.log('Sending fetch request to http://localhost:5000/core-data/v2/passed/2/testReport');
        fetch('http://localhost:5000/core-data/v2/passed/2/testReport')
            .then(res => res.json())
            .then(coreDataReport => getCoreDataReport(coreDataReport))
            .then(console.log('Successfully received core data report.'));

        console.log('Sending fetch request to http://localhost:5000/metadata/v2/passed/2/testReport');
        fetch('http://localhost:5000/metadata/v2/passed/2/testReport')
            .then(res => res.json())
            .then(metadataReport => getMetadataReport(metadataReport))
            .then(console.log('Successfully received metadata report.'));

        console.log('Sending fetch request to http://localhost:5000/ui/v2/passed/2/testReport');
        fetch('http://localhost:5000/ui/v2/passed/2/testReport')
            .then(res => res.json())
            .then(userInterfaceReport => getUserInterfaceReport(userInterfaceReport))
            .then(console.log('Successfully received UI report.'));

    }, []);

    const passCount = coreDataReport.passCount + metadataReport.passCount + userInterfaceReport.passCount;
    const failCount = coreDataReport.failCount + metadataReport.failCount + userInterfaceReport.failCount;
    const skipCount = coreDataReport.skipCount + metadataReport.skipCount + userInterfaceReport.skipCount;

    return (
        <div id='App'>
            <h1>LiveData Migrator Test Reporting Dashboard</h1>
            <GetProductHealth passCount={passCount} failCount={failCount} skipCount={skipCount} />
            <p>Total Tests Passed: {passCount}</p>
            <p>Total Tests Failed: {failCount}</p>
            <p>Total Tests Skipped: {skipCount}</p>

            <div id='App'>
                <Link to='components'>
                    <p>Click here for the individual pass rates of each component.</p>
                </Link>
            </div>
        </div>
    );
}

function GetProductHealth(passCount, failCount, skipCount) {
    let passCountInt = passCount.passCount;
    let failCountInt = passCount.failCount;

    if (passCountInt > failCountInt) {
        console.log(passCountInt + ' true');
        console.log(failCountInt + ' true');
        return <h2>Product health is <span id='pass'>good!</span></h2>
    } else {
        console.log(passCountInt + ' false');
        console.log(failCountInt + ' false');
        return <h2>Product health is <span id='fail'>poor.</span></h2>
    }
}

export { MigratorView as default }