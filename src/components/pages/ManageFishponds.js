
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import List from '../List';
import '../ManagemeFishponds.css';
import { useLocation, useNavigate } from 'react-router-dom';
import RequireLogin from './RequireLogin';
import { getAuthToken } from '../../Utils';
const ManageFishponds = () => {
  const location = useLocation()
  const [pageCount, setPageCount] = useState(10);
  const [tableHeader, setTaableHeader] = useState(['#', 'ID', 'Location', 'Length','Height','Width']);
  const [accessor, setAccessor] = useState(['fishpondId', 'location', 'length','height','width']);
  const [allTableBody, setAllTableBody] = useState([]);
  const [tableBodyHolder, setTableBodyHolder] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [link, setLink] = useState([`${location.pathname}/edit`, "fishpondId"]);
  const [error, setError] = useState(true);
  const navigate=useNavigate();
  const token = getAuthToken();
  const addClick =()=>{
  
    navigate(`${location.pathname}/add`);
  }
  useEffect(() => {
    (async () => {
      let fishpondData;
      try {
        const logged = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
        const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/fishpond/query`);
        fishpondData = await response.json();
        if(fishpondData.ok && logged.ok){
          setAllTableBody(fishpondData.data);
          setTableBodyHolder(fishpondData.data);
          setError(false)
        }
      } catch (error) {
        console.log(error);
        fishpondData = [];
      }
     
    
    })();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(tableBodyHolder.length / 10));
    setTableBody(tableBodyHolder.slice(0, 10))
  }, [tableBodyHolder])


  const handlePageClick = (data) => {

    setTableBody(tableBodyHolder.slice(data.selected * 10, data.selected * 10 + 10));
  }


  const filterData = event => {
    const value = event.target.value.toLowerCase();
    const filterData = allTableBody.filter(
      d => (`${accessor.map((item, key) => { return (d[item] + "") })}`
        .toLowerCase()
        .includes(value)

      )
    );
  
    setTableBodyHolder(filterData);
  }
if(!error){
  return (
    
    <div className='container'>

   

      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
      <div className='searchbar-container'>
        <button className='btn btn-success addbtn' onClick={addClick}>Add</button>  <input className='searchbar' placeholder='search...' onChange={filterData} />
      </div>
      <List
        accessor={accessor}
        header={tableHeader}
        data={tableBody}
        link={link}
      />

    </div>
  );
}else{
  return(<RequireLogin/>)
}
}

export default ManageFishponds;