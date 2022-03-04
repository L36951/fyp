import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Card from '../Card';
import DasboardBox from '../DashboardBox';
const Dasboard = ()=>{
    const {search} = useLocation();
    const {id} =queryString.parse(search); 
    const sensorName ="temperture";
    const valueSign = "C";
    const value = 25;
    
    
    return(
        <>
        
        <div className='wrapper'>
        <Card
        img="https://images.unsplash.com/photo-1612077330269-788066d5ba58?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=85"
        title="Tie Up Boots"
        description="Fall Favorite • Boots"
        price="45.00"
      /></div>
      <div className='cards-container'>
      <DasboardBox 
        sensorName={sensorName}
        valueSign={valueSign}
        value={value}
        />
      </div>
        
        
        </>
        
    );
}

export default Dasboard;