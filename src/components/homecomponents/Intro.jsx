import React from 'react'
import '../../static/homecss.css'
import { FaArrowRight } from "react-icons/fa";
import {NavLink} from 'react-router-dom'

const Intro = () => {
  return (
    <div className='intro'>
      <button className='becomeinstructor'>Become an Instructor <FaArrowRight /></button>
      <h2 className='heading'>Empower Your Coding skill </h2>
      <div className='description'>With our online coding courses, you can learn at your own pace from anywhere in the world, and gain access to valuable resources including hands-on projects, quizzes, and more.</div>
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