import React from 'react';
import { Ghost as GhostIcon } from 'lucide-react';
import { Player, Ghost } from '../types';
import { TILE_SIZE, GHOST_COLORS, GAME_SPEED } from '../utils/constants';

interface EntityProps {
  type: 'PLAYER' | 'GHOST';
  data: Player | Ghost;
}

export const Entity: React.FC<EntityProps> = ({ type, data }) => {
  const { x, y } = data.position;
  
  // Calculate transition duration based on entity speed
  // Player always moves at speed 1 (GAME_SPEED)
  // Ghosts move at data.speed (e.g. 0.5 = 2 * GAME_SPEED)
  const speed = data.speed || 1;
  const duration = (GAME_SPEED / speed) / 1000;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: TILE_SIZE,
    height: TILE_SIZE,
    transform: `translate(${x * TILE_SIZE}px, ${y * TILE_SIZE}px)`,
    transition: `transform ${duration}s linear`,
    zIndex: type === 'PLAYER' ? 20 : 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    willChange: 'transform',
  };

  if (type === 'PLAYER') {
    const rotation = {
      'UP': -90,
      'DOWN': 90,
      'LEFT': 180,
      'RIGHT': 0,
      'NONE': 0
    }[data.direction];

    return (
      <div style={style}>
        <div 
          className="w-5 h-5 bg-yellow-400 rounded-full relative overflow-hidden"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Pacman Mouth */}
          <div className="absolute top-1/2 right-0 w-1/2 h-full bg-black transform -translate-y-1/2 translate-x-1/2 rotate-45 origin-left" />
          <div className="absolute top-1/2 right-0 w-1/2 h-full bg-black transform -translate-y-1/2 translate-x-1/2 -rotate-45 origin-left" />
        </div>
      </div>
    );
  }

  const ghost = data as Ghost;
  return (
    <div style={style}>
      <GhostIcon 
        size={TILE_SIZE - 2} 
        color={GHOST_COLORS[ghost.type as keyof typeof GHOST_COLORS] || 'white'} 
        fill={GHOST_COLORS[ghost.type as keyof typeof GHOST_COLORS] || 'white'}
      />
    </div>
  );
};
