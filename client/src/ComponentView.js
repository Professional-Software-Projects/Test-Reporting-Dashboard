import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { GetProductHealth } from './ProductView.js';
import getChart from './PieChartTemplate.js';
import 'chart.js/auto';
import './style/page.css';
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

    const reportUrl = 'http://localhost:5000/' + componentName + '/' + versionNumber + '/passed/2/testReport';

    useEffect(() => {
        let isMounted = true;

        console.log('Sending fetch request to ' + reportUrl);
        fetch(reportUrl)
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

        return () => isMounted = false;
    }, [componentName, reportUrl, versionNumber]);

    const failCount = report.failCount;
    const passCount = report.passCount;
    const skipCount = report.skipCount;
    const buildTime = (Math.round(report.duration * 1000) / 1000).toFixed(3);
    const [data, options] = getChart({ passCount, failCount, skipCount });

    return (
        <span id='report' className='container'>
            <h1 id='component'>LiveData {componentTitle}</h1>
            <GetProductHealth passCount={passCount} failCount={failCount} skipCount={skipCount} />

            <div id='wrapper'>
                <p>Total Tests Passed: <span id='pass'>{isNaN(passCount) ? "N/A" : passCount}</span></p>
                <p>Total Tests Failed: <span id='fail'>{isNaN(failCount) ? "N/A" : failCount}</span></p>
                <p>Total Tests Skipped: <span id='skip'>{isNaN(skipCount) ? "N/A" : skipCount}</span></p>
                <p>Total Build Time: <span>{isNaN(buildTime) ? "N/A" : buildTime} seconds</span></p>
            </div>
            <div id='wrapper'>
                <Pie data={data} height={200} width={200} options={options} />
            </div>

            <div id= 'details'>
                <p>Click the button below to view a more detailed report of <span>{componentTitle}</span>.</p>
                <div className='btn btn-group' style={{ display: 'block', float: 'right', padding: '10px', position: 'relative', right: '40px'}}>
                    <Link to={'/components/' + componentName + '/v2/passed'}>
                        <button type="button" className="btn btn-default">{componentTitle} Health Report</button>
                    </Link>
                    <Link to={'/components/' + componentName + '/v2/passed/2'}>
                        <button type="button" className="btn btn-default">{componentTitle} Build Data</button>
                    </Link>
                    <Link to={'/components/' + componentName + '/v2/passed/2/testReport'}>
                        <button type='button' className="btn btn-default">{componentTitle} Test Report</button>
                    </Link>
                </div>
            </div>
        </span>
    );
}

export { ComponentView as default }