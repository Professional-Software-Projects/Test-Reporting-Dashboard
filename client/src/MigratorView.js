import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import getChart from './PieChartTemplate.js';
import './style/page.css';
import './style/report.css';

/* TODO: implement a function to add a component to the page
         parameters: component type (single component or all components), version number (v1 or v2), result (passed, failed or skipped)
         the given parameters will then be used to build a url to fetch reports
         then a display can be created from this, which will then be returned back to the page for the user
*/

function MigratorView() {
    const [coreDataReport, getCoreDataReport] = useState(0);
    const [metadataReport, getMetadataReport] = useState(0);
    const [userInterfaceReport, getUserInterfaceReport] = useState(0);

    useEffect(() => {
        let isMounted = true;

        console.log('Sending fetch request to http://localhost:5000/core-data/v2/passed/3/testReport');
        fetch('http://localhost:5000/core-data/v2/passed/3/testReport')
            .then(res => res.json())
            .then(coreDataReport => {
                if (isMounted) {
                    getCoreDataReport(coreDataReport);
                }
            })
            .catch(err => {
                console.log('Error! Could not communicate with the API.');
                console.log(err);
            });

        console.log('Sending fetch request to http://localhost:5000/metadata/v2/passed/3/testReport');
        fetch('http://localhost:5000/metadata/v2/passed/3/testReport')
            .then(res => res.json())
            .then(metadataReport => {
                if (isMounted) {
                    getMetadataReport(metadataReport);
                }
            })
            .catch(err => {
                console.log('Error! Could not communicate with the API.');
                console.log(err);
            });

        console.log('Sending fetch request to http://localhost:5000/ui/v2/passed/3/testReport');
        fetch('http://localhost:5000/ui/v2/passed/3/testReport')
            .then(res => res.json())
            .then(userInterfaceReport => {
                if (isMounted) {
                    getUserInterfaceReport(userInterfaceReport);
                }
            })
            .catch(err => {
                console.log('Error! Could not communicate with the API.');
                console.log(err);
            });
        return () => isMounted = false;
    }, []);

    const passCount = coreDataReport.passCount + metadataReport.passCount + userInterfaceReport.passCount;
    const failCount = coreDataReport.failCount + metadataReport.failCount + userInterfaceReport.failCount;
    const skipCount = coreDataReport.skipCount + metadataReport.skipCount + userInterfaceReport.skipCount;

    const buildTime = coreDataReport.duration + metadataReport.duration + userInterfaceReport.duration;

    const [data, options] = getChart({ passCount, failCount, skipCount });

    return (
        <div id='body' className='container'>
            <h1>LiveData Migrator Test Reporting Dashboard</h1>
            <GetProductHealth passCount={passCount} failCount={failCount} skipCount={skipCount} />

            <div id='body'>
                <Link to='components'>
                    <button type="button" className="btn btn-default">View Test Results for Individual Components</button>
                </Link>
            </div>

            <div id='wrapper'>
                <p>Total Tests Passed: <span id='pass'>{passCount}</span></p>
                <p>Total Tests Failed: <span id='fail'>{failCount}</span></p>
                <p>Total Tests Skipped: <span id='skip'>{skipCount}</span></p>
                <p>Total Build Time: <span>{(Math.round(buildTime * 1000) / 1000).toFixed(3)} seconds</span></p>
            </div>

            <div id='wrapper'>
                <Pie data={data} height={300} width={300} options={options} />
            </div>

        </div>
    );
}

function GetProductHealth({ passCount, failCount, skipCount }) {
    let totalTests = passCount + failCount + skipCount;
    let passRate = (passCount / totalTests) * 100;

    if (passRate >= 99) {
        return <h2>{passRate}% of tests passed. Product health is <span id='pass'>good!</span></h2>
    } else if (passRate > 92 && passRate < 99) {
        return <h2>{passRate}% of tests passed. Product health is <span id='mediocre'>acceptable.</span></h2>
    } else if (passRate < 92) {
        return <h2>{passRate}% of tests passed. Product health is <span id='fail'>poor.</span></h2>
    } else {
        return <h2>Cannot get product health!</h2>
    }
}

export { MigratorView as default, GetProductHealth };