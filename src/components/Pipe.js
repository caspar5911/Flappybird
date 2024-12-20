import React from 'react';

const Pipe = ({ xPosition, gap }) => {
  const screenHeight = window.innerHeight; // Dynamic screen height

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: `${xPosition}px`, // Pipe position
          width: '60px',
          height: `${gap}px`, // Top pipe size
          backgroundColor: 'green',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${xPosition}px`, // Pipe position
          bottom: '0',
          width: '60px',
          height: `${screenHeight - gap - 165}px`, // Bottom pipe size
          backgroundColor: 'green',
        }}
      />
    </>
  );
};

export default Pipe;
