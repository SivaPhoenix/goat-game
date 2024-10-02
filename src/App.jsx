import React, { useState, useEffect } from 'react';
import goatImg from './assets/goat.png';
import leafImg from './assets/leaf.png';
import bikeImg from './assets/bike.png';

function App() {
  const [goatPosition, setGoatPosition] = useState(125);
  const [leafPosition, setLeafPosition] = useState({ top: -50, left: 0 });
  const [bikePosition, setBikePosition] = useState({ top: -50, left: 0 });
  const [score, setScore] = useState(0);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      moveObject(leafPosition, setLeafPosition);
      moveObject(bikePosition, setBikePosition);
      checkCollision();
    }, 20);

    return () => clearInterval(gameInterval);
  }, [leafPosition, bikePosition]);

  const moveObject = (position, setPosition) => {
    if (position.top >= 600) {
      setPosition({ top: -50, left: Math.random() * 270 });
    } else {
      setPosition({ top: position.top + 5, left: position.left });
    }
  };

  const checkCollision = () => {
    const goatElement = document.querySelector('.goat');
    const leafElement = document.querySelector('.leaf');
    const bikeElement = document.querySelector('.bike');

    const goatRect = goatElement.getBoundingClientRect();
    const leafRect = leafElement.getBoundingClientRect();
    const bikeRect = bikeElement.getBoundingClientRect();

    if (
      goatRect.left < leafRect.right &&
      goatRect.right > leafRect.left &&
      goatRect.top < leafRect.bottom &&
      goatRect.bottom > leafRect.top
    ) {
      setScore(score + 1);
      setLeafPosition({ top: -50, left: Math.random() * 270 });
    }

    if (
      goatRect.left < bikeRect.right &&
      goatRect.right > bikeRect.left &&
      goatRect.top < bikeRect.bottom &&
      goatRect.bottom > bikeRect.top
    ) {
      alert('Game Over! Your Score: ' + score);
      window.location.reload();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft' && goatPosition > 0) {
      setGoatPosition(goatPosition - 20);
    } else if (e.key === 'ArrowRight' && goatPosition < 250) {
      setGoatPosition(goatPosition + 20);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [goatPosition]);

  return (
    <div className="h-screen bg-gray-300 flex flex-col items-center">
      <div className="game-area relative w-[300px] h-[600px] border-4 border-black overflow-hidden bg-gray-800">
        {/* Goat element */}
        <div
          className="goat absolute bottom-[20px] transition-all"
          style={{ left: `${goatPosition}px` }}
        >
          <img
            src={goatImg}
            alt="Goat"
            className="w-[50px] h-[80px]" // Explicit width and height
          />
        </div>

        {/* Leaf element */}
        <div
          className="leaf absolute w-[70px] h-[150px]"
          style={{ top: `${leafPosition.top}px`, left: `${leafPosition.left}px` }}
        >
          <img src={leafImg} alt="Leaf" />
        </div>

        {/* Bike element */}
        <div
          className="bike absolute w-[70px] h-[150px]"
          style={{ top: `${bikePosition.top}px`, left: `${bikePosition.left}px` }}
        >
          <img src={bikeImg} alt="Bike" />
        </div>
      </div>

      {/* Score display */}
      <div className="score mt-4 text-white bg-gray-900 px-4 py-2 rounded">
        Score: <span>{score}</span>
      </div>
    </div>
  );
}

export default App;
