import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { registerUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const {user , isLoding , isSuccess , isError , message} = useSelector((state)=>state.auth)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [formData , setForData] = useState({name : "" , email : "" , password : "" , password2 : ""})

  const {name , email , password , password2} = formData

  const handleChange = (e)=>{
   setForData({
    ...formData , 
    [e.target.name] : e.target.value
   })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(password !== password2){
      toast.error("Passwords Not Matched")
    }

    dispatch(registerUser(formData))
  }

  if(isError){
    toast.error(message)
  }

  useEffect(()=>{
    if(user || isSuccess){
      navigate("/")
    }

  } , [user , isLoding , isError , isSuccess , message])

  return (
    <>
     <h1 className='display-4 text-center'>Register Page</h1>
     <form className='my-5' onSubmit={handleSubmit}>
      <input type="text" placeholder='Name' className='form-control my-2' onChange={handleChange} name='name' value={name} required/>
      <input type="email" placeholder='Email' className='form-control my-2' onChange={handleChange} name='email' value={email} required/>
      <input type="password" placeholder='Password' className='form-control my-2' onChange={handleChange} name='password' value={password} required/>
      <input type="password" placeholder='Confirm Password' className='form-control my-2' onChange={handleChange} name='password2' value={password2} required/>
    <button className="btn btn-success w-100">Register</button>
     </form>
    </>
  )
}

export default Register