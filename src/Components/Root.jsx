import React from 'react'
import { Outlet } from 'react-router'
import NavBar from './Navbar'

export default function Root() {
  return (
    <div>
      <NavBar/>
      <Outlet/>
    </div>
  )
}
