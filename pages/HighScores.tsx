import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';

export const HighScores: React.FC = () => {
  const navigate = useNavigate();
  const highScore = localStorage.getItem('pacman_highscore') || '0';

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
        <div className="flex items-center justify-center mb-8">
          <Trophy size={48} className="text-yellow-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-center text-white mb-8">HIGH SCORES</h2>

        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-8">
          <span className="text-gray-400 font-mono">1. PLAYER</span>
          <span className="text-yellow-400 font-mono text-xl font-bold">{highScore}</span>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={20} /> BACK TO MENU
        </button>
      </div>
    </div>
  );
};
