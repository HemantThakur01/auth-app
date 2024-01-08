import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const dispatch = useDispatch()

  const [loginData , setLoginData] = useState({email : "" , password : ""})
   const navigate = useNavigate();
  const {email , password} = loginData

  const handleChange = (e) =>{
    setLoginData({
      ...loginData , 
      [e.target.name] : e.target.value
    })
  }
  const {user}= useSelector(state => state.auth);

  const handleSubmit = (e) =>{
     e.preventDefault()
     dispatch(loginUser(loginData))
  }
  useEffect(()=>{
    if(user){
      navigate("/");
    }
  },[user])
 
  return (
    <>
     <h1 className='display-1 text-center'>Login Page</h1>
     <form className='my-5'onSubmit={handleSubmit}>
      <input type="email" placeholder='Email' className='form-control my-3' required name='email' value={email} onChange={handleChange}/>
      <input type="password" placeholder='Password' className='form-control my-3' required name='password' value={password} onChange={handleChange }/>
      <button className="btn btn-success w-100">Login</button>
     </form>
    </>
  )
}

export default Login