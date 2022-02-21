import React, { useState, useEffect } from 'react';
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
        fetch('http://localhost:5000/json')
            .then(res => res.json())
            .then(report => getReport(report))
            .then(console.log('JSON Received.'));
    }, []);

    // any other functions defined in this file will need to be called from this return statement
    return (
        <div className='App'>
            <ShowIsConnected />
            <pre>{JSON.stringify(report)}</pre>
        </div>
    );
};

const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['Cash', 'Credit Card', 'Bitcoin'];
function TabGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <ButtonGroup>
        {types.map(type => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </Tab>
        ))}
      </ButtonGroup>
      <p />
      <p> Your payment selection: {active} </p>
    </>
  );
}
// Usage
<TabGroup/>














export { GetReport as default };