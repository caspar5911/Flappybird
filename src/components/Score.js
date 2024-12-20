// src/components/Score.js
import React from 'react';

const Score = ({ score }) => (
  <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '24px' }}>
    Score: {score}
  </div>
);

export default Score;
