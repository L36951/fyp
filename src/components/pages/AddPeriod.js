import React, { useState,useEffect } from 'react';
import { getAuthToken } from '../../Utils';
import '../Add.css';
import RequireLogin from './RequireLogin';
const AddPeriods=()=>{
    const [error,setError] = useState(true);
    const [fishpondid,setFishpondid]=useState('');
    const [fishtype,setFishtype] = useState('');
    const [quantity,setQuantity] = useState('');
    
    const [result,setResult] = useState('');
    const token =  getAuthToken();
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(fishpondid!='' && fishtype!=''&&quantity!=''){
            (async()=>{
                try{
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/period`,{
                        method:"POST",
                        headers:{token:`${token}`,"Content-type":"application/json"},
                        body:JSON.stringify({fishpondId:fishpondid,fishtype:fishtype,fishQuantity:quantity})

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
            <h2>Add Periods</h2>
            {result}
            <div className='form-group'>
                <label htmlFor='fishpondid'>Fishpond ID</label>
                <input className='form-input' name="fishpondid" id="fishpondid" value={fishpondid} onChange={e=>setFishpondid(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='fishtype'>Fish Type</label>
                <input className='form-input' name="fishtype" id="fishtype" value={fishtype} onChange={e=>setFishtype(e.target.value)} />
            </div>
            <div className='form-group'>
                <label htmlFor='quantity'>Quantity</label>
                <input className='form-input' name="quantity" id="quantity" value={quantity}  onChange={e=>setQuantity(e.target.value)}/>
            </div>
          
            <input className='add' type="submit" />
        </div>
    </form>
    </div>
    );
    }
    else{
        return(<RequireLogin/>)
    }
}

export default AddPeriods;
