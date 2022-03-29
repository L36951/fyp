
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getAuthToken } from '../../Utils';
import List from '../List';
import '../ManagemeFishponds.css';
import { useNavigate,useLocation } from 'react-router-dom';
import RequireLogin from './RequireLogin';

const Userlist = () => {
  const location = useLocation();
  const [pageCount, setPageCount] = useState(10);
  const [tableHeader, setTaableHeader] = useState(['#', 'username', 'createdAt', 'isAdmin']);
  const [accessor, setAccessor] = useState(['username', 'createdAt', 'Admin']);
  const [allTableBody, setAllTableBody] = useState([]);
  const [tableBodyHolder, setTableBodyHolder] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [link, setLink] = useState([`${location.pathname}/edit`, "_id"]);
  const [error, setError] = useState(true);
  const navigate = useNavigate();
  const token = getAuthToken();
  const addClick = () => {

    navigate(`${location.pathname}/add`);
  }
  
  useEffect(() => {
    (async () => {
      let UserData;
      try {
        
        const logged = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
        const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/user`, {
          method: "GET",
          headers: { token: `${token}` }

        }).then(res => res.json());

        if (response.ok&& logged.ok) {
          UserData = response;
          UserData.data = UserData.data.map((d) => { return ({ ...d, 'updatedAt': d.updatedAt.split("T")[0], 'createdAt': d.updatedAt.split("T")[0] }) })
          UserData.data.map((UserData) => {
            UserData.Admin = UserData.isAdmin ? 'Yes' : 'No'
          })
          setAllTableBody(UserData.data);
          setTableBodyHolder(UserData.data);
          setError(false)
        }
      } catch (error) {
        
        UserData = [];
      }

    })();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(tableBodyHolder.length / 10));
    setTableBody(tableBodyHolder.slice(0, 10))
  }, [tableBodyHolder])


  const handlePageClick = (data) => {
    console.log(tableBodyHolder.length)
    console.log(data.selected);
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

  if (!error) {
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

  } else {
    return (<RequireLogin />)
  }
}

export default Userlist;