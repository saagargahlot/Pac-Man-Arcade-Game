import React from 'react';
import { Heart } from 'lucide-react';

interface HUDProps {
  score: number;
  highScore: number;
  lives: number;
  level: number;
}

export const HUD: React.FC<HUDProps> = ({ score, highScore, lives, level }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-2xl mb-4 px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 text-white font-mono">
      <div className="flex flex-col">
        <span className="text-xs text-gray-400">SCORE</span>
        <span className="text-xl font-bold text-yellow-400">{score}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-400">HIGH SCORE</span>
        <span className="text-xl font-bold text-white">{highScore}</span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-400">LEVEL {level}</span>
        <div className="flex gap-1 mt-1">
          {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
            <Heart key={i} size={16} className="text-red-500 fill-red-500" />
          ))}
        </div>
      </div>
    </div>
  );
};
