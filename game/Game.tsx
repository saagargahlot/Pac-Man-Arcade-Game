import React, { useEffect, useState } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { Board } from './components/Board';
import { Entity } from './components/Entity';
import { HUD } from './components/HUD';
import { Controls } from './components/Controls';
import { Pause, Play, RotateCcw, Home, Ghost } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ghostColors = ['text-red-500', 'text-cyan-400', 'text-pink-400', 'text-orange-400'];
const ghostSizes = [48, 52, 56, 60];
const animationClasses = ['animate-flicker', 'animate-flicker-slow', 'animate-flicker-fast'];

const getRandomPosition = () => {
  // Define zones: corners and edges, avoiding HUD (top) and center (game board)
  const zones = [
    // Top left corner (below HUD)
    { topRange: [25, 35], leftRange: [5, 20] },
    // Top right corner (below HUD)
    { topRange: [25, 35], leftRange: [80, 95] },
    // Bottom left corner
    { topRange: [70, 90], leftRange: [5, 20] },
    // Bottom right corner
    { topRange: [70, 90], leftRange: [80, 95] },
    // Left edge (middle)
    { topRange: [40, 65], leftRange: [5, 15] },
    // Right edge (middle)
    { topRange: [40, 65], leftRange: [85, 95] },
  ];

  const zone = zones[Math.floor(Math.random() * zones.length)];
  const top = Math.random() * (zone.topRange[1] - zone.topRange[0]) + zone.topRange[0];
  const left = Math.random() * (zone.leftRange[1] - zone.leftRange[0]) + zone.leftRange[0];

  return { top, left };
};

