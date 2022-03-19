import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'
import getChart from './PieChartTemplate.js';
import './style/report.css';

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
    const buildTime = report.duration;

    const [data, options] = getChart({ passCount, failCount, skipCount });

    return (
        <div id='report'>
            <h1 id='component'>LiveData {componentTitle}</h1>
            <p>Build Time: {(Math.round(buildTime * 1000) / 1000).toFixed(3)}</p>
            <p id='pass'>Tests Passed: {passCount}</p>
            <p id='fail'>Tests Failed: {failCount}</p>
            <p id='skip'>Tests Skipped: {skipCount}</p>
            <div>
                <Pie data={data} height={200} width={200} options={options} />
            </div>
            <div id='report'>
                <p>Click the button below to view a more detailed report of <span>{componentTitle}</span>.</p>
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