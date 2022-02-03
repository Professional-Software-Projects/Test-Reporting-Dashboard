import React from 'react';

function App() {
    const [data1, setData1] = React.useState(null);
    fetch('http://localhost:5000')
        .then(res => res.json())
        .then(data => setData1(data));

    return(
        <div className="App">
            <h1>{data1?data1:"Loading"}</h1>
            <div className='container'>
            </div>
        </div>
    );
}

export default App