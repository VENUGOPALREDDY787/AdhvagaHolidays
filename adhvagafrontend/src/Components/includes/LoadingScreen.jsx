import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000;
    let frameId = null;

    const updatePercentage = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      const progress = Math.min(elapsed / duration, 1);
      setPercentage(Math.floor(progress * 100));

      if (progress < 1) {
        frameId = requestAnimationFrame(updatePercentage);
      }
    };

    updatePercentage();

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="loading-page">
      <div className="bg-gradient"></div>
      <div className="noise"></div>

      <div className="loading-container">
        <h1 className="brand-name">
          <span className="word">
            <span className="letter">A</span>
            <span className="letter">d</span>
            <span className="letter">h</span>
            <span className="letter">v</span>
            <span className="letter">a</span>
            <span className="letter">g</span>
            <span className="letter">a</span>
          </span>
          <span className="word">
            <span className="letter">H</span>
            <span className="letter">o</span>
            <span className="letter">l</span>
            <span className="letter">i</span>
            <span className="letter">d</span>
            <span className="letter">a</span>
            <span className="letter">y</span>
            <span className="letter">s</span>
          </span>
        </h1>

        <div className="decorative-line"></div>

        <p className="tagline">Your Journey Begins Here</p>

        <div className="spinner-container">
          <div className="spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
        </div>

        <div className="percentage">
          <span>{percentage}</span>%
        </div>

        <div className="loading-progress" aria-hidden="true">
          <span style={{ width: `${percentage}%` }} />
        </div>
        <p className="loading-label">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;