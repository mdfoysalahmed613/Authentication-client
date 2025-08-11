import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const { user, signOutUser, loading } = useContext(AuthContext);

  const photo = user?.photoURL;
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
      <div className="navbar justify-between md:max-w-7xl mx-auto">
        <div className="">
          <Link className="flex gap-1" to="/">
            <img src="/favicon.svg" alt="" />
            <span className="text-3xl font-bold">auth</span>
          </Link>
        </div>
        <div className="flex gap-3">
          <ThemeToggle />
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={photo}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleSignOut}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signup" className="btn">
              Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
