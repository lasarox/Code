import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar/Navbar.css';
import { Button } from '../Button/Button';
function logout(){
  localStorage.clear();
        window.location.href = '/';

}

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
        <Link to='/'  className='navbar-logo' onClick={closeMobileMenu}>
          QUALIPSOFT
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            
            <li className='nav-item'>
              <Link
                to='/aboutus'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About us
              </Link>
            </li>
             <li className='nav-item'>
              <Link
                to='/aboutpage'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                
                className='nav-links'
                onClick={logout}
              >
                Logout
              </Link>
            </li>

          </ul>
        
        </div>
      </nav>
    </>
  );
}

export default Navbar;