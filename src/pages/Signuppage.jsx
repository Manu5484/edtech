import React from 'react'
import SignupForm from '../components/Signup'
import { useSelector } from "react-redux";
import Loader from '../components/Loader'

import "../static/signup.css"

export const Signuppage = () => {
  const isloading=useSelector((state)=>state.loader.isloading)
  return (
    <div className='signuppage'>
      {
        isloading?<Loader/>:<SignupForm/>
      }
    </div>
  )
}
