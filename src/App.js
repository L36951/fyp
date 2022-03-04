
import './App.css';
import Navbar from './components/Navbar';
import Fishponds from './components/pages/Fishponds'
import ChartJS from './components/Chart';
import Dasboard from './components/pages/Dashboard';
import UserList from './components/pages/UserList';
import AddUser from './components/pages/AddUser';
import EditUser from './components/pages/EditUser';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MadeData from './components/Data';
import { useEffect, useState } from 'react';

const App = () => {
  const [chartsToDisplay,setChartToDisplay] = useState([]);
  const getData = async()=>{
    const charts=[];
    charts.push(<ChartJS key={1} data={MadeData}/>);
    setChartToDisplay(charts);


  }
  useEffect(()=>{
    getData();
  },[]);
  return (
    <>
    <div className='content'>
    <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact />
          <Route path='/fishponds' element={<Fishponds/>} />
          <Route path='/sensordetails' element={<ChartJS/>}/>
          <Route path='/dashboard' element={<Dasboard/>}/>
          <Route path='/userlist' element={<UserList/>}/>
          <Route path='/adduser' element={<AddUser/>}/>
          <Route path='/edituser/:id' element={<EditUser/>}/>
        </Routes>
        
      </Router>
    </div>
    
      <Footer/>
    </>
  );
}

export default App;
