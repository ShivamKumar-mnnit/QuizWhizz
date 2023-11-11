import React from 'react';



const End = () => {


  return (
    <>
    <div className="container">
      <div id="end" className="flex-center flex-column">
        <h1 id="finalScore" />
        <form>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
          <button
            type="submit"
            className="btn"
            id="saveScoreBtn"
            onclick="saveHighScore(event)"
            disabled
          >
            Save
          </button>
        </form>
        <a className="btn" href="/quick_quiz/game">Play Again</a>
        <a className="btn" href="/">Go Home</a>
      </div>
    </div>
    <script src="endscript.js"></script>
    </>
  )
}

export default End
