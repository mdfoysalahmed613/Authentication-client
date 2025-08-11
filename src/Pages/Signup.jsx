import React, { useContext, useState } from "react";
import {
  Eye,
  EyeClosed,
  KeyRound,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
export default function SignUp() {
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { createUser , signInGoogle } = useContext(AuthContext);

  const handleGoogleSignUp = () =>{
    signInGoogle()
    .then(()=>{
      navigate(location?.state || "/");
    })
    .catch(error=>{
      console.log(error)
    })
  }


  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const passregex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrorMsg("");
    if (!emailregex.test(email)) {
      setErrorMsg("Invalid Email Address");
      return;
    }
    if (!passregex.test(password)) {
      setErrorMsg(
        "Password must be at least 6 characters, include uppercase and lowercase letters."
      );
      return;
    }
    if (password !== confirmPass) {
      setErrorMsg("Passwords do not match");
      return;
    }
    createUser(email, password, name)
      .then((result) => {
        console.log(result);
        navigate("/");
      })


      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          setErrorMsg("Email is already used");
        } else {
          setErrorMsg(error.message); // fallback to default
        }
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <fieldset className="fieldset mx-auto bg-base-200 border-base-300 rounded-box max-w-md border p-4 md:p-10 my-8">
          <h3 className="text-3xl text-center my-3 font-semibold">
            Create an Account
          </h3>

          <div className="relative my-1">
            <span className="absolute z-20 left-5 top-1/2 -translate-y-1/2 text-gray-500">
              <User size={22} />
            </span>
            <input
              name="name"
              type="text"
              className="input input-lg my-1 pl-12 w-full rounded-4xl focus:outline-none"
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div className="relative my-1">
            <span className="absolute z-20 left-5 top-1/2 -translate-y-1/2 text-gray-500">
              <Mail size={22} />
            </span>
            <input
              name="email"
              type="email"
              className="input input-lg my-1 pl-12 w-full rounded-4xl focus:outline-none"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="relative my-1">
            <span className="absolute z-20 text-gray-500 left-5 top-1/2 -translate-y-1/2">
              <KeyRound size={22} />
            </span>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input input-lg my-1 pl-12  w-full rounded-4xl focus:outline-none"
              placeholder="Create Password "
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-20 text-gray-500 right-5 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <Eye size={22} /> : <EyeClosed size={22} />}
            </span>
          </div>

          <div className="relative my-1">
            <span className="absolute z-20 text-gray-500 left-5 top-1/2 -translate-y-1/2">
              <ShieldCheck size={22} />
            </span>

            <input
              onChange={(e) => setConfirmPass(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              className="focus:outline-none pl-12 input  w-full input-lg my-1 rounded-4xl"
              placeholder="Confirm Password"
              required
            />

            <span
              aria-label="Show password"
              tabIndex={0}
              role="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer absolute z-20 text-gray-500 right-5 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <Eye size={22} />
              ) : (
                <EyeClosed size={22} />
              )}
            </span>
          </div>
          <button className="btn btn-lg btn-primary my-4 ">Sign Up</button>

          <button type="button" onClick={handleGoogleSignUp} className="btn btn-lg bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            SignUp with Google
          </button>

          <p className="p-2 text-center text-base">
            Already have an Account? Please{" "}
            <Link
              to="/login"
              className="underline font-semibold text-md text-primary"
            >
              Login
            </Link>
          </p>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </fieldset>
      </form>
    </div>
  );
}
