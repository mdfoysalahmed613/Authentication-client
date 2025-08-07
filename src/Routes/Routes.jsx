import { createBrowserRouter, RouterProvider, } from "react-router";
import Root from "../Components/Root";
import Login from "../Pages/Login";
import SignUp from "../Pages/Signup";
import { Home } from "lucide-react";
import Profile from "../Pages/Profile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
      {index: true,Component: Home},
      {
        path:"/login",
        Component: Login,
      },
      {
        path:"/signup",
        Component: SignUp,
      },
      {
        path:"profile",
        element: <PrivateRoute><Profile/></PrivateRoute>
        
      }
    ]
  },
]);

export default router