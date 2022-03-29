import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const RequireLogin = () => {
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate('/login');
    }
    return (
        <div>
            <div>Login Required</div>

            <Link to='/login' replace>Go to Login Page</Link>
            </div>
    )
}

export default RequireLogin;