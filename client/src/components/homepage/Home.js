import React,{ useRef } from 'react'
import { useState, useEffect } from 'react'
import HashLoader from "react-spinners/HashLoader";
import logo from './img/quizzwizz.png'
import { Navbar } from './Navbar';
import Crousel from './Crousel';
import emailjs from '@emailjs/browser';

import styled from 'styled-components';

const Form = styled.form`
  .form-group {
    label {
      color: #000; /* Set label color to black */
      margin-bottom: 0.5rem;
      display: block;
    }

    input[type='text'],
    input[type='email'],
    textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #000; /* Set default border color to black */
      border-radius: 5px;
      transition: border-color 0.2s ease-in-out;
      /* Additional styles to handle focus */
      &:focus {
        outline: none;
        border-color: #0000ff; /* Set outline color to dark blue when focused */
      }
    }
  }
`;

const Home = () => {

    const [loading,setLoading] = useState(false)

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_zlluo81', 'template_7p7532i', form.current, 'zozF20U2SZWw5Z47D')
        .then((result) => {
            console.log('Message send');
        }, (error) => {
            console.log(error.text);
        });
        alert("Mail hasbeen send. we will try to reach you soon...")
        form.current.reset();
    };



    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            
        },3000)

    },[])

  return (
    <>
        {
            loading?

            <div className="container d-flex justify-content-center align-items-center vh-100">


            <HashLoader color="#36d7b7" size={100} />

    <div className="text-center">
        <img src={logo} className="img-fluid mb-3" alt="Logo"/>
        <h3 className="my-3">-Quiz the best, Win the Rest!</h3>
    </div>
</div>



          :
          
          
       <>
       <Navbar/>
       <Crousel/>

<h1 className='container text-center my-4'>Contact Us</h1>

       <section className="section-padding bg-light mb-4" id="contact">
                <div className="container">

<div className="row justify-content-center" data-aos="fade-down" data-aos-delay="250">
                        <div className="col-lg-8">
                            
                        <Form ref={form} onSubmit={sendEmail} className="row g-3 p-lg-5 p-4 bg-white theme-shadow ">                      
      <label>Name</label>
      <input className='btn btn-warning bg-light' type="text" name="user_name" required  placeholder='Enter your name here'/>
      <label >Email</label>
      <input className='btn btn-warning bg-light' type="email" name="user_email" required placeholder='Enter your Email'/>
      <label>Message</label>
      <textarea className='btn btn-warning bg-light' name="message" required placeholder='Description'/>
      <button type="submit" value="Send" className='btn btn-info'>Send</button>
    </Form>
                        </div>
                    </div>

                    </div>
            </section>

       </>

        
        }

<footer className="bg-dark py-4 mt-4 text-center">
  <div className="container text-light texr-center">
    <p className="display-5 mb-3">QuizzWhizz</p>
    <small className='text-white-50'>&copy; Copyright by QuizzWhizz. All rights reserved</small>
  </div>
</footer>


    </>
  )
}

export default Home
