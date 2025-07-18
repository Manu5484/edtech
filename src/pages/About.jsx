import React from 'react'
import AboutSection1 from '../components/aboutcomponent/AboutSection1'
import { Footer } from '../components/Footer'
import AboutSection2 from '../components/aboutcomponent/AboutSection2'

export const About = () => {
  return (
    <div className='aboutus'>
      <AboutSection1/>
      <AboutSection2/>
      <Footer/>
    </div>

  )
}
