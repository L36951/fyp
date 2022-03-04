import React from 'react';
import './Location.css';
const Location =({location})=>{
    return(
        <div className='location'>
            <p>
                {location.street.number},{location.street.name}
            </p>
            <p>
               {location.street.city}
            </p>
            <p>
                {location.street.state}
            </p>
            <p>
                {location.street.postcode}
            </p>
            <p>
                {location.street.country}
            </p>

        </div>
    )
}

export default Location;