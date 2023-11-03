import React from 'react'
// import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

// import {GoogleLogin,GoogleOAuthProvider} from '@react-oauth/google'

//for GoogleAuth
// import jwt_decode from "jwt-decode";

import styles from '../styles/Username.module.css';

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })



  // const [user,setUser] = useState({});
  
  // function handleCallbackResponse(res){
        
  //   console.log("Encoded jwt id token " + res.credential);
  //   var userObject = jwt_decode(res.credential);
  //   console.log(userObject);
  //   setUser(userObject);
  //   document.getElementById('signInDiv').hidden=true;
  // }


// function handleSignOut(event){
//     setUser({});
//     document.getElementById('signInDiv').hidden=false;
// }


  // useEffect(()=>{
  //   /* global google */ 
  //   google.accounts.id.initialize({
  //     client_id: "35173665291-tqsaugfjn3i4es5mcltbmtbluqlepnv3.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById('signInDiv'),
  //     {theme : "outline",size: "large", text: "Sign in with Google"}
  //   );
      
  //   google.accounts.id.prompt();
  // },[]);





  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>
              

              {/* <div className="textbox flex flex-col items-center gap-6 my-3">
                <div id='signInDiv'></div>
                
                {
                  Object.keys(user).length !== 0 &&
                  <button onClick={(e)=>handleSignOut(e)}>Signout</button>
                }
                {
      user && 
      <div><img src={user.picture} alt=''></img>
      <h3>{user.name}</h3>
      </div>
    }
    
    
    </div>

              {/* <div className="textbox flex flex-col items-center gap-6">
              <GoogleOAuthProvider clientId="35173665291-tqsaugfjn3i4es5mcltbmtbluqlepnv3.apps.googleusercontent.com">
              
              <GoogleLogin
              onSuccess={credentialResponse => {
                var decoded = jwt_decode(credentialResponse.credential);
                console.log(decoded);
              }}
                  onError={() => {
                  console.log('Login Failed');
               }}
               />
               </GoogleOAuthProvider>    
               
              </div> */} 


              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>

<div>

<button>login with google</button>
</div>
        </div>

      </div>
    </div>
  
  )
}
