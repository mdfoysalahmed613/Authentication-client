import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";

export default function NavBar() {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav>
      {user ? (
        <div>
          
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
