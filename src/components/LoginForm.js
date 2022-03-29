import React,{useState} from 'react';
import './Login.css'
const LoginForm=({Login,error})=>{
    const [details,setDetails] = useState({username:"",password:""});
    
    const submitHandler= e =>{
        e.preventDefault();
        Login(details);
    }
    return(
        <form className='loginform' onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Login</h2>
                {error!=""?(<div className="error">{error}</div>):null}
                <div className='form-group'>
                    <label htmlFor='username'>Email:</label>
                    <input className='login' type="email" name="username" id="username" onChange={e=>setDetails({...details,username:e.target.value})} value={details.username}/>

                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input className='login' type="password" name="password" id="password" onChange={e=>setDetails({...details,password:e.target.value})} value={details.password}/>
                </div>
                <input className='login' type="submit" value="LOGIN"/>
            </div>
        </form>
    )
}
export default LoginForm;