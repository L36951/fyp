import React, { useEffect, useState } from 'react';


const ConvertData=(data)=>{
    const [allData,setAllData] = useState([]);
    const [testing,setTesting]=useState({});
    var date = data[0].updatedAt;
    var open=data[0].value;
    var close=data[0].value;
    useEffect(()=>{
        data.map((d,i)=>{
            if(d.updatedAt=== date){
                close = d.value;
            }else {
                setAllData(...allData,{"date":date,"open":open,"close":close})
            }
        })
    },[])
   
    return(allData);

}

export default ConvertData;