export const Game: React.FC = () => {
  const navigate = useNavigate();
  const {
    gameState, setGameState, score, highScore, lives, level,
    grid, player, ghosts, startGame, handleInput, appleBoostTime
  } = useGameEngine();

  const [backgroundGhosts, setBackgroundGhosts] = useState(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      ...getRandomPosition(),
      color: ghostColors[Math.floor(Math.random() * ghostColors.length)],
      size: ghostSizes[Math.floor(Math.random() * ghostSizes.length)],
      animation: animationClasses[Math.floor(Math.random() * animationClasses.length)],
      delay: Math.random() * 3,
    }))
  );

  useEffect(() => {
    startGame();
  }, [startGame]);

  // Randomly reposition ghosts every 5-10 seconds with random properties
  useEffect(() => {
    const repositionGhosts = () => {
      setBackgroundGhosts(prev =>
        prev.map(ghost => ({
          ...ghost,
          ...getRandomPosition(),
          color: ghostColors[Math.floor(Math.random() * ghostColors.length)],
          size: ghostSizes[Math.floor(Math.random() * ghostSizes.length)],
          animation: animationClasses[Math.floor(Math.random() * animationClasses.length)],
          delay: Math.random() * 3,
        }))
      );
    };

    const scheduleNext = () => {
      const randomDelay = 5000 + Math.random() * 5000; // 5-10 seconds
      return setTimeout(() => {
        repositionGhosts();
        scheduleNext();
      }, randomDelay);
    };

    const timeout = scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          handleInput('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          handleInput('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          handleInput('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          handleInput('RIGHT');
          break;
        case 'Escape':
        case 'p':
        case 'P':
          setGameState(prev => prev === 'PLAYING' ? 'PAUSED' : prev === 'PAUSED' ? 'PLAYING' : prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, setGameState]);

  if (!grid.length) return <div className="text-white">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4 select-none overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundGhosts.map(ghost => (
          <div
            key={ghost.id}
            className={`absolute ${ghost.animation} transition-all duration-[2000ms] ease-in-out`}
            style={{
              top: `${ghost.top}%`,
              left: `${ghost.left}%`,
              animationDelay: `${ghost.delay}s`,
            }}
          >
            <Ghost size={ghost.size} className={ghost.color} />
          </div>
        ))}
        {/* White dots - more subtle with opacity */}
        <div className="absolute top-[15%] left-[20%] animate-pulse opacity-20"><div className="w-2 h-2 bg-pink-200 rounded-full" /></div>
        <div className="absolute top-[35%] right-[25%] animate-pulse opacity-20" style={{ animationDelay: '1s' }}><div className="w-2 h-2 bg-pink-200 rounded-full" /></div>
        <div className="absolute bottom-[30%] left-[30%] animate-pulse opacity-20" style={{ animationDelay: '0.5s' }}><div className="w-2 h-2 bg-pink-200 rounded-full" /></div>
        <div className="absolute top-[60%] right-[35%] animate-pulse opacity-20" style={{ animationDelay: '1.5s' }}><div className="w-2 h-2 bg-pink-200 rounded-full" /></div>
        <div className="absolute bottom-[20%] left-[15%] animate-pulse opacity-20" style={{ animationDelay: '0.8s' }}><div className="w-2 h-2 bg-pink-200 rounded-full" /></div>
        <div className="absolute top-[45%] left-[40%] animate-pulse opacity-20" style={{ animationDelay: '1.2s' }}><div className="w-2 h-2 bg-pink-200 rounded-full" /></div>
        <div className="absolute bottom-[45%] right-[20%] animate-pulse opacity-20" style={{ animationDelay: '0.3s' }}><div className="w-2 h-2 bg-pink-200 rounded-full" /></div>
      </div>

      <HUD score={score} highScore={highScore} lives={lives} level={level} />

      <div className="relative">
        <Board grid={grid} />
        
        {/* Entities Layer */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <Entity type="PLAYER" data={player} />
          {ghosts.map((ghost, i) => (
            <Entity key={i} type="GHOST" data={ghost} />
          ))}
        </div>

        {/* Overlays */}
        {gameState === 'PAUSED' && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-yellow-400 mb-8">PAUSED</h2>
            <button 
              onClick={() => setGameState('PLAYING')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold mb-4 flex items-center gap-2 transition-colors"
            >
              <Play size={24} /> RESUME
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold flex items-center gap-2 transition-colors"
            >
              <Home size={24} /> QUIT
            </button>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
            <h2 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h2>
            <p className="text-2xl text-white mb-8">Final Score: <span className="text-yellow-400">{score}</span></p>
            <button 
              onClick={startGame}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full font-bold mb-4 flex items-center gap-2 transition-colors"
            >
              <RotateCcw size={24} /> TRY AGAIN
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold flex items-center gap-2 transition-colors"
            >
              <Home size={24} /> MAIN MENU
            </button>
          </div>
        )}

        {gameState === 'LEVEL_COMPLETE' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-green-400 mb-4">LEVEL COMPLETE!</h2>
            <p className="text-xl text-white animate-pulse">Get Ready...</p>
          </div>
        )}

        {gameState === 'VICTORY' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
            <h2 className="text-5xl font-bold text-yellow-400 mb-4 animate-pulse">YOU WIN!</h2>
            <p className="text-3xl text-green-400 mb-2">All Levels Complete!</p>
            <p className="text-2xl text-white mb-8">Final Score: <span className="text-yellow-400">{score}</span></p>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full font-bold mb-4 flex items-center gap-2 transition-colors"
            >
              <RotateCcw size={24} /> PLAY AGAIN
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold flex items-center gap-2 transition-colors"
            >
              <Home size={24} /> MAIN MENU
            </button>
          </div>
        )}
      </div>

      {/* Apple Boost Timer - Under game board */}
      {appleBoostTime > 0 && (
        <div className="w-full max-w-2xl mt-4 px-4">
          <div className="bg-gray-900 rounded-lg border border-green-500 p-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍎</span>
                <span className="text-green-400 font-bold text-sm">SPEED BOOST</span>
              </div>
              <span className="text-white font-mono text-lg">{appleBoostTime.toFixed(1)}s</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-yellow-400 h-full transition-all duration-100 ease-linear"
                style={{ width: `${(appleBoostTime / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-4 md:hidden">
        <button 
          onClick={() => setGameState(prev => prev === 'PLAYING' ? 'PAUSED' : 'PLAYING')}
          className="p-4 bg-gray-800 rounded-full text-white"
        >
          {gameState === 'PAUSED' ? <Play /> : <Pause />}
        </button>
      </div>

      <Controls onInput={handleInput} />
    </div>
  );
};
