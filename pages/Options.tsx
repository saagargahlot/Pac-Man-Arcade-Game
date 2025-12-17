import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, Monitor } from 'lucide-react';

export const Options: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8">OPTIONS</h2>

        <div className="space-y-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-white">
              <Volume2 className="text-gray-400" />
              <span>Sound Effects</span>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-white">
              <Monitor className="text-gray-400" />
              <span>Graphics Quality</span>
            </div>
            <span className="text-blue-400 font-bold">HIGH</span>
          </div>
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
