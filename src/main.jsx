import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router";
import Root from './Components/Root.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import SignUp from './Pages/Signup.jsx';
                      
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
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
