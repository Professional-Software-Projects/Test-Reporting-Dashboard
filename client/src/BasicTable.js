import React from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './Columns'
import './table.css'



export const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])


    const tableInstance = useTable({
        columns,

    })

    const {
        getTableProps,
        getTableBodyProps,
        HeaderGroups,
        rows,
        prepareRows,
    } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {HeaderGroups.map((HeaderGroup) => (
                
                <tr {...HeaderGroup.getHeaderGroupProps()}>
                    {HeaderGroup.headers.map( column =>(
                        <th {...column.getHeaderProsp()}>{column.render('Header')}</th>
                        ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map( cell => {
                                        <td {...cell.getCellProps()}>{cell.render('cell')}</td>
                                    })}
                            </tr>
                        )
                    })}  
            </tbody>
        </table>
    )

}