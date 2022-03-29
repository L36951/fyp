import React from 'react';
import Location from './Location';
import PhoneNumber from './PhoneNumber';
import './SocialCard.css'
import {useNavigate} from 'react-router-dom';
const SocialCard =({userData})=>{
    const navigate = useNavigate();
    const handleClick= () => {
        navigate(`/sensorDetails?sensortype=${userData[0].sensortype.sensortype}&periodid=${userData[0].period.periodId}`);  
        //console.log(rowInfo.original.fishpondId);
    }
    return(
        <div className='box' onClick={handleClick}>
          
            <div className='box__title'>
                {userData[0].sensortype.sensortype}
            </div>
            <div className='box__body'>
               <Location location={userData}/>
                <PhoneNumber updatedAt={userData[0].updatedAt.split("T")[0]}/>
                <div className='box__image' >
                    <img src={process.env.PUBLIC_URL + '/sensor.jpg'} style={{width:"10vh",height:"10vh"}}></img>
                </div>
            </div>
        </div>
    )
}

export default SocialCard;