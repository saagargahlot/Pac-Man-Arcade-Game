import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Position, Direction, TileType,
  Player, Ghost, GameStatus
} from '../types';
import {
  DIRECTIONS, OPPOSITE_DIRECTION,
  WALL, DOT, PELLET, GATE, APPLE, EMPTY,
  GAME_SPEED
} from '../utils/constants';
import { getLevel } from '../utils/levels';
import { useGameLoop } from './useGameLoop';

const INITIAL_LIVES = 2; // 1 life + 1 respawn chance

export const useGameEngine = () => {
  const [gameState, setGameState] = useState<GameStatus>('MENU');
  const [levelNum, setLevelNum] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [grid, setGrid] = useState<TileType[][]>([]);
  const [player, setPlayer] = useState<Player>({
    position: { x: 1, y: 1 },
    direction: 'NONE',
    nextDirection: 'NONE',
    speed: 1,
    lives: INITIAL_LIVES,
    score: 0,
    poweredUp: false
  });
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const [pendingGhosts, setPendingGhosts] = useState<Ghost[]>([]);
  const [appleBoostTime, setAppleBoostTime] = useState(0); // Time remaining in seconds

  const tickRef = useRef(0);

  // Load high score from local storage
  useEffect(() => {
    const saved = localStorage.getItem('pacman_highscore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('pacman_highscore', score.toString());
    }
  }, [score, highScore]);

  // Apple boost timer countdown
  useEffect(() => {
    if (appleBoostTime <= 0) return;

    const interval = setInterval(() => {
      setAppleBoostTime(prev => {
        const newTime = Math.max(0, prev - 0.1);
        if (newTime === 0) {
          // Reset player speed when timer expires
          setPlayer(p => ({ ...p, speed: 1 }));
        }
        return newTime;
      });
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, [appleBoostTime]);

  // Gradual Ghost Release for Level 2+
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const releaseInterval = 5000; // Release every 5 seconds

    const timer = setInterval(() => {
      setPendingGhosts(prev => {
        if (prev.length === 0) return prev;
        const [nextGhost, ...rest] = prev;
        setGhosts(current => [...current, nextGhost]);
        return rest;
      });
    }, releaseInterval);

    return () => clearInterval(timer);
  }, [gameState]);

  // Dynamic Ghost Release based on Score (Extra reinforcement)
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    
    const maxGhosts = 6; // Cap total ghosts
    
    if (ghosts.length + pendingGhosts.length < maxGhosts && score > (ghosts.length + pendingGhosts.length) * 1500) {
       const data = getLevel(levelNum);
       const baseGhost = data.ghosts[(ghosts.length + pendingGhosts.length) % data.ghosts.length];
       
       if (baseGhost) {
         const newGhost: Ghost = {
           ...baseGhost,
           position: baseGhost.startPos,
           direction: 'UP',
           nextDirection: 'UP',
           speed: 0.5,
           mode: 'SCATTER',
           color: ''
         };
         setGhosts(prev => [...prev, newGhost]);
       }
    }
  }, [score, ghosts.length, pendingGhosts.length, levelNum, gameState]);

  const loadLevel = useCallback((lvl: number) => {
    const data = getLevel(lvl);
    setGrid(JSON.parse(JSON.stringify(data.grid))); // Deep copy
    setPlayer(prev => ({
      ...prev,
      position: data.playerStart,
      direction: 'NONE',
      nextDirection: 'NONE'
    }));
    
    const totalGhostsForLevel = Math.min(4, lvl + 1);
    const allLevelGhosts = data.ghosts.slice(0, totalGhostsForLevel);
    
    let initialActiveCount = 0;
    if (lvl === 1) {
      initialActiveCount = 2;
    } else {
      initialActiveCount = 1;
    }

    const activeGhostsData = allLevelGhosts.slice(0, initialActiveCount);
    const pendingGhostsData = allLevelGhosts.slice(initialActiveCount);

    const ghostSpeed = 0.5; // Same speed for all levels

    setGhosts(activeGhostsData.map(g => ({
      ...g,
      position: g.startPos,
      direction: 'UP',
      nextDirection: 'UP',
      speed: ghostSpeed,
      mode: 'SCATTER',
      color: ''
    })));

    setPendingGhosts(pendingGhostsData.map(g => ({
      ...g,
      position: g.startPos,
      direction: 'UP',
      nextDirection: 'UP',
      speed: ghostSpeed,
      mode: 'SCATTER',
      color: ''
    })));

    tickRef.current = 0;
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setLevelNum(1);
    setPlayer(prev => ({ ...prev, lives: INITIAL_LIVES, score: 0 }));
    loadLevel(1);
    setGameState('PLAYING');
  }, [loadLevel]);

  const resetLevel = () => {
    const data = getLevel(levelNum);
    setPlayer(prev => ({
      ...prev,
      position: data.playerStart,
      direction: 'NONE',
      nextDirection: 'NONE'
    }));
    
    const currentCount = ghosts.length;
    const activeGhosts = data.ghosts.slice(0, currentCount);
    const ghostSpeed = 0.5; // Same speed for all levels
    
    setGhosts(activeGhosts.map(g => ({
      ...g,
      position: g.startPos,
      direction: 'UP',
      nextDirection: 'UP',
      speed: ghostSpeed,
      mode: 'SCATTER',
      color: ''
    })));
    setGameState('PLAYING');
  };

  const handleInput = useCallback((dir: Direction) => {
    if (gameState !== 'PLAYING') return;
    setPlayer(prev => ({ ...prev, nextDirection: dir }));
  }, [gameState]);

  const isValidMove = (pos: Position, dir: Direction, currentGrid: TileType[][]) => {
    let nextX = pos.x + DIRECTIONS[dir].x;
    let nextY = pos.y + DIRECTIONS[dir].y;

    // Check horizontal bounds (no wrapping)
    if (nextX < 0 || nextX >= currentGrid[0].length) return false;

    // Check vertical bounds
    if (nextY < 0 || nextY >= currentGrid.length) {
      return false;
    }

    const tile = currentGrid[nextY][nextX];
    return tile !== WALL && tile !== GATE;
  };

  const movePlayer = () => {
    setPlayer(prev => {
      let moveDir = prev.direction;

      if (prev.nextDirection !== 'NONE' && isValidMove(prev.position, prev.nextDirection, grid)) {
        moveDir = prev.nextDirection;
      }

      if (!isValidMove(prev.position, moveDir, grid)) {
        return { ...prev, direction: moveDir };
      }

      let nextX = prev.position.x + DIRECTIONS[moveDir].x;
      let nextY = prev.position.y + DIRECTIONS[moveDir].y;

      const nextPos = { x: nextX, y: nextY };

      return { ...prev, position: nextPos, direction: moveDir };
    });
  };

  const moveGhosts = () => {
    setGhosts(prevGhosts => prevGhosts.map(ghost => {
      // Speed Logic
      let shouldMove = false;
      if (ghost.speed >= 1) shouldMove = true;
      else if (ghost.speed === 0.75) shouldMove = tickRef.current % 4 !== 0;
      else if (ghost.speed === 0.5) shouldMove = tickRef.current % 2 === 0;
      
      if (!shouldMove) return ghost;

      const possibleDirs: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
      const validDirs = possibleDirs.filter(d => isValidMove(ghost.position, d, grid));

      let nextDir = ghost.direction;

      const isIntersection = validDirs.length > 2;
      const isBlocked = !isValidMove(ghost.position, ghost.direction, grid);

      if (isBlocked || (isIntersection && Math.random() < 0.3)) {
        const nonOpposite = validDirs.filter(d => d !== OPPOSITE_DIRECTION[ghost.direction]);
        if (nonOpposite.length > 0) {
          nextDir = nonOpposite[Math.floor(Math.random() * nonOpposite.length)];
        } else {
          nextDir = OPPOSITE_DIRECTION[ghost.direction];
          if (!isValidMove(ghost.position, nextDir, grid)) {
             return ghost;
          }
        }
      }

      let nextX = ghost.position.x + DIRECTIONS[nextDir].x;
      let nextY = ghost.position.y + DIRECTIONS[nextDir].y;

      if (nextX < 0 || nextX >= grid[0].length) return ghost;

      const nextPos = { x: nextX, y: nextY };

      return { ...ghost, position: nextPos, direction: nextDir };
    }));
  };

  const checkCollisions = () => {
    const { x, y } = player.position;
    const tile = grid[y][x];
    
    if (tile === DOT) {
      setScore(s => s + 10);
      setGrid(prev => {
        const newGrid = [...prev];
        newGrid[y] = [...prev[y]];
        newGrid[y][x] = EMPTY;
        return newGrid;
      });
    } else if (tile === PELLET) {
      setScore(s => s + 50);
      setGrid(prev => {
        const newGrid = [...prev];
        newGrid[y] = [...prev[y]];
        newGrid[y][x] = EMPTY;
        return newGrid;
      });
    } else if (tile === APPLE) {
      setScore(s => s + 100);
      setPlayer(prev => ({ ...prev, speed: 1.5 })); // Boost speed to 1.5x
      setAppleBoostTime(10); // Start 10 second timer
      setGrid(prev => {
        const newGrid = [...prev];
        newGrid[y] = [...prev[y]];
        newGrid[y][x] = EMPTY;
        return newGrid;
      });
    }

    const hitGhost = ghosts.find(g => g.position.x === x && g.position.y === y);
    if (hitGhost) {
      if (player.poweredUp) {
        setScore(s => s + 200);
      } else {
        handleDeath();
      }
    }

    const dotsRemaining = grid.flat().filter(t => t === DOT || t === PELLET).length;
    if (dotsRemaining === 0 && gameState === 'PLAYING') {
      handleLevelComplete();
    }
  };

  const handleDeath = () => {
    setAppleBoostTime(0); // Reset timer
    setPlayer(prev => ({ ...prev, speed: 1 })); // Reset speed
    if (player.lives > 1) {
      setPlayer(prev => ({ ...prev, lives: prev.lives - 1 }));
      setGameState('PAUSED');
      setTimeout(() => resetLevel(), 1500);
    } else {
      setGameState('GAME_OVER');
    }
  };

  const handleLevelComplete = () => {
    setAppleBoostTime(0); // Reset timer
    setPlayer(prev => ({ ...prev, speed: 1 })); // Reset speed

    // Check if level 3 is complete (final level)
    if (levelNum === 3) {
      setGameState('VICTORY');
      return;
    }

    setGameState('LEVEL_COMPLETE');
    setTimeout(() => {
      setLevelNum(prev => prev + 1);
      loadLevel(levelNum + 1);
      setGameState('PLAYING');
    }, 2000);
  };

  useGameLoop(() => {
    if (gameState === 'PLAYING') {
      tickRef.current++;
      movePlayer();
      moveGhosts();
      checkCollisions();
    }
  }, gameState === 'PLAYING' ? GAME_SPEED : null);

  return {
    gameState,
    setGameState,
    score,
    highScore,
    lives: player.lives,
    level: levelNum,
    grid,
    player,
    ghosts,
    startGame,
    handleInput,
    appleBoostTime
  };
};
