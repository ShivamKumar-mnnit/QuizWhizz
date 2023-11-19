import React, { useRef } from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../../redux/quiz/result_reducer'
import './Home.css';
import useFetch from '../../hooks/fetch.hook';
import { useParams, useNavigate } from 'react-router-dom'


export default function Main () {
  const token = localStorage.getItem('token');
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const [{ apiData }] = useFetch();
    

    function startQuiz(){
            dispatch(setUserId(apiData?.firstName || apiData?.email))
    }

    const params = useParams();
    const id = params;

    useEffect(() => {
      getExams();
      // eslint-disable-next-line
  }, [])

    const getExams = async () => {
      console.log(id);
      const { data } = await axios.get(`http://localhost:8080/exam/exam/${id.id}`,{ headers: { Authorization: `Bearer ${token}` } });
      
      console.log(data);
      
  }


  return (
    <>
       <div className='container backgroundimagesetter fw-bold text-center'>
   
        <h1 className='title text-danger py-4'>Quiz Application</h1>

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

        <div className='start'>
            <Link className='btn btn-success' to={`/examrunning/${id.id}`}>Start Quiz</Link>
        </div>
         
        <div className="my-4">
          <Link to="/resultTable"><button className='btn btn-info my-2 mx-4'>Your Scores</button></Link> 
          <Link to="/resultTable"><button className='btn btn-info'>LeaderBoard</button></Link> 
          </div>
    </div>
    </>
  )
}

  