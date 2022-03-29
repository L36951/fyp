import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../Utils';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import RequireLogin from './RequireLogin';

const EditRecords = () => {

    const [error, setError] = useState('');

    const [result, setResult] = useState('');
    const [original, setOriginal] = useState({});
    const { search } = useLocation();
    const { id } = queryString.parse(search);
    const token = getAuthToken();
    const [objectid, setObjectid] = useState('');
    const [periodid, setPeriodid] = useState('');
    const [sensortype, setSensortype] = useState('');
    const [value, setValue] = useState('');
    const [record, setRecord] = useState('')
    const [ended, setEnded] = useState(false);


    useEffect(() => {
        console.log(ended)
    }, [ended])
    useEffect(() => {
        if (id != null) {
            (async () => {
                try {
                    const logged = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/admin/query?_id=${id}`, { headers: { token: token } }).then(res => res.json());
                    if (logged.ok && response.ok) {
                        setObjectid(response.data[0]._id)
                        setPeriodid(response.data[0].period.periodId)
                        setSensortype(response.data[0].sensortype.sensortype)
                        setValue(response.data[0].value)
                        setRecord(response.data[0].record.record)
                        setOriginal(response.data[0]);
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
        if (periodid != '' && value != '' && sensortype != '') {
            (async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/${objectid}`, {
                        method: "PUT",
                        headers: { token: `${token}`, "Content-type": "application/json" },
                        body: JSON.stringify({ record: record, periodid: periodid, sensortype: sensortype, value: value })

                    }).then(res => res.json());
                    setResult(response.ok ? <h3>{response.msg}</h3> : <h4>{response.msg}</h4>);
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
                    <h2>Edit Record</h2>
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
                        <label htmlFor='sensortype'>Sensor Type</label>
                        <input className='form-input' name="sensortype" id="sensortype" value={sensortype} onChange={e => setSensortype(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='value'>Value</label>
                        <input className='form-input' name="value" id="value" value={value} onChange={e => setValue(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='recordtype'>Record Type</label>
                        <input className='form-input' name="recordtype" id="recordtype" value={record} onChange={e => setRecord(e.target.value)} />
                    </div>

                    <div className='addbtn-container'>
                        <input className='add' type="submit" value="Update" /><input className='add delete' type="button" value="Delete" onClick={handleDelete} />
                    </div>

                </div>
            </form>
        </div>
    );
}else{
    return(<RequireLogin/>)
}
}

export default EditRecords;