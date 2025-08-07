import React, { useContext, useState } from 'react'
import { Eye, EyeClosed, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Contexts/AuthContext';
export default function SignUp() {
  const [errorMsg,setErrorMsg] = useState('')
  const [confirmPass,setConfirmPass] =useState('');
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {createUser} = useContext(AuthContext)
  const handleRegister = e =>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passregex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    setErrorMsg('')

    if(!emailregex.test(email)){
      setErrorMsg("Invalid Email Address")
      return
    }

    if(!passregex.test(password)){
      setErrorMsg("Password must be at least 6 characters, include uppercase and lowercase letters.")
      return
    }

    if(password !== confirmPass){
      setErrorMsg("Passwords do not match")
      return
    }

    createUser(email,password)
      .then(() =>{
        toast.success("Account Created Successfully",{
          position:"top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          theme: "dark"
        });
        navigate("/")
      
      })
      .catch(error=>{
        if (error.message.includes("auth/email-already-in-use")) {
          setErrorMsg("Email is already used");
        } else {
          setErrorMsg(error.message); // fallback to default
        }
        console.log(error)
      })

  }
  return (
    <div>
      <form onSubmit={handleRegister}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 my-8">
          <h3 className='text-2xl font-semibold'>Create Account</h3>
          
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
            <input name='password' type={showPassword ? "text" : "password"} className="input my-1 pl-8 rounded-4xl focus:outline-none" placeholder="Create Password " required/>
            <span onClick={()=>setShowPassword(!showPassword)} className='absolute z-20 text-gray-500 right-4 top-1/2 -translate-y-1/2'>
              {
                showPassword ? <Eye size={16}/> : <EyeClosed size={16}/>
              }
            </span>
          </div>
          
          <div className='relative'>
            <span className='absolute z-20 text-gray-500 left-3 top-1/2 -translate-y-1/2'>
              <ShieldCheck size={16}/>
            </span>

            <input onChange={e=> setConfirmPass(e.target.value)} type={showConfirmPassword ? "text" : "password"} className="focus:outline-none pl-8 input my-1 rounded-4xl" placeholder="Confirm Password" required/>

            <span aria-label="Show password" tabIndex={0} role="button" onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className='cursor-pointer absolute z-20 text-gray-500 right-4 top-1/2 -translate-y-1/2'>
              {
                showConfirmPassword ? <Eye size={16}/> : <EyeClosed size={16}/>
              }
            </span>
          </div>
          
          <button className="btn btn-neutral mt-2">Sign Up</button>
          <p className='p-2'>Already have an Account? Please <Link to="/login" className='underline'>Login</Link></p>
          {
            errorMsg && <p className='text-red-500'>{errorMsg}</p>
          }
          <ToastContainer closeButton={false} toastClassName={()=>"flex items-center bg-black text-white shadow rounded-3xl text-sm py-3 px-4"}/>
        </fieldset>
      </form>
    
    </div>
  )
}
