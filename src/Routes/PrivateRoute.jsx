import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { Navigate, useLocation } from 'react-router'

export default function PrivateRoute({children}) {
  const {user,loading} = useContext(AuthContext)
  const location = useLocation();

  if(loading){
    return <span className="loading loading-spinner text-primary"></span>
  }
  if(!user){
    return <Navigate state={location?.pathname} to="/login"></Navigate>
  }
  return (
    children
  )
}
