import React,{useEffect, useState} from 'react';
import { getAuthToken } from '../../Utils';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import RequireLogin from './RequireLogin';
const EditFishponds=()=>{
    const [error,setError] = useState(true);
    const [location,setLocation]=useState('');
    const [length,setLength] = useState('');
    const [height,setHeight] = useState('');
    const [width,setWidth] =useState('');
    const [result,setResult] = useState('');
    const [original,setOriginal] =useState({});
    const { search } = useLocation();
    const { id } = queryString.parse(search);
    const token =  getAuthToken();

    useEffect(()=>{
        if(id!=null){
            (async()=>{
                try{
                    const logged = await fetch(`http://localhost:5000/api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
                    const response = await fetch(`http://localhost:5000/api/fishpond/query?fishpondid=${id}`).then(res=>res.json());
                    if(logged.ok&&response.ok){
                    setLocation(response.data[0].location)
                    setLength(response.data[0].length);
                    setHeight(response.data[0].height);
                    setWidth(response.data[0].width);
                    setOriginal(response.data[0]);
                    setError(false)
                    }
                }
                catch(error){

                }
                
            })();
        }
    },[])
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(location!='' && length!=''&&height!=''&&width!=''){
            (async()=>{
                try{
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/fishpond/${id}`,{
                        method:"PUT",
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
    const handleDelete=()=>{
    
            (async()=>{
                try{
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/fishpond/${id}`,{
                        method:"DELETE",
                        headers:{token:`${token}`,"Content-type":"application/json"},

                    }).then(res=>res.json());
                    setResult(response.ok?<h3>{response.msg}</h3>:<h4>Error Occur</h4>);
                }catch (error){
                    
                }
            })();

    }
if(!error){
    return(
        <div className='addpage'>
    <form className='addform' onSubmit={handleSubmit}>
        <div></div>
        <div className='form'>
        <div></div>
            <h2>Edit Fishponds</h2>
            {result}
            <div className='form-group'>
                <label htmlFor='id'>ID</label>
                <input className='form-input' name="id" id="id" value={id} readOnly/>
            </div>
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
            <div className='addbtn-container'>
            <input className='add' type="submit" value="Update" /><input className='add delete' type="button" value="Delete" onClick={handleDelete}/>
            </div>
            
        </div>
    </form>
    </div>
    );
}else{
    return(<RequireLogin/>);
}
}

export default EditFishponds;