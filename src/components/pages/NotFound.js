import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const NotFound=()=>{
  
    return(
    <div>
        <div>
            404
        </div>
        <div>
            Not Found
        </div>
        <Link to="/">Back to Home page </Link>
    </div>)
}

export default NotFound;