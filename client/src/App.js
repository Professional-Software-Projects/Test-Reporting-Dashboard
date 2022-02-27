import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Migrator from './Migrator';
import ComponentView from './ComponentView';
import GetReport from './GetReport';
import './App.css';

// this will make a get request to localhost:5000/ and receive the json string "Successful Connection."
// until this string is received, it will display the string "Loading..."
// this function is mostly used to test and verify communication between the backend and the frontend.
function ShowIsConnected() {
    const [isConnected, setConnected] = useState(null);

    fetch('http://localhost:5000')
        .then(res => res.json())
        .then(connection => setConnected(connection));

    return (
        <div className='App'>
            <p>{isConnected ? isConnected : "Loading..."}</p>
        </div>
    );
};

function App() {
    return (
        <Routes>
            <Route path='components/:component/:version/:result/:buildNumber/:test' element={<GetReport />} />
            <Route path='components/:component/:version/:result/:buildNumber/*' element={<GetReport />} />
            <Route path='components/:component/:version/:result/*' element={<GetReport />} />
            <Route path='components' element={<ComponentView />} />
            <Route exact path='/*' element={<Migrator />} />
        </Routes>
    );
}

export { App as default };