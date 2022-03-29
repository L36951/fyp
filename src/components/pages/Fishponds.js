import React,{useEffect, useState} from "react";

import Table from "../table";
import TableColumn from '../TableColumn';
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import {useNavigate} from 'react-router-dom';
import { colors } from "@material-ui/core";
import List from "../List";
function Fishponds(){
    
    const [data,setData]=useState([]);
    const [allData,setAllData] = useState([]);
    const [accessor,setAccessor] = useState(['periodId','updatedAt','fishtype.fishtype']);
    const [header,setHeader] = useState(['Period ID','Last Update','Fish Type']);
    const [column,setTesting]= useState(TableColumn(header,accessor));
    const [link,setLink]=useState(['/dashboard','periodId'])
    const navigate = useNavigate();
    

/**********************************
 * fetch data from API
 **********************************/
    useEffect(() => {
      (async () => {
          let fishpondData;
          try {
              const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/period/query`);
              fishpondData= await response.json();
              
          } catch (error) {
              console.log(error);
              fishpondData = [];
          }
          setAllData(fishpondData.data.map((d)=>{return ({...d,'updatedAt':d.updatedAt.split("T")[0]})}));
          setData(fishpondData.data.map((d)=>{return ({...d,'updatedAt':d.updatedAt.split("T")[0]})}));
          
      })();
  }, []);
  
  /*
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
    */
    
    
/*************************************************
 * Search Function
 * Search by ID, date, location
 *************************************************/

    const filterData = event =>{
      const value = event.target.value.toLowerCase();
      const filterData = allData.filter(
        d =>(`${d.periodId} ${d.updatedAt} ${d.fishtype.fishtype}`
        .toLowerCase()
        .includes(value)
        )
      );
      setData(filterData);
    }

/*************************************************
 * On row click function
 * Redirect the page to dashponds by fishpondID
 *************************************************/

    const onRowClick = (state, rowInfo, column, instance) => {
      return {
          onClick: e => {
            
            navigate(`/dashboard?id=${rowInfo.original.periodId}`);  
            //console.log(rowInfo.original.fishpondId);
          }
      }
    }
  
    return(
      <div>
        <input className='search-box' placeholder='Search...' onInput={filterData}/>
      <List
        
        data={data}
        header={header}
        accessor={accessor}
        link={link}
      />
      
      <br />
   
    </div>
    )
}

export default Fishponds;