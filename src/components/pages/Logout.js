import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../Utils';

const Logout=()=>{

    const navigate = useNavigate()
    useEffect(()=>{
        (async()=>{
            let response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/deletecookie`,{method:"GET",credentials:'include'}).then(res=>res.json());
        })()
        setAuthToken("");
        const timeout= setTimeout(()=>{
            navigate('/')
        },1000)
        
       return ()=> clearInterval(timeout)
    },[]);
    return(
        <div>
            Logged Out
        </div>
    );
}

export default Logout;