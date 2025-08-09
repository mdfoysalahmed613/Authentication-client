import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'

export default function Home() {
  const {user} = useContext(AuthContext)
  const name = user?.displayName;
  return (
    <p> Hey {name}</p>
  )
}
