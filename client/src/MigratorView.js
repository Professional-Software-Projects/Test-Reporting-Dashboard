import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './style/report.css';

function MigratorView() {
    const [coreDataReport, getCoreDataReport] = useState(0);
    const [metadataReport, getMetadataReport] = useState(0);
    const [userInterfaceReport, getUserInterfaceReport] = useState(0);

    useEffect(() => {
        let isMounted = true;

        console.log('Sending fetch request to http://localhost:5000/core-data/v2/passed/2/testReport');
        fetch('http://localhost:5000/core-data/v2/passed/2/testReport')
            .then(res => res.json())
            .then(coreDataReport => {
                if (isMounted) {
                    getCoreDataReport(coreDataReport);
                }
            })
            .then(console.log('Successfully received core data report.'));

        console.log('Sending fetch request to http://localhost:5000/metadata/v2/passed/2/testReport');
        fetch('http://localhost:5000/metadata/v2/passed/2/testReport')
            .then(res => res.json())
            .then(metadataReport => {
                if (isMounted) {
                    getMetadataReport(metadataReport);
                }
            })
            .then(console.log('Successfully received metadata report.'));

        console.log('Sending fetch request to http://localhost:5000/ui/v2/passed/2/testReport');
        fetch('http://localhost:5000/ui/v2/passed/2/testReport')
            .then(res => res.json())
            .then(userInterfaceReport => {
                if (isMounted) {
                    getUserInterfaceReport(userInterfaceReport);
                }
            })
            .then(console.log('Successfully received UI report.'));

        return () => isMounted = false;
    }, []);

    const passCount = coreDataReport.passCount + metadataReport.passCount + userInterfaceReport.passCount;
    const failCount = coreDataReport.failCount + metadataReport.failCount + userInterfaceReport.failCount;
    const skipCount = coreDataReport.skipCount + metadataReport.skipCount + userInterfaceReport.skipCount;

    const data = {
        labels: ['Passed', 'Failed', 'Skipped'],
        datasets: [{
            label: 'Test Pass Rate',
            data: [passCount, failCount, skipCount],
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <div id='report'>
            <h1>LiveData Migrator Test Reporting Dashboard</h1>
            <GetProductHealth passCount={passCount} failCount={failCount} skipCount={skipCount} />
            <p>Total Tests Passed: {passCount}</p>
            <p>Total Tests Failed: {failCount}</p>
            <p>Total Tests Skipped: {skipCount}</p>

            <div>
                <Pie data={data} height={400} width={600} options={options} />
            </div>

            <div id='report'>
                <Link to='components'>
                    <p>Click here for the individual pass rates of each component.</p>
                </Link>
            </div>
        </div>
    );
}

function GetProductHealth({ passCount, failCount, skipCount }) {
    if (passCount > failCount) {
        return <h2>Product health is <span id='pass'>good!</span></h2>
    } else {
        return <h2>Product health is <span id='fail'>poor.</span></h2>
    }
}

export { MigratorView as default };