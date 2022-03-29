import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../Utils';
import { getPasswordSecret } from '../../password'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import CryptoJS from 'crypto-js';
import RequireLogin from './RequireLogin';

const EditUser = () => {
    const [error, setError] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [result, setResult] = useState('');
    const [original, setOriginal] = useState({});
    const { search } = useLocation();
    const { id } = queryString.parse(search);
    const token = getAuthToken();

    useEffect(() => {
        if (id != null) {
            (async () => {
                try {
                    const logged = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/user/query?_id=${id}`, {
                        headers: { token: `${token}` }
                    }).then(res => res.json());
                    if (logged.ok && response.ok) {
                        setUsername(response.data[0].username)
                        setPassword(CryptoJS.AES.decrypt(
                            response.data[0].password,
                            getPasswordSecret()
                        ).toString(CryptoJS.enc.Utf8));
                        setEmail(response.data[0].email);
                        setIsAdmin(response.data[0].isAdmin);
                        setOriginal(response.data[0]);
                        setError(false)
                    }
                }
                catch (error) {

                }

            })();
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username != '' && password != '' && email != '' && isAdmin != '') {
            (async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/user/${id}`, {
                        method: "PUT",
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
    const handleDelete = () => {

        (async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/user/${id}`, {
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
                    <div></div>
                    <div className='form'>
                        <div></div>
                        <h2>Edit User</h2>
                        {result}
                        <div className='form-group'>
                            <label htmlFor='username'>username</label>
                            <input className='form-input' name="username" username="username" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>password</label>
                            <input className='form-input' type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>email</label>
                            <input className='form-input' type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='isAdmin'>isAdmin</label>
                            <select name="isAdmin" id="isAdmin" onChange={e => setIsAdmin(e.target.value)} value={isAdmin}>
                                <option value={true}>true</option>
                                <option value={false} >false</option>
                            </select>
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

export default EditUser;