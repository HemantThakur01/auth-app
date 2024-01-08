import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../features/auth/authSlice'

const Navbar = () => {

  const { user } = useSelector((state) => state.auth)


  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(logoutUser())
  }

  return (
    <>
      <nav className="navbar bg-info shadow-lg">
        <div className="container-fluid">
          <Link to={"/"}>
            <span className="navbar-brand mb-0 h1">AUTHENTICATION APP</span>
          </Link>
          <span className="navbar-brand mb-0 h1">
            {
              !user ? (
                <>
                  <Link to={"/register"} className="btn btn-sm btn-success mx-1">Register</Link>
                  <Link to={"/login"} className="btn btn-sm btn-success mx-1">Login</Link>
                </>
              ) : (

                <button className="btn btn-sm btn-danger mx-1" onClick={handleLogout }>Logout</button>
              )
            }

          </span>

        </div>
      </nav>
    </>
  )
}

export default Navbar