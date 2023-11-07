import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag } from 'react-icons/ai';
import { BsFillSaveFill } from 'react-icons/bs';
import {TbTruckDelivery} from 'react-icons/tb'
import { FaWallet} from 'react-icons/fa'
import {CgLogOut} from 'react-icons/cg'
import {MdFavorite, MdHelp} from 'react-icons/md'
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
      apiData?.role===true ?

        <div className=' lg:flex items-center bg-gray-200 rounded-full text-[10px]'>
          <p className='bg-black text-white rounded-full p-2'>Admin</p>
        </div>
:
        <div></div>

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
    <li className='container-fluid overflow-auto text-center fw-bold' >{apiData?.firstName}</li>
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
                <Link to="/dashboard"><li className='text-xl py-4 flex'><TbTruckDelivery size={25} className='mr-4' /> Your Profile</li></Link>
                <li className='text-xl py-4 flex'><MdFavorite size={25} className='mr-4' /> Favorites</li>
                <li className='text-xl py-4 flex'><FaWallet size={25} className='mr-4' /> Wallet</li>
                <li className='text-xl py-4 flex'><MdHelp size={25} className='mr-4' /> Help</li>
                <li className='text-xl py-4 flex'><AiFillTag size={25} className='mr-4' /> Promotions</li>
                <li className='text-xl py-4 flex'><BsFillSaveFill size={25} className='mr-4' /> Best Ones</li>
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
