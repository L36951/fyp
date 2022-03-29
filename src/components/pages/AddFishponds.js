import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../Utils';
import '../Add.css';
import RequireLogin from './RequireLogin';
const AddFishponds=()=>{
    const [error,setError] = useState(true);
    const [location,setLocation]=useState('');
    const [length,setLength] = useState('');
    const [height,setHeight] = useState('');
    const [width,setWidth] =useState('');
    const [result,setResult] = useState('');
    const token =  getAuthToken();
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(location!='' && length!=''&&height!=''&&width!=''){
            (async()=>{
                try{
                    
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/fishpond`,{
                        method:"POST",
                        headers:{token:`${token}`,"Content-type":"application/json"},
                        body:JSON.stringify({location:location,length:length,height:height,width:width})

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
            <h2>Add Fishponds</h2>
            {result}
            <div className='form-group'>
                <label htmlFor='location'>Location</label>
                <input className='form-input' name="location" id="location" value={location} onChange={e=>setLocation(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='length'>Length</label>
                <input className='form-input' name="length" id="length" value={length} onChange={e=>setLength(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='height'>Height</label>
                <input className='form-input' name="height" id="height" value={height}  onChange={e=>setHeight(e.target.value)}/>
            </div>
            <div className='form-group'>
                <label htmlFor='width'>Width</label>
                <input className='form-input' name="width" id="width" value={width} onChange={e=>setWidth(e.target.value)} />
            </div>
            <input className='add' type="submit" />
        </div>
    </form>
    </div>
    );
}else{
    return(<RequireLogin/>)
}
}

export default AddFishponds;
