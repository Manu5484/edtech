import React from 'react'
import {Outlet} from 'react-router-dom'
import '../App.css'

export const Main = () => {
  return (
    <main className='pageoutlet'>
      <Outlet/>
    </main>
    
  )
}
