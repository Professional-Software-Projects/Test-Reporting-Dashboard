import React from 'react';
import './App.css';

// this will make a get request to localhost:5000/ and receive the json string "Successful Connection."
// until this string is received, it will display the string "Loading..."
function Load() {
    const [data1, setData1] = React.useState(null);
    fetch('http://localhost:5000')
        .then(res => res.json())
        .then(data => setData1(data));
        
    return(
        <div className="App">
            <h1>{data1?data1:"Loading..."}</h1>
        </div>
    );
};

export { Load as default };