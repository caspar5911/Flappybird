import React from 'react';

const Pipe = ({ xPosition, gapPosition, screenHeight, screenWidth }) => {
  const gap = 200; // Set gap to a fixed value
  const pipeWidth = screenWidth * 0.1; // Pipe width as 10% of screen width
  const topPipeHeight = gapPosition; // Dynamic height based on gap position
  const bottomPipeHeight = screenHeight - gap - topPipeHeight; // Bottom pipe height adjusted to gap

  return (
    <>
      {/* Top Pipe */}
      <div
        style={{
          position: 'absolute',
          left: `${xPosition}px`, // Pipe position
          width: `${pipeWidth}px`, // Dynamic width
          height: `${topPipeHeight}px`, // Dynamic height based on gap
          backgroundColor: 'green',
        }}
      />
      {/* Bottom Pipe */}
      <div
        style={{
          position: 'absolute',
          left: `${xPosition}px`, // Pipe position
          bottom: '0',
          width: `${pipeWidth}px`, // Dynamic width
          height: `${bottomPipeHeight}px`, // Dynamic height based on gap
          backgroundColor: 'green',
        }}
      />
    </>
  );
};

export default Pipe;
