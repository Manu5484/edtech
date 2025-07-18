import React from 'react'
import Intro from '../components/homecomponents/Intro'
import Sliderintro from '../components/homecomponents/Sliderintro'
import Codebloack from '../components/homecomponents/Codebloack'
import { Getskills } from '../components/homecomponents/Getskills'
import Timelinehome from '../components/homecomponents/Timelinehome'
import {Footer} from '../components/Footer'
import { useAuth } from '../apicalls/useAuth'

export const Home = () => {
  const {isLoggedIn,user}=useAuth();
  console.log(isLoggedIn , user);
  console.log()
  return (
    <div className='homepage'>
      <div className='session1'>
        <Intro/>  
        <Sliderintro/>
        <Codebloack
  title={"Unlock your coding potential with our online courses."}
  description={
    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
  }
  code={`<!DOCTYPE html>
<html lang="en">
<head>
<title>This is myPage</title>
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav>
<a href="/one">One</a>
</nav>
</body>
</html>`}
/>
      
      </div>
      <div className='session2'>
        <Getskills/>
        <Timelinehome/>
      </div>
      <div className='footer-container'>
      <Footer/>

      </div>
    </div>
  )
}
