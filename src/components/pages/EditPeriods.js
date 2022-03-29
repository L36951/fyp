import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../Utils';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import RequireLogin from './RequireLogin';

const EditPeriod = () => {

    const [error, setError] = useState(true);
    
    const [result, setResult] = useState('');
    const [original, setOriginal] = useState({});
    const { search } = useLocation();
    const { id } = queryString.parse(search);
    const token = getAuthToken();
    const [objectid, setObjectid] = useState('');
    const [periodid,setPeriodid]=useState('');
    const [fishtype,setFishtype] = useState('');
    const [quantity,setQuantity] = useState('');
    const [ended,setEnded] = useState(false);
    

    useEffect(()=>{
        console.log(ended)
    },[ended])
    useEffect(() => {
        if (id != null) {
            (async () => {
                try {
                    const logged = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/period/admin/query?periodid=${id}`, { headers: { token: token } }).then(res => res.json());
                   
                    if(logged.ok&&response.ok){
                    setFishtype(response.data[0].fishtype.fishtype)
                    setObjectid(response.data[0]._id)
                    setPeriodid(response.data[0].periodId)
                    setQuantity(response.data[0].fishQuantity)
                    setEnded(response.data[0].isEnd)
                    setOriginal(response.data[0]);
                        setError(false)
                }
                }
                catch (error) {
                    console.log(error)
                }

            })();
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (periodid != '' && fishtype!=''&&quantity!='') {
            (async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/period/${objectid}`, {
                        method: "PUT",
                        headers: { token: `${token}`, "Content-type": "application/json" },
                        body: JSON.stringify({ isEnd:ended,fishtype:fishtype,fishQuantity:quantity })

                    }).then(res => res.json());
                    setResult(response.ok ? <h3>{response.msg}</h3> : <h4>Error Occur</h4>);
                } catch (error) {

                }
            })();
        }
        else {
            alert('Please provide required infomation')
        }
    }
    const handleDelete = () => {

        (async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/period/${objectid}`, {
                    method: "DELETE",
                    headers: { token: `${token}`, "Content-type": "application/json" },

                }).then(res => res.json());
                setResult(response.ok ? <h3>{response.msg}</h3> : <h4>Error Occur</h4>);
            } catch (error) {

            }
        })();

    }

    if(!error){
    return (
        <div className='addpage'>

            <form className='addform' onSubmit={handleSubmit}>

                <div className='form'>
                    <div></div>
                    <h2>Edit Fishponds</h2>
                    {result}
                    <div className='form-group'>
                        <label htmlFor='objectid'>Object ID</label>
                        <input className='form-input' name="objectid" id="objectid" value={objectid} readOnly />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='periodid'>Period ID</label>
                        <input className='form-input' name="periodid" id="periodid" value={periodid} readOnly />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='fishtype'>Fish Type</label>
                        <input className='form-input' name="fishtype" id="fishtype" value={fishtype} onChange={e => setFishtype(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='quantity'>Quantity</label>
                        <input className='form-input' name="quantity" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='ended'>Ended</label>
                        <input type="checkbox" className='form-input' name="ended" id="ended" value={ended} onChange={e => setEnded(ended?false:true)} />
                    </div>
                    <div className='addbtn-container'>
                        <input className='add' type="submit" value="Update" /><input className='add delete' type="button" value="Delete" onClick={handleDelete} />
                    </div>

                </div>
            </form>
        </div>
    );
    }
    else{
        return(<RequireLogin/>)
    }
}

export default EditPeriod;