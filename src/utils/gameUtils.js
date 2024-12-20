export const checkCollision = (birdX, birdY, birdWidth, birdHeight, pipes, screenHeight) => {
    // Check if the bird hits the ground
    if (birdY + birdHeight >= screenHeight) return true;
  
    for (let i = 0; i < pipes.length; i++) {
      const pipe = pipes[i];
  
      // Top pipe collision
      if (
        birdX + birdWidth > pipe.x && // Bird's right side is within pipe's left side
        birdX < pipe.x + 60 && // Bird's left side is within pipe's right side
        birdY < pipe.gap // Bird is above the top pipe
      ) {
        return true; // Bird hits the top pipe
      }
  
      // Bottom pipe collision
      const bottomPipeTop = screenHeight - pipe.gap - 50; // Bottom pipe's top position
  
      if (
        birdX + birdWidth > pipe.x && // Bird's right side is within pipe's left side
        birdX < pipe.x + 60 && // Bird's left side is within pipe's right side
        birdY + birdHeight > bottomPipeTop // Bird's bottom is below the top of the bottom pipe
      ) {
        return true; // Bird hits the bottom pipe
      }
    }
  
    return false; // No collision detected
  };
  