import React from 'react'
import '../../static/homecss.css'
import { FaArrowRight } from "react-icons/fa";
import {NavLink} from 'react-router-dom'

const Intro = () => {
  return (
    <div className='intro'>
      <button className='becomeinstructor'>Become an Instructor <FaArrowRight /></button>
      <h2 className='heading'>Empower Your Coding skill </h2>
      <div className='description'>with our online coding courses , ypu can learn at your own pace , from any where in the wprld and get access to the resource , including hands on projects an dquizes etc..</div>
      <div className='learnmorecontainer'>
        <NavLink to={'/signup'}>
          <button className='primarybutton'>Learn more</button>
        </NavLink>
        <NavLink to={'#'}>
          <button className='secondarybutton'>Book a Demo</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Intro