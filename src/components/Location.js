import React from 'react';
import './Location.css';
const Location =({location})=>{
    return(
        <div className='location'>
            <p>
                
                {location[0].value}
                {location[0].value>location[1].value?<i className="fas fa-arrow-up" style={{color:'green'}}></i>:<i className="fas fa-arrow-down" style={{color:'red'}}></i>}
            </p>
        
        </div>
    )
}

export default Location;