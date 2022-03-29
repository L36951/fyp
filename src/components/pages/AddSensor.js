import React, { useState,useEffect } from 'react';
import { getAuthToken } from '../../Utils';
import '../Add.css';
import RequireLogin from './RequireLogin';
const AddSensors=()=>{
    const [error,setError] = useState(true);
    const [sensorname,setSensorName]=useState('')
    const [sensortype,setSensorType] = useState('');
    
    const [result,setResult] = useState('');
    const token =  getAuthToken();
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(sensorname!='' && sensortype!=''){
            (async()=>{
                try{
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensortype`,{
                        method:"POST",
                        headers:{token:`${token}`,"Content-type":"application/json"},
                        body:JSON.stringify({sensortype:sensortype,sensorname:sensorname})

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
            <h2>Add Sensors</h2>
            {result}
            <div className='form-group'>
                <label htmlFor='sensortype'>Sensor Type</label>
                <input className='form-input' name="sensortype" id="sensortype" value={sensortype} onChange={e=>setSensorType(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='sensorname'>Sensor Name</label>
                <input className='form-input' name="sensorname" id="sensorname" value={sensorname} onChange={e=>setSensorName(e.target.value)} />
            </div>
    
          
            <input className='add' type="submit" />
        </div>
    </form>
    </div>
    );
    }
    else{
        return(<RequireLogin/>);
    }
}

export default AddSensors;
