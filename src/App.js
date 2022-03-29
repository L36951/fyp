
import './App.css';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import Fishponds from './components/pages/Fishponds'

import Dasboard from './components/pages/Dashboard';
import UserList from './components/pages/UserList';
import AddUser from './components/pages/AddUser';
import EditUser from './components/pages/EditUser';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MadeData from './components/Data';
import { useEffect, useState } from 'react';
import SensorDetails from './components/pages/SensorDetails';
import QRCodeGenerator from './components/QRCodeGenerator';
import AnimatedFish from './components/AnimatedFish';
import TestingAPI from './components/TestingAPI';
import Login from './components/pages/Login';
import FishpondsManagement from './components/pages/FishpondsManagement';
import ManageFishponds from './components/pages/ManageFishponds';
import ManageFishs from './components/pages/ManageFish';
import ManagePeriods from './components/pages/ManagePeriods';
import ManageSensors from './components/pages/ManageSensor';
import AddFishponds from './components/pages/AddFishponds';
import EditFishponds from './components/pages/EditFishponds';
import AddFishs from './components/pages/AddFishType';
import EditFishs from './components/pages/EditFishType';
import AddPeriods from './components/pages/AddPeriod';
import EditPeriods from './components/pages/EditPeriods';
import EditSensors from './components/pages/EditSensor';
import AddSensors from './components/pages/AddSensor';
import ManageRecords from './components/pages/ManageRecords';
import AddRecords from './components/pages/AddRecords';
import EditRecords from './components/pages/EditRecord';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { setAuthToken,getAuthToken,refreshToken } from './Utils';
import Logout from './components/pages/Logout';
import NotFound from './components/pages/NotFound';

const App = () => {
  
  useEffect(()=>{
    refreshToken();
  })



  return (
    <>
    {console.log(process.env.REACT_APP_SECRET_APIPATH)}
    
      <div className='content'>
        <Router>
          {/*Navigation bar*/}
          <Navbar/>

          <Routes>
            <Route path='/logout' element={<Logout />} />
            <Route path='/fishpondsmanagement/records/edit' element={<EditRecords />} />
            <Route path='/fishpondsmanagement/records/add' element={<AddRecords />} />
            <Route path='/fishpondsmanagement/sensors/edit' element={<EditSensors />} />
            <Route path='/fishpondsmanagement/sensors/add' element={<AddSensors />} />
            <Route path='/fishpondsmanagement/periods/edit' element={<EditPeriods />} />
            <Route path='/fishpondsmanagement/periods/add' element={<AddPeriods />} />
            <Route path='/fishpondsmanagement/fishs/edit' element={<EditFishs />} />
            <Route path='/fishpondsmanagement/fishs/add' element={<AddFishs />} />
            <Route path='/fishpondsmanagement/fishponds/edit' element={<EditFishponds />} />
            <Route path='/fishpondsmanagement/fishponds/add' element={<AddFishponds />} />
            <Route path='/fishpondsmanagement/records' element={<ManageRecords />} />
            <Route path='/fishpondsmanagement/periods' element={<ManagePeriods />} />
            <Route path='/fishpondsmanagement/sensors' element={<ManageSensors />} />
            <Route path='/fishpondsmanagement/fishs' element={<ManageFishs />} />
            <Route path='/fishpondsmanagement/fishponds' element={<ManageFishponds />} />
            <Route path='/login' element={<Login />} />
            <Route path='/fishpondsmanagement' element={<FishpondsManagement />} />
            <Route path='/testingAPI' element={<TestingAPI />} />
            <Route path='/' element={<Home />} />
            <Route path='/fish' element={<AnimatedFish />} />
            <Route path='/fishponds' element={<Fishponds />}  />
            <Route path='/sensordetails' element={<SensorDetails />} />
            <Route path='/dashboard' element={<Dasboard />} />
            <Route path='/userlist' element={<UserList />} />
            <Route path='/userlist/add' element={<AddUser />} />
            <Route path='/userlist/edit' element={<EditUser />} />
            <Route path='/qrcode' element={<QRCodeGenerator />} />
            <Route path='*' element={<NotFound/>} /> 
          </Routes>

        </Router>
      </div>

      <Footer />
    </>
  );
}

export default App;
