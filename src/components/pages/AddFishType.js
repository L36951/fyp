import React, { useState, useEffect } from 'react';
import { getAuthToken } from '../../Utils';
import '../Add.css';
import RequireLogin from './RequireLogin';
const AddFishs = () => {
    const [error, setError] = useState(true);
    const [fishType, setFishtype] = useState('');

    const [result, setResult] = useState('');
    const token = getAuthToken();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (fishType != '') {
            (async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/fishtype`, {
                        method: "POST",
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
    useEffect(() => {
        (async () => {
            try {
                const logged = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
                if (logged.ok) {

                    setError(false);
                }
            } catch (error) {

            }
        })();
    }, [])

    if (!error) {
        return (
            <div className='addpage'>
                <form className='addform' onSubmit={handleSubmit}>
                    <div className='form'>
                        <h2>Add Fish Type</h2>
                        {result}
                        <div className='form-group'>
                            <label htmlFor='fishtype'>Fish Type</label>
                            <input className='form-input' name="fishtype" id="fishtype" value={fishType} onChange={e => setFishtype(e.target.value)} />
                        </div>

                        <input className='add' type="submit" />
                    </div>
                </form>
            </div>
        );
    } else {
        return (<RequireLogin />)
    }
}

export default AddFishs;
