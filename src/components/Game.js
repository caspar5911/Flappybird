import React, { useState, useEffect, useRef, useCallback } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import { checkCollision } from '../utils/gameUtils';

const Game = () => {
  const [birdY, setBirdY] = useState(250);
  const [birdX] = useState(50);
  const [gravity, setGravity] = useState(10);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(parseInt(localStorage.getItem('topScore')) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(null); // Countdown state
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const timeoutRef = useRef(null); // Ref to store the timeout ID

  const fixedHorizontalGap = 400;
  const fixedVerticalGap = 300;
  const pipeWidth = 80;

  const pipesRef = useRef([
    { x: 400, gapPosition: Math.random() * (screenHeight - fixedVerticalGap), passed: false },
  ]);

  const resetGame = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    setBirdY(250);
    setGravity(10);
    pipesRef.current = [
      { x: 400, gapPosition: Math.random() * (screenHeight - fixedVerticalGap), passed: false },
    ];
    setScore(0);
    startCountdown();
    setGameOver(false);
  };

  const startCountdown = () => {
    setGameStarted(false);
    let count = 3;
    setCountdown(count);
    const countdownInterval = setInterval(() => {
      count -= 1;
      if (count === 0) {
        clearInterval(countdownInterval);
        setCountdown('Start!');
        setTimeout(() => {
          setCountdown(null);
          setGameStarted(true);
        }, 1000);
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const startGame = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    startCountdown();
  };

  useEffect(() => {
    if (gameOver || !gameStarted) return;

    const gameInterval = setInterval(() => {
      setBirdY((prevY) => prevY + gravity);

      pipesRef.current = pipesRef.current.map((pipe) => ({
        ...pipe,
        x: pipe.x - 6,
      }));

      if (pipesRef.current[pipesRef.current.length - 1].x < screenWidth - fixedHorizontalGap) {
        const newPipeX = pipesRef.current[pipesRef.current.length - 1].x + fixedHorizontalGap;
        pipesRef.current.push({
          x: newPipeX,
          gapPosition: Math.random() * (screenHeight - fixedVerticalGap),
          passed: false,
        });
      }

      pipesRef.current = pipesRef.current.filter((pipe) => pipe.x + pipeWidth > 0);

      if (checkCollision(birdX, birdY, 30, 30, pipesRef.current, screenHeight)) {
        setGameOver(true);
      }

      pipesRef.current.forEach((pipe) => {
        if (!pipe.passed && pipe.x + pipeWidth < birdX) {
          pipe.passed = true;
          setScore((prevScore) => prevScore + 1);
        }
      });

      if (score > topScore) {
        setTopScore(score);
        localStorage.setItem('topScore', score);
      }
    }, 20);

    return () => clearInterval(gameInterval);
  }, [birdY, gravity, gameOver, birdX, gameStarted, score, topScore, screenHeight, screenWidth]);

  const handleAction = useCallback(() => {
    if (gameOver || !gameStarted) return;
  
    // Clear the existing timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  
    // Set gravity to -8 for the jump
    setGravity(-8);
  
    // Start a new timeout and store its ID in the ref
    timeoutRef.current = setTimeout(() => {
      setGravity(10); // Reset gravity after 300ms
    }, 200);
  }, [gameOver, gameStarted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') handleAction();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAction]);

  return (
    <div
      onTouchStart={handleAction} // Handle touch events for mobile
      onClick={handleAction} // Handle mouse clicks
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #b0e0e6 0%, #e6e6fa 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${screenWidth}px`,
          height: `${screenHeight}px`,
          backgroundColor: 'rgba(240, 255, 240, 0.8)',
          borderRadius: '20px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
      >
        {countdown && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            {countdown}
          </div>
        )}

        {!gameStarted && !gameOver && !countdown && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '32px',
              color: 'white',
            }}
          >
            <button
              onClick={startGame}
              style={{
                fontSize: '24px',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Start Game
            </button>
          </div>
        )}

        <Bird yPosition={birdY} />
        {pipesRef.current.map((pipe, index) => (
          <Pipe
            key={index}
            xPosition={pipe.x}
            gapPosition={pipe.gapPosition}
            screenHeight={screenHeight}
            screenWidth={screenWidth}
            gapSize={fixedVerticalGap}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            color: 'black',
            fontSize: '24px',
          }}
        >
          Score: {score} | Top Score: {topScore}
        </div>

        {gameOver && (
          <div>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '32px',
                color: 'black',
              }}
            >
              Game Over
            </div>
            <button
              onClick={resetGame}
              style={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '24px',
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
