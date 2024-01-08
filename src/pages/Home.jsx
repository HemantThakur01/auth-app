import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const {user , isLoading , isSuccess , isError , message} = useSelector((state)=>state.auth)

  useEffect(()=>{
 
    if(!user || isError){
      navigate("/login")
    } 

  } ,[user , isError , isLoading , isSuccess , message])

  return ( 
    <>
    <h1 className='display-1 text-center'>Home Page</h1>
    </>
  )
}

export default Home