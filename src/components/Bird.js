import React from 'react';
import birdImage from '../assets/bird.png'; // Import the image

const Bird = ({ yPosition }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50px',
        top: `${yPosition}px`, // Control the bird's vertical position
        width: '40px',
        height: '40px',
        backgroundColor: 'yellow',
        backgroundImage: `url(${birdImage})`, // Use the imported image as background
        backgroundSize: 'cover', // Ensure the image covers the entire div
        borderRadius: '50%',
      }}
    />
  );
};

export default Bird;
