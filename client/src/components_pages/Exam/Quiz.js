import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Question from './Question';
import CountDownTimer from '../../components_pages/elements/CountDownTimer';
import { useParams } from 'react-router-dom';

export default function Quiz() {


  const { state } = useLocation();
  const userexamid = state?.userexamid;
  console.log(userexamid);

  const token = localStorage.getItem('token');
  const [time, setTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionMarks,setQuestionMarks] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState('');
  const [selected, setSelected] = useState();
  const [examReview, setExamReview] = useState([]);
  const [qt,setQt]=useState("");


  const params = useParams();
  const id = params;

  useEffect(() => {
    getExams();
  }, []);

  const getExams = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/exam/exam/${id.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(data.examQuestions);
      setTime(data.time);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  console.log(selected);
console.log(correct);
console.log(questionMarks);


const handleReview = () => {
 
    const userOptions = {
      examReview: {
        qAnswers: selected,
        qCorrect: correct,
        qTitle: qt,
      }
    };
    console.log(userOptions)
    axios.put(`http://localhost:8080/userexams/${userexamid}`, userOptions,{ headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });
  
}

  const handleNextQuestion = () => {
    handleReview();
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (loading) {
    return <>Loading...</>;
  }

  const hoursMinSecs = { hours: 0, minutes: time, seconds: 0 };







  return (
    <div className="container backgroundimagesetter">
      <CountDownTimer hoursMinSecs={hoursMinSecs} />
      <h1 className="title text-dark text-center mt-5 mb-4">Quiz Application</h1>
      {currentQuestionIndex < questions.length ? (
        <div className="text-center">
          <Question
            qid={questions[currentQuestionIndex]}
            qno={currentQuestionIndex}
            // score={score}
            // setScore={setScore}
            // qtotal={questions.length}
            selected={selected}
            setSelected={setSelected}
            correct={correct}
            setCorrect={setCorrect}
            questionMarks={questionMarks}
            setQuestionMarks={setQuestionMarks}
            qt={qt}
            setQt={setQt}
          />
          <div className="text-center mt-4 py-3">
            <button className="btn btn-success" onClick={handleNextQuestion}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4 py-3">
          <p>All questions answered!</p>
          <button className="btn btn-success">Submit</button>
        </div>
      )}
    </div>
  );
}
