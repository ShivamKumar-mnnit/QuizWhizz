import React, { useState, useEffect } from 'react';


const Highscore = () => {

  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const storedHighScores = JSON.parse(localStorage.getItem('highScores')) || [];
    setHighScores(storedHighScores);
  }, []);


  return (
    <div class="container">
    <div id="highScores" class="flex-center flex-column">
      <h1 id="finalScore">High Scores</h1>
      <ul id="highScoresList"></ul>
      <a class="btn" href="/">Go Home</a>
    </div>
  </div>
  )
}

export default Highscore
