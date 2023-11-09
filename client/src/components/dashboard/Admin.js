import React from 'react'
import avatar from '../../assets/profile.png';
import { Navbar } from '../homepage/Navbar'
// import { Link } from 'react-router-dom'
import progress from '../homepage/img/progrees.jpg'
import styles from '../../styles/Username.module.css';

import extend from '../../styles/Profile.module.css'
import useFetch from '../../hooks/fetch.hook';

import { BiSolidEdit } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Admin = () => {





  const [{ apiData }] = useFetch();


  //to style the card elements 
    const cardStyle = {
        height: '800px', // Set a fixed height, adjust the value as needed
      };
    
      const cardBodyStyle = {
        maxHeight: '100%', // Set maximum height to 100% to enable vertical scrollbar
        overflowY: 'auto', // Enable vertical scrollbar when content overflows
      };
  return (
    <>
<Navbar/>

<div className="container-fluid">
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard
      
      {
        apiData?.role ?
        <span class="badge bg-warning text-dark mx-3">Admin</span>
        :
        <></>
      }
      
      
      
      
      
      
      </p>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-white h-40 shadow-sm">

<div className='d-flex mx-2'>

        <div>
        <label htmlFor="profile">
                    <img src={apiData?.profile || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
        </label>
        </div>



        <div className="container mx-1 my-3">

          
          
            <div className=' d-flex flex-row'>
              <h2 className='fw-bold my-1 mx-1'>Name:</h2>
              <p className='mx-1'>
                

                {
                  (!apiData?.firstName) ? 
                  <>{apiData?.username}</> :  <>{apiData?.firstName}</>
                }

                </p>

            </div> 
          
            <div className=' d-flex flex-row'>
              <h2 className='fw-bold my-1 mx-1'>Email:</h2>
              <p className='mx-1'>{apiData?.email}</p>
            </div> 
          
            <div className=' d-flex flex-row'>
              <h2 className='fw-bold my-1 mx-1'>Phone:</h2>
              <p className='mx-1'>{apiData?.mobile}</p>
            </div> 

            <div className=' d-flex flex-row'>
              <h2 className='fw-bold my-1 mx-1'>Address:</h2>
              <p className='mx-1'>{apiData?.address}</p>
            </div> 

        </div>

      <Link to='/profile'>
        <div className=" d-flex flex-row-reverse mx-1">
        edit<BiSolidEdit/>
        </div>
        </Link>

</div>


                  

        </div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-16 h-480">

    
<div className="card">
  
  <div className="card-body">
    <h5 className="card-title">Show progress here</h5>
    <img src={progress} alt="..." />
  </div>
</div>



<div className="card" style={cardStyle}>
      <div className="card-header">
        List of quizzes
      </div>
      <div className="card-body" style={cardBodyStyle}>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <h5 className="card-title">quiz 1 details</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>

</div>

</div>
    </>
  )
}

export default Admin
