import React, { useState, useEffect } from 'react';
import SocialCard from './SocialCard';

import './DashboardBox.css'
import { PersonalVideo, Phone } from '@material-ui/icons';
import { Card } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
const DasboardBox = ({ fishtankId }) => {
    
   
    const [pHvalue, setPHvalue] = useState([]);
   
    useEffect(() => {
        (async () => {
            let result;
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/query?periodid=${fishtankId}&sensortype=pH%20value`);
                result = await response.json();
                
            } catch (error) {
                console.log(error);
                result = [];
            }
            
            setPHvalue([result.data[0],result.data[1]]);
        
            
            
        })();
    }, []);
  

    const [waterTemperature, setWaterTemperature] = useState([]);
    useEffect(() => {
        (async () => {
            let result;
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/query?periodid=${fishtankId}&sensortype=Water%20temperature`);
                result = await response.json();
                
            } catch (error) {
                console.log(error);
                result = [];
            }
            if(result.data.length>1){
                setWaterTemperature([result.data[0],result.data[1]]);
              
            }
            
            
        })();
    }, []);

    const [ORP, setORP] = useState([]);
    useEffect(() => {
        (async () => {
            let result;
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/query?periodid=${fishtankId}&sensortype=Oxidation-reduction%20potential(ORP)`);
                result = await response.json();

            } catch (error) {
                console.log(error);
                result = [];
            }
            setORP([result.data[0],result.data[1]]);
           
        })();
    }, []);

    const [oxygen, setOxygen] = useState([]);
    useEffect(() => {
        (async () => {
            let result;
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/query?periodid=${fishtankId}&sensortype=Dissolved%20Oxygen`);
                result = await response.json();
            } catch (error) {
                console.log(error);
                result = [];
            }
            setOxygen([result.data[0],result.data[1]]);
   
        })();
    }, []);

    const [TDS, setTDS] = useState([]);
    useEffect(() => {
        (async () => {
            let result;
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/query?periodid=${fishtankId}&sensortype=Total%20Dissolved%20Solids`);
                result = await response.json();
            } catch (error) {
                console.log(error);
                result = [];
            }
            setTDS([result.data[0],result.data[1]]);
          
            
        })();
    }, []);

    const [ammonium, setAmmonium] = useState([]);
    useEffect(() => {
        (async () => {
            let result;
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/query?periodid=${fishtankId}&sensortype=Ammonium%20concentration`);
                result = await response.json();
            } catch (error) {
                console.log(error);
                result = [];
            }
            setAmmonium([result.data[0],result.data[1]]);
        
        })();
    }, []);
    
    const [nitrates, setNitrates] = useState([]);
    useEffect(() => {
        (async () => {
            let result;
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/query?periodid=${fishtankId}&sensortype=Nitrates%20concentration`);
                result = await response.json();
            } catch (error) {
                console.log(error);
                result = [];
            }
            setNitrates([result.data[0],result.data[1]]);
        
        })();
    }, []);

    const [chlorophyll, setChlorophyll] = useState([]);
    useEffect(() => {
        (async () => {
            let result;
            try {
                const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/sensorrecord/query?periodid=${fishtankId}&sensortype=Chlorophyll`);
                result = await response.json();
            } catch (error) {
                console.log(error);
                result = [];
            }
            setChlorophyll([result.data[0],result.data[1]]);
         
        })();
    }, []);
    
 

    const allData=[pHvalue,chlorophyll,ammonium,oxygen,nitrates,ORP,TDS]
    var data =[pHvalue,chlorophyll,ammonium,oxygen,nitrates,ORP,TDS];

  

   
    return (
        <div className='DashboardBox'>
        
            <h1>Sensor</h1>
           
            <div className="cards-container">
               
               { data.map((d,i)=>d.length>0 ?<SocialCard key={i} userData={d} />:null )}
                
            </div>
        </div>

    );


}

export default DasboardBox;