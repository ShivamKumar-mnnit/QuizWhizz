import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Question  from './Question.js';

import { useParams } from 'react-router-dom'

export default function Quiz() {
    const token = localStorage.getItem('token');
    const [time, setTime] = useState(0);
    const [questionIndex,setQuestionsIndex]= useState();
    const [loading,setLoading]= useState(true);
    const [score,setScore]= useState(0);


  

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExams();
    }, [])
  
    //   const getExams = async () => {
    //     console.log(id);
    //     const { data } = await axios.get(`http://localhost:8080/exam/exam/${id.id}`,{ headers: { Authorization: `Bearer ${token}` } });
    //     setQuestionsIndex(data.examQuestions);
    // }

    const getExams = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/exam/exam/${id.id}`, { headers: { Authorization: `Bearer ${token}` } });
            setQuestionsIndex(data.examQuestions);
            setTime(data.time);
            setLoading(false); // Once the data is fetched, set loading to false
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false); // In case of an error, also set loading to false
        }
    }

    if(loading){
        return <>loading...</>
    }

    console.log(questionIndex);
    console.log(time);


    return (
        <div className='container backgroundimagesetter'>
          <h1 className='title text-dark text-center mt-5 mb-4'>Quiz Application</h1>
          {questionIndex.map((questionId, index) => (
            <div key={index} className='text-center'>
                {console.log(questionId)}
              <Question qid={questionId} qno={index} score={score} setScore={setScore} qtotal={questionIndex.length} />
            </div>
          ))}
          <div className='d-flex justify-content-between mt-3'></div>
        </div>
      );
      
}
