import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import getChart from './PieChartTemplate.js';
import 'chart.js/auto';
import './style/page.css';
import './style/report.css';

function ProductView({ name, version, result, number }) {
    const [coreDataReport, getCoreDataReport] = useState(0);
    const [metadataReport, getMetadataReport] = useState(0);
    const [userInterfaceReport, getUserInterfaceReport] = useState(0);
    const [productName, setProductName] = useState(name);
    const [productVersion, setProductVersion] = useState(version);
    const [productResult, setProductResult] = useState(result);
    const [productNumber, setProductNumber] = useState(number);
    const apiSuffix = productVersion + '/' + productResult + '/' + productNumber + '/testReport';

    useEffect(() => {
        let isMounted = true;

        console.log('Sending fetch request to http://localhost:5000/core-data/' + apiSuffix);
        fetch('http://localhost:5000/core-data/' + apiSuffix)
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

        console.log('Sending fetch request to http://localhost:5000/metadata/' + apiSuffix);
        fetch('http://localhost:5000/metadata/' + apiSuffix)
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

        console.log('Sending fetch request to http://localhost:5000/ui/' + apiSuffix);
        fetch('http://localhost:5000/ui/' + apiSuffix)
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
    }, [apiSuffix]);

    const passCount = coreDataReport.passCount + metadataReport.passCount + userInterfaceReport.passCount;
    const failCount = coreDataReport.failCount + metadataReport.failCount + userInterfaceReport.failCount;
    const skipCount = coreDataReport.skipCount + metadataReport.skipCount + userInterfaceReport.skipCount;
    const buildTime = (Math.round((coreDataReport.duration + metadataReport.duration + userInterfaceReport.duration) * 1000) / 1000).toFixed(3);
    const [data, options] = getChart({ passCount, failCount, skipCount });

    return (
        <div id='body' className='container'>
            <h2>{productName}</h2>
            <GetProductHealth passCount={passCount} failCount={failCount} skipCount={skipCount} />

            <div id='report' style={{ margin: 25, padding: 10, backgroundColor: 'whitesmoke' }}>
                <Link to='components'>
                    <button type="button" className="btn btn-default">View Test Results for Individual Components</button>
                </Link>
            </div>

            <div id='wrapper'>
                <p>Total Tests Passed: <span id='pass'>{isNaN(passCount) ? "N/A" : passCount}</span></p>
                <p>Total Tests Failed: <span id='fail'>{isNaN(failCount) ? "N/A" : failCount}</span></p>
                <p>Total Tests Skipped: <span id='skip'>{isNaN(skipCount) ? "N/A" : skipCount}</span></p>
                <p>Total Build Time: <span>{isNaN(buildTime) ? "N/A" : buildTime} seconds</span></p>
            </div>

            <div id='wrapper'>
                <Pie data={data} height={300} width={300} options={options} />
            </div>

            <div id='body'>
                <button type="button" className="btn btn-default">Edit Product</button>
            </div>
            <div id='body'>
                <button type="button" className="btn btn-default">Delete Product</button>
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

export { ProductView as default, GetProductHealth };