import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
            <p>{isConnected ? isConnected : "Loading..."}</p>
        </div>
    );
};

function App() {
    return (
        <Routes>
            <Route path=':version/:component/:result/:buildNumber/:test' element={<DisplayReport />} />
            <Route path=':version/:component/:result/:buildNumber/*' element={<DisplayReport />} />
            <Route path=':version/:component/:result/*' element={<DisplayReport />} />
            <Route exact path='/*' element={<ShowIsConnected />} />
        </Routes>
    );
}

export { App as default };