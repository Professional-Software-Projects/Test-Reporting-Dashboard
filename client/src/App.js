import React, { useState, useEffect } from 'react';
import { Router, Route, Routes, BrowserRouter, Switch } from 'react-router-dom';
import DisplayReport from './DisplayReport';
import './App.css';

// this will make a get request to localhost:5000/ and receive the json string "Successful Connection."
// until this string is received, it will display the string "Loading..."
function ShowIsConnected() {
    const [isConnected, setConnected] = useState(null);

    fetch('http://localhost:5000')
        .then(res => res.json())
        .then(connection => setConnected(connection));

    return (
        <div className='App'>
            <h1>{isConnected ? isConnected : "Loading..."}</h1>
        </div>
    );
};

function GetReport() {
    const [report, getReport] = useState(null);


    // this will run until the component is mounted, so the api will only be called once
    useEffect(() => {
        fetch('http://localhost:5000/v1/coreData/passed')
            .then(res => res.json())
            .then(report => getReport(report))
            .then(console.log('JSON Received.'));
    }, []);


    // any other functions defined in this file will need to be called from this return statement
    return (
        <div className='App'>
            <ShowIsConnected />
            <pre id='json'>{JSON.stringify(report, null, 4)}</pre>
        </div>
    );
};

function App() {
    return (
        <Routes>
            <Route path='/' element={<GetReport />} />
            <Route path='/:version/coreData/:result/:buildNumber([0-9]+)?/:test?' element={<DisplayReport />} />
        </Routes>
    );
}

export { App as default, GetReport };