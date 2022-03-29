import './PhoneNumber.css'
import React from 'react';
const PhoneNumber=({updatedAt})=>{
    return( <div className="phoneNumber">
    <p>Updated At: {updatedAt}</p>
    </div>);
};
export default PhoneNumber;
