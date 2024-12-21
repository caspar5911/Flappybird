import React from 'react';
import birdImage from '../assets/bird.png'; // Import the image

const Bird = ({ yPosition, screenHeight }) => {
  const birdHeight = 40; // Increased bird height
  const birdWidth = 40; // Increased bird width

  return (
    <div
      style={{
        position: 'absolute',
        left: '40px', // Fixed horizontal position
        top: `${yPosition}px`, // Dynamic vertical position
        width: `${birdWidth}px`, // Adjusted width
        height: `${birdHeight}px`, // Adjusted height
        backgroundColor: 'yellow',
        backgroundImage: `url(${birdImage})`, // Use the imported image as background
        backgroundSize: 'cover', // Ensure the image covers the entire div
        borderRadius: '50%',
      }}
    />
  );
};

export default Bird;
