import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import User from './components/user/User'
import Home from "./components/admin/pages/home/Home";
import Single from "./components/admin/pages/single/Single";
import Product from "./components/admin/pages/product/ShowQuizes";
import Customers from "./components/admin/pages/students/Student";
import './components/admin/style/dark.scss'
import { useContext } from "react";
import { DarkModeContext } from "./components/admin/context/darkModeContext";

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
    {
        path:'/user/:username',
        element:<User></User>
    },
    {
        path: "/admin",
        element: <Home />,
      },
      {
        path: "/users/:userId",
        element: <Single />,
      },
      {
        path: "/products/:productId",
        element: <Single />,
      },
      {
        path: "/users",
        element: <Customers />,
      },
      {
        path: "/products",
        element: <Product />,
      },
])


  
export default function App() {
    const { darkMode } = useContext(DarkModeContext);

  return (
    <main className={darkMode ? "app dark" : "app"} >
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
