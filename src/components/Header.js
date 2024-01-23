import React from 'react'
import { Link,useLocation } from 'react-router-dom'


const Header = () => {
    const location=useLocation();
  return (
    <div className='app-header'>
        <div className='title'>
            <h1>
                <Link to="/" >express.it</Link>
            </h1>
        </div>
        <div className='nav'>
            <ul>
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Feed</Link>
                </li>
                <li>
                    <Link to="/users" className={location.pathname === '/users' ? 'active' : ''}>Users</Link>
                </li>
                <li>
                    <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>
                </li>
            </ul>
        </div>
      
    </div>
  )
}

export default Header
