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


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'
import Home from './components/homepage/Home';

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
        path : '/home',
        element : <Home></Home>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
    {
        path:'/user',
        element:<User></User>
    }
    
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
