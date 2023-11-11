import React from 'react'
import '.././Home.css'


const Indexpage = () => {
  return (
    <div class="container backgroundimagesetter">
    <div id="home" class="flex-center flex-column">
      <h1>Quick Quiz</h1>
      <a class="btn" href="/game.html">Play</a>
      <a class="btn" href="/highscores.html">High Scores</a>
    </div>
  </div>
  )
}

export default Indexpage
