import React, { useState,useEffect } from 'react';
import { getAuthToken } from '../../Utils';
import '../Add.css';
import RequireLogin from './RequireLogin';
const AddRecords=()=>{
    const [error,setError] = useState(true);
    const [sensortype,setSensortype]=useState('');
    const [value,setValue] = useState('');
    const [periodid,setPeriodid] = useState('');
    const [record,setRecord] = useState('manual')
    const [result,setResult] = useState('');
    const token =  getAuthToken();
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(sensortype!='' && value!=''&&periodid!=''){
            (async()=>{
                try{
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord`,{
                        method:"POST",
                        headers:{token:`${token}`,"Content-type":"application/json"},
                        body:JSON.stringify({sensortype:sensortype,value:value,periodid:periodid,record:record})

                    }).then(res=>res.json());
                    setResult(response.ok?<h3>{response.msg}</h3>:<h4>Error Occur</h4>);
                }catch (error){
                    
                }
            })();
        }
        else{
            alert('Please provide required infomation')
        }
    }
    useEffect(()=>{
        (async()=>{
            try{
            const logged = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
            if(logged.ok){
                
                setError(false);
            }
        }catch(error){
            
        }
        })();
    },[])
    if(!error){
    return(
    <div className='addpage'>
    <form className='addform' onSubmit={handleSubmit}>
        <div className='form'>
            <h2>Add Records</h2>
            {result}
            <div className='form-group'>
                <label htmlFor='periodid'>Period ID</label>
                <input className='form-input' name="periodid" id="periodid" value={periodid}  onChange={e=>setPeriodid(e.target.value)}/>
            </div>
            <div className='form-group'>
                <label htmlFor='sensortype'>Sensor Type</label>
                <input className='form-input' name="sensortype" id="sensortype" value={sensortype} onChange={e=>setSensortype(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='value'>Value</label>
                <input className='form-input' name="value" id="value" value={value} onChange={e=>setValue(e.target.value)} />
            </div>
         
          
            <input className='add' type="submit" />
        </div>
    </form>
    </div>
    );
    }
    else{
        return (<RequireLogin/>)
    }
}

export default AddRecords;
