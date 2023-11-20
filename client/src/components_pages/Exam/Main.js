import React, { useRef } from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './Home.css';
import useFetch from '../../hooks/fetch.hook';
import { useParams, useNavigate } from 'react-router-dom'


export default function Main ({CUId}) {
  const token = localStorage.getItem('token');
    const inputRef = useRef(null)
    const [{ apiData }] = useFetch();
    

    

    const params = useParams();
    const id = params;


    
  const navigate = useNavigate();

 





    useEffect(() => {
      getExams();
      // eslint-disable-next-line
  }, [])

    const getExams = async () => {
      console.log(id);
      const { data } = await axios.get(`http://localhost:8080/exam/exam/${id.id}`,{ headers: { Authorization: `Bearer ${token}` } });
      
      console.log(data);
      
  }
  

  if(!CUId){
    return(
  <>loading...</>
    )
  }


  const startQuiz = async () => {
    const userId = CUId; // Assuming this is where your userId is stored
    const examId = id.id; // Extracted from the URL parameters
    const username = inputRef.current.value; // Assuming the username is obtained from the input field

    try {
      const response = await axios.post(
        'http://localhost:8080/userexams', // Replace with your API endpoint
        {
          userId,
          examId,
          userName: username,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Handle success, e.g., redirect to the quiz page
      console.log('Quiz started:', response.data);
      navigate(`/examrunning/${id.id}`); // Redirect to the quiz page
    } catch (error) {
      // Handle error
      console.error('Error starting quiz:', error);
    }
  };


  return (
    <>
       <div className='container backgroundimagesetter fw-bold text-center'>
   
        <h1 className='title text-danger py-4'>Exam Application</h1>

        <ol>
            <li>You will be asked 10 questions one after another.</li>
            <li>10 points is awarded for the correct answer.</li>
            <li>Each question has three options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the quiz.</li>
        </ol>
        
        <form id="form" className='my-4 text-center'>
            <input ref={inputRef} className="userid text-center" type="text" placeholder='Username*' defaultValue={apiData?.firstName || apiData?.username}
             readOnly/>
        </form>

        <div className='start my-4'>
        <button className='btn btn-success my-4' onClick={startQuiz}>
          Start Quiz
        </button>
        </div>
         
       
    </div>
    </>
  )
}

  