import React from 'react'
import '.././Home.css'


const Indexpage = () => {
  return (
    <div class="container py-4 text-center backgroundimagesetter">
    <div id="home" class="flex-center flex-column z-100">
      <h1 className='text-danger fw-bold my-4 '>Quick Quiz</h1>
      <a class="btn btn-success" href="/quick_quiz/game">Play</a>
      <a class="btn" href="/quick_quiz/score">High Scores</a>
    </div>
  </div>
  )
}

export default Indexpage
