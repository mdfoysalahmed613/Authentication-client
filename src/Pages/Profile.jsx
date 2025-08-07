import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
export default function Profile() {
  const {user} = useContext(AuthContext)
  return (
    <div className='text-2xl'>
      <p>{user.email}</p> 
    </div>
  )
}
