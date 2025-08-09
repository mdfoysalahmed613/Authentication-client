import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../Firebase/firebase.init'

export default function AuthProvider({children}) {

  const [user,setUser] = useState(null)
  const [loading,setLoading] =useState(true);

  const createUser = (email,password,displayName) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
    .then(result =>{
      return updateProfile(result.user,{displayName: displayName})
    })
  }

  const signInUser = (email,password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password);
  }

  const signOutUser = () =>{
    return signOut(auth);
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      console.log("useeffect onauthchange",currentUser)
      setUser(currentUser)
      setLoading(false)
    })
    return () =>{
      unsubscribe()
    }
  })
  
  const userInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser
  }
  return (
    <AuthContext value={userInfo}>
      {children}
    </AuthContext>
  )
}
