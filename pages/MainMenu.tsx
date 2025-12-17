import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, Settings, Ghost } from 'lucide-react';

export const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 animate-bounce duration-[2000ms]"><Ghost size={64} className="text-red-500" /></div>
        <div className="absolute bottom-20 right-20 animate-bounce duration-[3000ms]"><Ghost size={64} className="text-cyan-400" /></div>
        <div className="absolute top-1/2 left-1/4 animate-pulse"><div className="w-4 h-4 bg-pink-200 rounded-full" /></div>
        <div className="absolute bottom-1/3 right-1/3 animate-pulse delay-75"><div className="w-4 h-4 bg-pink-200 rounded-full" /></div>
      </div>

      <h1 className="text-6xl md:text-8xl font-black text-yellow-400 mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
        PAC-MAN
      </h1>
      <p className="text-red-400 text-xl mb-12 font-mono tracking-widest">REACT EDITION</p>

      <div className="flex flex-col gap-4 w-full max-w-xs z-10">
        <button 
          onClick={() => navigate('/game')}
          className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center justify-center gap-3"
        >
          <Play className="group-hover:fill-current" />
          START GAME
        </button>

        <button 
          onClick={() => navigate('/highscores')}
          className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <Trophy />
          HIGH SCORES
        </button>

        <button 
          onClick={() => navigate('/options')}
          className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <Settings />
          OPTIONS
        </button>
      </div>

      <div className="mt-16 text-gray-500 text-sm font-mono">
        © 2025 SAAGARGAHLOT ARCADE
      </div>
    </div>
  );
};
