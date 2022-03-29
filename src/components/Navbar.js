import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getAuthToken, setAuthToken } from '../Utils';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const location = useLocation();
  const token = getAuthToken();
  const [isAdmin,setIsAdmin] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/check`, { method: "POST", headers: { token: token } }).then(res => res.json());
        if(response.ok){
        
          setIsAdmin(true);
        }
        else{
          setIsAdmin(false)
        }
      }
      catch (error) {
        setIsAdmin(false);
      }
    })()
  }, [location.pathname])
  
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
   
  }, []);

  window.addEventListener('resize', showButton);


  
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            AquaMon
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {isAdmin ? <li className='nav-item'><Link to='/userlist' className='nav-links' onClick={closeMobileMenu}>Accounts</Link></li> : null}
            {isAdmin ? <li className='nav-item'><Link to='/fishpondsmanagement' className='nav-links' onClick={closeMobileMenu}>Management</Link></li> : null}
          
            <li className='nav-item'>
              <Link
                to='/fishponds'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Fishponds
              </Link>
            </li>

          
            {isAdmin ?
              <li>
                <Link
                  to='/logout'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Logout
                </Link>
              </li> : <li>
                <Link
                  to='/login'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>}

          </ul>
          {button && (isAdmin ? <Button path='/logout' buttonStyle='btn--outline'>Logout</Button> : <Button path='/login' buttonStyle='btn--outline'>Login</Button>)}
        </div>
      </nav>
    </>
  );
}

export default Navbar;