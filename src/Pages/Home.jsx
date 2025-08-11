import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

export default function Home() {
  const {user} = useContext(AuthContext)
  const name = user?.displayName;
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <img src="header.png" alt="" className="w-36 h-36 rounded-full  mt-34"/>
        <h1 className="text-4xl">Hey {name}</h1>
        <h2 className="text-4xl">Welcome to our app</h2>
        <p>Let's start a quick product tour</p>
      </div>
    </div>
  );
}
