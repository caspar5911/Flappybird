import React from 'react';

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
        borderRadius: '50%',
      }}
    />
  );
};

export default Bird;
