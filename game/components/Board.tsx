import React from 'react';
import { TileType } from '../types';
import { TILE_SIZE, WALL, DOT, PELLET, GATE, APPLE } from '../utils/constants';

interface BoardProps {
  grid: TileType[][];
}

export const Board: React.FC<BoardProps> = ({ grid }) => {
  if (!grid.length) return null;

  const width = grid[0].length * TILE_SIZE;
  const height = grid.length * TILE_SIZE;

  return (
    <div 
      className="relative bg-black border-2 border-blue-900 rounded-lg shadow-[0_0_20px_rgba(0,0,255,0.3)]"
      style={{ width, height }}
    >
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.map((tile, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {tile === WALL && (
                <div className="w-full h-full bg-blue-900/30 border border-blue-800 rounded-sm" />
              )}
              {tile === DOT && (
                <div className="w-1.5 h-1.5 bg-pink-200 rounded-full" />
              )}
              {tile === PELLET && (
                <div className="w-3 h-3 bg-pink-100 rounded-full animate-pulse" />
              )}
              {tile === GATE && (
                <div className="w-full h-1 bg-pink-900 mt-auto mb-auto" />
              )}
              {tile === APPLE && (
                <div className="text-lg">🍎</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
