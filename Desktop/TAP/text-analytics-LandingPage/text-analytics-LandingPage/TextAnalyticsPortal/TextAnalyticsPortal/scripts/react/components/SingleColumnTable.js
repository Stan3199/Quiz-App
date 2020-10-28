import React from 'react';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import '../../styles/rootContainer.css';



const SingleColumnTable = ({data,columns}) =>
{
    console.log(data);
    console.log(columns);
  return (  
      <ReactTable
          data={data}
          columns={columns}
         
          defaultPageSize={5}
      className=" -highlight"
      showPagination={false}
      />   
    )
}

export default SingleColumnTable;