import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../Utils';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import RequireLogin from './RequireLogin';

const EditFishs = () => {

    const [error, setError] = useState(true);
    const [fishType, setFishtype] = useState('');
    const [result, setResult] = useState('');
    const [original, setOriginal] = useState({});
    const { search } = useLocation();
    const { id } = queryString.parse(search);
    const token = getAuthToken();
    const [objectid, setObjectid] = useState('');
    useEffect(() => {
        if (id != null) {
            (async () => {
                try {
                    const logged = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/fishtype/admin/query?fishtype=${id}`, { headers: { token: token } }).then(res => res.json());
                    if (response.ok && logged.ok) {

                        setFishtype(response.data[0].fishtype)
                        setObjectid(response.data[0]._id)
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
        if (fishType != '') {
            (async () => {
                try {

                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/fishtype/${objectid}`, {
                        method: "PUT",
                        headers: { token: `${token}`, "Content-type": "application/json" },
                        body: JSON.stringify({ fishtype: fishType })

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
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/fishtype/${objectid}`, {
                    method: "DELETE",
                    headers: { token: `${token}`, "Content-type": "application/json" },

                }).then(res => res.json());
                setResult(response.ok ? <h3>{response.msg}</h3> : <h4>Error Occur</h4>);
            } catch (error) {

            }
        })();

    }

    if (!error) {
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
                            <label htmlFor='fishtype'>Fish Type</label>
                            <input className='form-input' name="fishtype" id="fishtype" value={fishType} onChange={e => setFishtype(e.target.value)} />
                        </div>
                        <div className='addbtn-container'>
                            <input className='add' type="submit" value="Update" /><input className='add delete' type="button" value="Delete" onClick={handleDelete} />
                        </div>

                    </div>
                </form>
            </div>
        );
    } else {
        return (<RequireLogin />)
    }
}

export default EditFishs;