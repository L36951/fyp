import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../Utils';
import { useLocation } from 'react-router-dom';
import RequireLogin from './RequireLogin';

const EditUser = () => {
    const [error, setError] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [result, setResult] = useState('');
    const token = getAuthToken();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(password);
        console.log(username, password, email, isAdmin);
        if (username != '' && password != '' && email != '' && isAdmin != '') {
            (async () => {
                try {
                    
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/register`, {
                        method: "POST",
                        headers: { token: `${token}`, "Content-type": "application/json" },
                        body: JSON.stringify({ username: username, password: password, email: email, isAdmin: isAdmin })

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
    useEffect(() => {
        console.log(isAdmin)
    }, [isAdmin])
    useEffect(() => {
        console.log(password)
    }, [password])
    if (!error) {
        return (
            <div className='addpage'>
                <form className='addform' onSubmit={handleSubmit}>
                    <div></div>
                    <div className='form'>
                        <div></div>
                        <h2>Add User</h2>
                        {result}
                        <div className='form-group'>
                            <label htmlFor='username'>username</label>
                            <input className='form-input' name="username" username="username" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>password</label>
                            <input className='form-input' name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>email</label>
                            <input className='form-input' type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='isAdmin'>isAdmin</label>
                            <select name="isAdmin" id="isAdmin" onChange={e => setIsAdmin(e.target.value)} value={isAdmin}>

                                <option value='true'>true</option>
                                <option value='false'>false</option>
                            </select>
                        </div>

                        <div className='addbtn-container'>
                            <input className='add' type="submit" value="Update" />
                        </div>

                    </div>
                </form>
            </div>
        );
    } else {
        return (<RequireLogin />)
    }
}

export default EditUser;