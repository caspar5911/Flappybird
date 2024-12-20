import React, { useState, useEffect } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import { checkCollision } from '../utils/gameUtils'; // Import collision detection helper

const Game = () => {
  const [birdY, setBirdY] = useState(250); // Vertical position of the bird
  const [birdX] = useState(50); // Horizontal position of the bird (constant)
  const [birdHeight] = useState(40); // Height of the bird
  const [birdWidth] = useState(40); // Width of the bird
  const [gravity, setGravity] = useState(2); // Gravity effect
  const [pipes, setPipes] = useState([{ x: 200, gap: 300 }]); // Initial pipe
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const screenHeight = window.innerHeight; // Dynamic screen height

  // Move pipes and apply gravity
  useEffect(() => {
    if (gameOver) return;

    const gameInterval = setInterval(() => {
      setBirdY((prevY) => prevY + gravity); // Apply gravity to bird

      // Move pipes leftward and check for new pipe generation
      setPipes((prevPipes) => {
        const updatedPipes = prevPipes.map((pipe) => ({
          ...pipe,
          x: pipe.x - 2, // Move pipes left
        }));

        // Add new pipe
        if (updatedPipes[updatedPipes.length - 1].x < 150) {
          updatedPipes.push({ x: 400, gap: Math.random() * 200 + 100 });
        }

        // Remove off-screen pipes
        return updatedPipes.filter((pipe) => pipe.x > 0);
      });

      // Check for collisions
      if (checkCollision(birdX, birdY, birdWidth, birdHeight, pipes, screenHeight)) {
        setGameOver(true); // End game on collision
      }

      // Increment score for every pipe passed
      setScore((prevScore) => {
        return pipes.some((pipe) => pipe.x < 50) ? prevScore + 1 : prevScore;
      });
    }, 20);

    return () => clearInterval(gameInterval); // Clean up interval on component unmount
  }, [birdY, gravity, pipes, gameOver, birdX, birdWidth, birdHeight, screenHeight]);

  const handleJump = () => {
    if (gameOver) return;
    setGravity(-4); // Jump the bird
    setTimeout(() => setGravity(2), 200); // Reset gravity after jump
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ') { // Spacebar for jump
      handleJump();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: `${screenHeight}px`,
        backgroundColor: 'skyblue',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Bird yPosition={birdY} />
      {pipes.map((pipe, index) => (
        <Pipe key={index} xPosition={pipe.x} gap={pipe.gap} />
      ))}
      <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '24px' }}>
        Score: {score}
      </div>
      {gameOver && (
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
          Game Over
        </div>
      )}
    </div>
  );
};

export default Game;