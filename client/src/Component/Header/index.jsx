import React, { useContext } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider';

const Header = () => {
  const {auth, logoutAuth } = useContext(AuthContext)

  const checkAuth = Object.keys(auth).length

  const Logout = () => {
    logoutAuth()
    setTimeout(() => {
      window.location.href = '/login'
    }, 500)
    
  }

  return (
    <nav className="navbar">

    <div className="left">

      <h1>Navbar</h1>

    </div>

    <div className="right">

      <input type="checkbox" id="check" />

      <ul className="list">
        {auth && <li><Link to="/product">Product</Link></li>}
        {!checkAuth && (
          <>
            <li><Link to="/registration">register</Link></li>

            <li><Link to="/">login</Link></li>
          </>
        )}
       {auth && <li style={{cursor: 'pointer'}} onClick={Logout}>Log Out</li>}

      </ul>

    </div>

  </nav>
  )
}

export default Header
