import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserId } from '../../redux/quiz/result_reducer'
import '../quick-quiz/Home.css';




  

const Main = () => {
    const inputRef = useRef(null)
    const dispatch = useDispatch()


    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserId(inputRef.current?.value))
        }
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
        
        <form id="form">
            <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
        </form>

        <div className='start'>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>
          <Link to="/questions"><button>Questions</button></Link> 
          <Link to="/quiz"><button>Quiz</button></Link> 
          <Link to="/result"><button>Result</button></Link> 
          <Link to="/resultTable"><button>ResultTable</button></Link> 

        
    </div>
    </>
  )
}

  