import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MigratorView from './MigratorView';
import ComponentView from './ComponentView';
import GetReport from './GetReport';
import './style/report.css';

// this will make a get request to localhost:5000/ and receive the json string "Successful Connection."
// until this string is received, it will display the string "Loading..."
// this function is mostly used to test and verify communication between the backend and the frontend.
function ShowIsConnected() {
    const [isConnected, setConnected] = useState(null);

    fetch('http://localhost:5000')
        .then(res => res.json())
        .then(setConnected);

    console.log(isConnected ? isConnected : "Loading...");
}

// TODO: Implement routes to view the LiveData Migrator version 1 test reports
function ViewRoutes() {
    return (
        <Routes>
            <Route path='components/:component/:version/:result/:buildNumber/:test' element={<GetReport />} />
            <Route path='components/:component/:version/:result/:buildNumber/*' element={<GetReport />} />
            <Route path='components/:component/:version/:result/*' element={<GetReport />} />
            <Route path='components' element={
                <div id='report' style={{ margin: 10, padding: 10 }}>
                    <Link to='/'>
                        <button type="button" className="btn btn-default">View Rolled Up Test Results</button>
                    </Link>
                    <ComponentView component='core-data' version='v2' />
                    <ComponentView component='metadata' version='v2' />
                    <ComponentView component='ui' version='v2' />
                </div>} />
            <Route exact path='/*' element={<MigratorView />} />
        </Routes>
    );
}

export { ViewRoutes as default };