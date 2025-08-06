import React from 'react'
import { NavLink } from 'react-router'

export default function NavBar() {
  return (
    <div >
      <NavLink to="/" className="mx-6">Home</NavLink>
      <NavLink to="/login" className="mx-6">Login</NavLink>
      <NavLink to="/signup" className="mx-6">SignUp</NavLink>
    </div>
  )
}
