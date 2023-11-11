import React from 'react';
import './score.css';

const Highscore = () => {

  return (
    <div className="container">
    <div id="highScores" className="flex-center flex-column">
      <h1 id="finalScore">High Scores</h1>
      <ul id="highScoresList"></ul>
      <a className="btn" href="/">Go Home</a>
    </div>
  </div>
  )
}

export default Highscore
