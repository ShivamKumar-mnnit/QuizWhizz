import React, { useState, useEffect } from 'react';



const End = () => {


  const [username, setUsername] = useState('');
  const [highScores, setHighScores] = useState(
      JSON.parse(localStorage.getItem('highScores')) || []
  );
  const mostRecentScore = localStorage.getItem('mostRecentScore');

  const MAX_HIGH_SCORES = 5;

  useEffect(() => {
      // Update the final score in real-time
      document.getElementById('finalScore').innerText = mostRecentScore;
  }, [mostRecentScore]);

  const handleInputChange = (e) => {
      setUsername(e.target.value);
  };

  const saveHighScore = (e) => {
      e.preventDefault();
      const score = {
        score: mostRecentScore,
        name: username,
    };

    const updatedHighScores = [...highScores, score].sort((a, b) => b.score - a.score).slice(0, MAX_HIGH_SCORES);
    setHighScores(updatedHighScores);

    localStorage.setItem('highScores', JSON.stringify(updatedHighScores));
    window.location.assign('/');
};

  return (
    <div class="container">
      <div id="end" class="flex-center flex-column">
        <h1 id="finalScore"></h1>
        <form>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
          <button
            type="submit"
            class="btn"
            id="saveScoreBtn"
            onclick="saveHighScore(event)"
            disabled
          >
            Save
          </button>
        </form>
        <a class="btn" href="/game.html">Play Again</a>
        <a class="btn" href="/">Go Home</a>
      </div>
    </div>
  )
}

export default End
