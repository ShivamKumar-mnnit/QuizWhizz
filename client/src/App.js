import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css'

/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Home from './components/homepage/Home';
import Admin from './components/dashboard/Admin';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Home></Home>
    },
    {
        path : '/login',
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
        path : '/dashboard',
        element : <AuthorizeUser><Admin /></AuthorizeUser>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    }
    
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
