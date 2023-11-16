import React, { useState, useEffect } from 'react';

function Timer({ timeLimit, onTimeExpired }) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(Timer);
      onTimeExpired(); // Callback function to handle time expiration
    }
  }, [timeLeft, onTimeExpired]);

  // Format timeLeft into minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <p>Time Left: {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
    </div>
  );
}

export default Timer;
