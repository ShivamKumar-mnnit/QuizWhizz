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


// Quiz
import Main from './components/quiz/Main';
import Questions from './components/quiz/Questions';
import Quiz from './components/quiz/Quiz';
import Result from './components/quiz/Result';
import ResultTable from './components/quiz/ResultTable';

//Exam
import ExamDashboard from './components_pages/Dashboard';
import CreateQuiz from './components_pages/CreateQuiz';
import Configure from './components_pages/Configure';
import Anlyze from './components_pages/Anlyze';
import ExamReview from './components_pages/ExamReview';

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
        path : '/quiz',
        element : <AuthorizeUser><Main /></AuthorizeUser>
    },
   
    {
        path : '/questions',
        element : <AuthorizeUser><Questions /></AuthorizeUser>
    },
    {
        path : '/quiz/quiz',
        element : <AuthorizeUser><Quiz /></AuthorizeUser>
    },
    {
        path : '/result',
        element : <AuthorizeUser><Result /></AuthorizeUser>
    },
    {
        path : '/resultTable',
        element : <AuthorizeUser><ResultTable /></AuthorizeUser>
    },

//define all exams related paths here
{
    path : '/examDashboard',
    element : <ExamDashboard  />
},
{
    path : '/create/:id',
    element : <CreateQuiz  />
},
{
    path : '/configure/:id',
    element : <Configure  />
},
{
    path : '/anlyze/:id',
    element : <Anlyze  />
},
{
    path : '/examreview/:id',
    element : <ExamReview  />
},













    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    }

])

export default function App() {



  return (
    <main>
        <RouterProvider router={router} ></RouterProvider>
    </main>
  )
}
