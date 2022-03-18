import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'
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
        componentTitle = 'Migrator UI';
    }

    useEffect(() => {
        let isMounted = true;

        console.log('Sending fetch request to http://localhost:5000/' + componentName + '/' + versionNumber + '/passed/2/testReport');
        fetch('http://localhost:5000/' + componentName + '/' + versionNumber + '/passed/2/testReport')
            .then(res => res.json())
            .then(report => {
                if (isMounted) {
                    getReport(report);
                }
            })
            .then(console.log('Successfully received test data from API.'))
            .catch(err => {
                console.log('Error! Could not communicate with the API.');
                console.log(err);
            });

        return () => isMounted = false;
    }, [componentName, versionNumber]);

    const failCount = report.failCount;
    const passCount = report.passCount;
    const skipCount = report.skipCount;

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
        scales: {
            y: {
                ticks: {
                    beginAtZero: true
                },
            },
        },
    }

    return (
        <div id='report'>
            <h1 id='component'>LiveData {componentTitle}</h1>
            <p id='pass'>Tests Passed: {passCount}</p>
            <p id='fail'>Tests Failed: {failCount}</p>
            <p id='skip'>Tests Skipped: {skipCount}</p>
            <div id='report'>
                <p>Click the button below to view a more detailed reports of {componentName}</p>
                <Link to={'/components/' + componentName + '/v2/passed'}>
                    <button type="button" class="btn btn-feature">{componentTitle} Health Report</button>
                </Link>
                <Link to={'/components/' + componentName + '/v2/passed/2'}>
                    <button type="button" class="btn btn-feature">{componentTitle} Build Data</button>
                </Link>
                <Link to={'/components/' + componentName + '/v2/passed/2/testReport'}>
                    <button type='button' class="btn btn-feature">{componentTitle} Test Report</button>
                </Link>
            </div>
        </div>
    );
}

export { ComponentView as default }