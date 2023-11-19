import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag } from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg'
import {CgLogOut} from 'react-icons/cg'
import {MdQuiz, MdHelp} from 'react-icons/md'
import logo from './img/quizzwizz.png';
import useFetch from '../../hooks/fetch.hook';

import avatar from '../../assets/profile.png';
import { useNavigate } from 'react-router-dom'

import { googleLogout } from '@react-oauth/google';


export const Navbar = () => {

  const token = localStorage.getItem('token');
  
  const [nav, setNav] = useState(false)
  const [{apiData}] = useFetch();
  const navigate = useNavigate()

// logout handler function
function userLogout(){
  googleLogout();
  localStorage.removeItem('token');
  navigate('/login')
}





  return (
   
<div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
      {/* Left side */}
      <div className='flex items-center'>
        <div onClick={()=> setNav(!nav)} className='cursor-pointer'>
          <AiOutlineMenu size={30} />
        </div>
        <div className="mx-3">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="Bootstrap" width="100" height="75" />
    </Link>
  </div>

    {
      apiData?.role ?

        <div className=' lg:flex items-center bg-gray-200 rounded-full text-[10px]'>
          <p className='bg-black text-white rounded-full p-2'>Admin</p>
        </div>
:
        <></>

    }



      </div>

      {/* Search Input */}
      <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Search quizzes'
        />
      </div>
      {/* Cart button */}

      <div className="dropdown rounded-full ">
  <img src={apiData?.profile || avatar} className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"  alt="avatar"  width="50" height="30" />

  <ul className="dropdown-menu container-fluid" aria-labelledby="dropdownMenuButton1">
    


{     token?
    <>
    <li className='container-fluid overflow-auto text-center fw-bold' >{apiData?.firstName || apiData?.username}</li>
    {/* <li className='overflow-auto'>{apiData?.email}</li> */}
    <li><button className="btn btn-danger container-fluid text-center" onClick={userLogout}>Logout</button></li>
    </>
:
    <>
    <li><button className="btn btn-warning container-fluid" onClick={userLogout}>Login Now</button></li>
    </>
}

  </ul>
</div>


      
      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
      

      {/* Side drawer menu */}
      <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300' }>
        <AiOutlineClose
            onClick={()=> setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <div className='text-2xl p-4'>
        <Link className="navbar-brand" to="/">
      <img src={logo} alt="Bootstrap" width="100" height="75" />
    </Link>
        </div>
        <nav>
            <ul className='flex flex-col p-4 text-gray-800'>

          {
            token?
            <>


<div id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
</div>




{
  !apiData?.role ?
  <Link to="/profile"><li className='text-xl py-4 flex'><button className='btn btn-warning'> Want to be Admin?</button></li></Link>
 :<></> 
}


                <Link to="/dashboard"><li className='text-xl py-4 flex'><CgProfile size={25} className='mr-4' /> Your Profile</li></Link>
               <Link to='/examDashboard'> <li className='text-xl py-4 flex'><MdQuiz size={25} className='mr-4' />Testing</li></Link>
                <Link to='/quiz'><li className='text-xl py-4 flex'><MdHelp size={25} className='mr-4' /> Quick-Quiz</li></Link>
                <li className='text-xl py-4 flex'><AiFillTag size={25} className='mr-4' /> Promotions</li>
                

                </>

:
              <div>please login to access the content</div>
          }

                {
                  token?
                  <Link to="/login"><li onClick={userLogout} className='text-xl py-4 flex'><CgLogOut size={25} className='mr-4' /> Logout</li></Link>
                  :
                <Link to="/login"><li onClick={userLogout} className='text-xl py-4 flex'><CgLogOut size={25} className='mr-4' /> Login/signup</li></Link>

                }
            </ul>
        </nav>
      </div>
    </div>


  )
}
