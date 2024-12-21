export const checkCollision = (birdX, birdY, birdWidth, birdHeight, pipes, screenHeight) => {
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    
    // Pipe hitbox for top and bottom pipes
    const topPipeX = pipe.x;
    // const topPipeY = 0;
    const topPipeWidth = 80; // Pipe width (same for both pipes)
    const topPipeHeight = pipe.gapPosition;
    
    const bottomPipeX = pipe.x;
    const bottomPipeY = pipe.gapPosition + 200; // Fixed gap
    const bottomPipeWidth = 100; // Pipe width (same for both pipes)
    // const bottomPipeHeight = screenHeight - pipe.gapPosition - 200; // Bottom pipe height

    // Check if the bird is colliding with the top pipe
    if (
      birdX + birdWidth > topPipeX &&
      birdX < topPipeX + topPipeWidth &&
      birdY < topPipeHeight
    ) {
      return true; // Collision with top pipe
    }

    // Check if the bird is colliding with the bottom pipe
    if (
      birdX + birdWidth > bottomPipeX &&
      birdX < bottomPipeX + bottomPipeWidth &&
      birdY + birdHeight > bottomPipeY
    ) {
      return true; // Collision with bottom pipe
    }
  }

  // Check if the bird is hitting the ground or ceiling
  if (birdY + birdHeight >= screenHeight || birdY <= 0) {
    return true; // Collision with the ground or top of the screen
  }

  return false; // No collision
};
