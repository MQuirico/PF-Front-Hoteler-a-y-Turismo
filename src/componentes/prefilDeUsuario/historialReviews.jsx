import React, { useState, useEffect } from 'react';
import './historialReviews.css';

const ReviewsHistory = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 8); // Hora argentina 06:08 AM
    if (now.getTime() > targetDate.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1); // Avanza al día siguiente si la hora actual ya pasó
    }
    const difference = targetDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div style={{
        border: "1px solid black",
        marginTop: "100px",
        height: "720px",
        width: "850px",
        marginLeft: "300px",
        borderRadius: "10px",
        backgroundColor: "#ffffff4f", 
        boxShadow: "0 0 9px rgba(0, 0, 0, 0.7)", 
        marginBottom: "50px"
      }}>
      <div className="countdown-timer">
        <h2>Próximamente</h2>
        <div className="icon-container">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div className="timer">
          {timerComponents.length ? timerComponents : <span>¡Se acabó el tiempo!</span>}
        </div>
      </div>
    </div>
  );
};

export default ReviewsHistory;