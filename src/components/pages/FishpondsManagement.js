import React from 'react';
import FuncBox from '../FuncBox';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const FishpondsManagement =()=>{
    const buttonArray=['fishponds','periods','sensors','fishs','records']
    const navigate = useNavigate();

   
    return(

        <div className='FuncBoxContainer'>
            {
                buttonArray.map((d,i)=>{
                    return <Link key={i} to={d}><FuncBox key={i} text={d}/></Link>
                })
            }
        </div>
    );

}

export default FishpondsManagement;