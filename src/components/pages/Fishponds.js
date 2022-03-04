import React,{useEffect, useState} from "react";
import { makeData } from "../../Utils";
import Table from "../table";
import TableColumn from '../TableColumn';
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import {useNavigate} from 'react-router-dom';
function Fishponds(){
    
    const [data,setData]=useState(makeData());
    const [allData,setAllData] = useState();
    const [accessor,setAccessor] = useState(['firstName','lastName','age','status','visits']);
    const [header,setHeader] = useState(['First Name','Last Name','Age','Status','Visits']);
    const [column,setTesting]= useState(TableColumn(header,accessor));
    const navigate = useNavigate();
    useEffect(()=>{
      (async ()=>{
        let res;
        try{
          // const response = await fetch();
          // res = await response.json();
          res=makeData();
        }
        catch(error){
          console.log(error);
          res=[];
        }
        setAllData(res);
        setData(res);
      })();
    },[]);
    
    const filterData = event =>{
      const value = event.target.value.toLowerCase();
      const filterData = allData.filter(
        d =>(`${d.firstName} ${d.lastName}`
        .toLowerCase()
        .includes(value)

        )
      );
      setData(filterData);
    }

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
          onClick: e => {
            navigate(`/dashboard?id=${rowInfo.index}`);  
            //console.log(rowInfo.index);
          }
      }
    }
  
    return(
      <div>
        <input className='search-box' placeholder='Search...' onInput={filterData}/>
      <Table
       onRowClick={onRowClick}
        data={data}
        columns={column}
      />
      
      <br />
   
    </div>
    )
}

export default Fishponds;