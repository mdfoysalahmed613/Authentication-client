import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../Firebase/firebase.init';
import { Link } from 'react-router';
import { Eye, EyeClosed, KeyRound, Mail } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [success,setSuccess] = useState(false);
  const [errorMsg,setErrorMsg] = useState("");
  const [showPassword,setShowPassword] = useState(false)
  const handleLogin = e =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setErrorMsg("")
    setSuccess(false)
    

    signInWithEmailAndPassword(auth,email,password)
    .then(userCredential=>{
      console.log(userCredential.user)
      toast.success("Login Successful",{
        position:"top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        theme: "dark"
      })
    })
    .catch(error=>{
      if(error.message.includes('(auth/invalid-credential)')){
        setErrorMsg("Invalid User and Password")
      }
      else{
        setErrorMsg(error.message)
      }
    })

  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <fieldset className="fieldset my-8 bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <h3 className='text-2xl font-semibold'>Login</h3>

          <div className='relative'>
            <span className='absolute z-20 left-3 top-1/2 -translate-y-1/2 text-gray-500'>
              <Mail size={16}/>
            </span>
            <input name='email' type="email" className="input my-1 pl-8 rounded-4xl focus:outline-none" placeholder="Enter Your Email" required/>
          </div>

          <div className='relative'>
            <span className='absolute z-20 text-gray-500 left-3 top-1/2 -translate-y-1/2'>
              <KeyRound size={16}/>
            </span>
            <input name='password' type={showPassword ? "text" : "password"} className="input my-1 pl-8 rounded-4xl focus:outline-none" placeholder="Enter Your Password" required/>
            <span onClick={()=>setShowPassword(!showPassword)} className='absolute z-20 text-gray-500 right-4 top-1/2 -translate-y-1/2'>
              {
                showPassword ? <Eye size={16}/> : <EyeClosed size={16}/>
              }
            </span>
          </div>

          <p className='text-blue-500 text-left pl-2 underline'>Forgot Password?</p>

          <button className="btn btn-neutral mt-2">Login</button>
          <p className='p-2'>Dont have an Account? Please <Link to="/signup" className='underline'>Sign UP</Link></p>
          {
            success && <p className='text-green-500'>Login Successful</p> 
          }
          {
            errorMsg && <p className='text-red-500'>{errorMsg}</p>
          }
          <ToastContainer closeButton={false} toastClassName={()=>"flex items-center bg-black text-white shadow rounded-3xl text-sm py-3 px-4"}/>
        </fieldset>
      </form>
    </div>
  )
}
