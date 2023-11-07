import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'
import {  googleregisterUser } from '../helper/helper';
import { verifyGoogle } from '../helper/helper'



import { useLocation } from 'react-router-dom';
import styles from '../styles/Username.module.css';

//for GoogleAuth
import jwt_decode from "jwt-decode";


export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);
  const location = useLocation();

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
  


  function handleCallbackResponse(res){
        
    // console.log("Encoded jwt id token " + res.credential);
    var userObject = jwt_decode(res.credential);
    console.log(userObject);
    // setUser(userObject);

   
    const googlecredentials = {
      username : userObject.email,
      email : userObject.email,
      profile : userObject.picture,
      firstName : userObject.name,
    }



      let registerPromise = googleregisterUser(googlecredentials);

      toast.promise(registerPromise, {
        loading: 'Checking...',
        success : <b>registered Successfully...!</b>,
        error : <b>registration Failed</b>
      });
      registerPromise.then(
        
        function(){ 
          navigate('/')});
          let username = googlecredentials.username;
          let loginPromise = verifyGoogle({ username})
          toast.promise(loginPromise, {
            loading: 'Checking...',
            success : <b>Login Successfully...!</b>,
            error : <b>login failed</b>
          });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/')
      })
      
    document.getElementById('signInDiv').hidden=true;
  }





  useEffect(()=>{
    if (location.pathname === '/login') {
    /* global google */ 
    google.accounts.id.initialize({
      client_id: "35173665291-tqsaugfjn3i4es5mcltbmtbluqlepnv3.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {theme : "outline",size: "large", text: "Sign in with Google"}
    );
    google.accounts.id.prompt();
   
  }
  return () => {
    // Perform cleanup if necessary
  };
    // eslint-disable-next-line
  },[location.pathname]);




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
              
              <div className="textbox flex flex-col items-center gap-6 my-3">

              <div id='signInDiv'></div>

              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>

      </div>
    </div>
  
  )
}
