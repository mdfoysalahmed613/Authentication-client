import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router'
import { AuthContext } from '../Contexts/AuthContext'


export default function NavBar() {
  const {user,signOutUser} = useContext(AuthContext)

  const handleSignOut = ()=>{
    signOutUser()
    .then(result=>{
      console.log(result)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  return (
    <div >
      <NavLink to="/" className="mx-6">Home</NavLink>
      <NavLink to="/login" className="mx-6">Login</NavLink>
      <NavLink to="/signup" className="mx-6">SignUp</NavLink>

      {user && <>
      <NavLink to="/profile" >Profile</NavLink>
      </>}

      {user ? <>
      <span>{user.email}</span>
      <a className='btn' onClick={handleSignOut}>Logout</a> 
      
      </>: <Link to="/login">Login</Link>}
    </div>
  )
}
