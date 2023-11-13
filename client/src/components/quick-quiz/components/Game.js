import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


/** Custom Hook */
import { useFetchQestion } from '../../../hooks/quiz/FetchQuestions'
import { updateResult } from '../../../hooks/quiz/setResult'

import '../Home.css';
import './Game.css';


const Game = ({onChecked}) => {


  const [checked, setChecked] = useState(undefined)
  const { trace } = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);
  const [{ isLoading, apiData, serverError}] = useFetchQestion() 

  const questions = useSelector(state => state.questions.queue[state.questions.trace])
  const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(updateResult({ trace, checked}))
  // }, [checked])

  useEffect(() => {
    // Reset selected option when moving to a new question
    setChecked(undefined);
  }, [trace]);


  
  function onSelect(i){
    console.log('Selected index:', i);
      onChecked(i)
      setChecked(i)
      dispatch(updateResult({ trace, checked}))
  }

 

  
  if(isLoading) return <h3 className='text-light'>isLoading</h3>
  if(serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>

  return (
    <>
    <div className="container">
    <div id="game" className="justify-center flex-column">
      <div id="hud">
        <div id="hud-item">
          <p id="progressText" className="hud-prefix">
            Question
          </p>
          <div id="progressBar">
            <div id="progressBarFull"></div>
          </div>
        </div>
        <div id="hud-item">
          <p className="hud-prefix">
            Max.Score
          </p>
          <h1 className="hud-main-text" id="score">
            10
          </h1>
        </div>
      </div>
      <h2 id="question">What is the answer to this questions?</h2>
      <h2 id="question" className='my-2'>{questions?.question}</h2>


      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <div id={`q${i}-option`}
              className={`choice-container ${
                checked === i ? 'selected' : ''
              }`}
              onClick={() => onSelect(i)}
            >
              <p className="choice-prefix">{String.fromCharCode(65 + i)}</p>
              <p className="choice-text" data-number={i + 1}>
                {q}
              </p>
              <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
            </div>
          </li>
        ))}
      </ul>


    </div>
  </div>

  </>
  )
}

export default Game
