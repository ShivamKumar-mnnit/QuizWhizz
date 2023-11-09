import React from 'react'
import { Link } from 'react-router-dom'
 import './styles/Main.css' 
const Main = () => {
  return (
    <>
       <div className='container align-middle'>
        <h1 className='title text-light'>Quiz Application</h1>

        <ol>
            <li className='my-1'>You will be asked 10 questions one after another.</li>
            <li className='my-1'>10 points is awarded for the correct answer.</li>
            <li className='my-1'>Each question has three options. You can choose only one options.</li>
            <li className='my-1'>You can review and change answers before the quiz finish.</li>
            <li className='my-1'>The result will be declared at the end of the quiz.</li>
        </ol>

        <form id="form">
            {/* <input ref={inputRef} className="userid" type="text" placeholder='Username*' /> */}
        </form>

        <div className='start'>
            {/* <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link> */}
        </div>
          <Link to="/questions"><button>Questions</button></Link> 
          <Link to="/quiz"><button>Quiz</button></Link> 
          <Link to="/result"><button>Result</button></Link> 
          <Link to="/resultTable"><button>ResultTable</button></Link> 
    </div>
    </>
  )
}

export default Main
