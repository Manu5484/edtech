import React from 'react'
import { useSelector } from "react-redux";
import '../static/header.css'
import {NavLink} from 'react-router-dom';

export const Profiledetails = () => {
  const {profile} =useSelector((state)=> state.profile);

  return (
    <div className='userimgcontainer'>
      <NavLink to={'/dashboard'}>
        <img className='userimg' src={`${profile?.userimage}`} alt="userimg" />
      </NavLink>
    </div>
  )
}
