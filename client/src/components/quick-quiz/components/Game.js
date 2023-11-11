import React, { useState, useEffect } from 'react';

const Game = () => {


  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [acceptingAnswers, setAcceptingAnswers] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
      const data = await response.json();
      const formattedQuestions = data.results.map((loadedQuestion) => {
        const formattedQuestion = {
          question: loadedQuestion.question,
          choices: [...loadedQuestion.incorrect_answers, loadedQuestion.correct_answer],
        };
        formattedQuestion.choices.sort(() => Math.random() - 0.5);
        return formattedQuestion;
      });
      setQuestions(formattedQuestions);
      startGame();
    } catch (error) {
      console.error(error);
    }
  };

  const startGame = () => {
    setQuestionCounter(0);
    setScore(0);
    setCurrentQuestion(questions[0]);
    setAcceptingAnswers(true);
  };

  const checkAnswer = (selectedChoice) => {
    if (!acceptingAnswers) return;

    setAcceptingAnswers(false);
    const correctAnswer = currentQuestion.choices.indexOf(currentQuestion.choices.find(choice => choice === currentQuestion.choices[3]));

    if (selectedChoice === correctAnswer) {
      setScore(score + 10);
    }
    setTimeout(() => {
      if (questionCounter + 1 < questions.length) {
        setCurrentQuestion(questions[questionCounter + 1]);
        setQuestionCounter(questionCounter + 1);
        setAcceptingAnswers(true);
      } else {
        // Game Over: navigate to end page or display game over message
        localStorage.setItem('mostRecentScore', score);
        window.location.assign('/end.html');
      }
    }, 1000);
  };



    
  return (
    <div class="container">
      <div id="loader"></div>
      <div id="game" class="justify-center flex-column hidden">
        <div id="hud">
          <div id="hud-item">
            <p id="progressText" class="hud-prefix">
              Question
            </p>
            <div id="progressBar">
              <div id="progressBarFull"></div>
            </div>
          </div>
          <div id="hud-item">
            <p class="hud-prefix">
              Score
            </p>
            <h1 class="hud-main-text" id="score">
              0
            </h1>
          </div>
        </div>
        <h2 id="question">a</h2>
        <div class="choice-container">
          <p class="choice-prefix">A</p>
          <p class="choice-text" data-number="1"></p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">B</p>
          <p class="choice-text" data-number="2"></p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">C</p>
          <p class="choice-text" data-number="3"></p>
        </div>
        <div class="choice-container">
          <p class="choice-prefix">D</p>
          <p class="choice-text" data-number="4"></p>
        </div>
      </div>
    </div>
  )
}

export default Game
