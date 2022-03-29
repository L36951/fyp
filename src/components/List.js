import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './List.css'
/******************************
 * 
 * 
 * 
 ******************************/
const List =({data,header,accessor,link})=>{
    
    const navigate=useNavigate();
   if(data.length===0){
       return(<div style={{"textAlign":"center"}}>No record</div>)
   }
    return(
    <>
   <table className="table table-striped table-hover">
  <thead>
    <tr>
      {header.map((d,i)=>{
          return( <th key={i} scope="col">{d}</th>)
      })}
    </tr>
  </thead>
  <tbody>
      {data.map((d,i)=>{
        return(
            <tr  key={i} onClick={()=>navigate(`${link[0]}?id=${d[link[1]]}`)}>
                <th scope="row">{i}</th>
                {accessor.map((data,key)=>{
                   
                    return(
                        
                        <td  key={key}>{d[data]?d[data]:d[data.split('.')[0]][data.split('.')[1]]}</td>
                    );
                })}
            </tr>
        );
      })}
   
  </tbody>
</table>
    </>);
}

export default List;