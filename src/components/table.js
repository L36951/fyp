import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import ReactTable from 'react-table';
import 'react-table/react-table.css';


function Table(props){
   
    return(
        <>
        <ReactTable
       getTrProps={props.onRowClick}
        data={props.data}
        columns={props.columns}
        defaultPageSize={10}
        className="-striped -highlight"
      />
        </>

    );   
}

export default Table;