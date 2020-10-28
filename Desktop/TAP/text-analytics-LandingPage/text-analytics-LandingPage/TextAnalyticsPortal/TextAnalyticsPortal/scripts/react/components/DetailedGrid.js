import React from 'react';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import '../../styles/rootContainer.css';



const TableComponent = ({ data, columns, order }) => {
    console.log(data);
    console.log(columns);
    return (
        <ReactTable
            data={data}
            columns={columns}
            defaultSorted={[
                {
                    id: columns[2].accessor,
                    desc: order
                }
            ]}
            defaultPageSize={10}
            className=" -highlight"
        />
    )
}

export default TableComponent