import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useTable } from 'react-table'
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
//export { GetReport as default };

/*function App() {
    return(
        <div className='App'>
            <BasicTable>

            </BasicTable>
        </div>
    )
}*/

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(20), [])

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export { GetReport as default, App };
