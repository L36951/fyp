import React,{useState} from "react";


const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  };

function TableColumn (columns,access){
    return range(columns.length).map(d => {
      return {Header:columns[d],
       accessor:access[d]}
      });
      
}
export default TableColumn;