import { Details } from '@material-ui/icons';
import React, { useState,useEffect } from 'react';
import LoginForm from '../LoginForm';
import { setAuthToken } from '../../Utils';
import { useNavigate } from 'react-router-dom';
const Login =()=>{
   const admin={email:"abc@abc.com",password:"123"}

    const [user,setUser]=useState({name:"",email:""});

    const [error,setError] =useState("");
    const navigate = useNavigate()
  

    const Login = details=>{
        (async()=>{
            try{
            
                const response =await  fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/login`, {
                    method:'POST',
                    headers:{"Content-type":"application/json"},
                    body:JSON.stringify({email:details.username,password:details.password}),
                })
                .then(res=>res.json());
                if(response.ok){
                    setAuthToken(response.token);
                    navigate('/');
                }else
                {
                    setError(response.msg);
                }
                
            }
            catch(e){
                console.log(e);
            }     
        })();
       
       
    }
    const Logout =()=>{
        console.log("Logout");
        setUser({name:"",email:""})
    }
    return(
    <div className='loginpage'>
        {(user.email!="")?(
            <div className="welcome">
                <h2> Welcome, <span>{user.email}</span></h2>
                <button className='login' onClick={Logout}>Logout</button>
            </div>
        ):(<LoginForm Login={Login} error={error}/>)}
    
    </div>
    );


}

export default Login;