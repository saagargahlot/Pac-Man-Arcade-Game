import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Direction } from '../types';

interface ControlsProps {
  onInput: (dir: Direction) => void;
}

export const Controls: React.FC<ControlsProps> = ({ onInput }) => {
  const btnClass = "w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center active:bg-gray-700 touch-manipulation border-2 border-gray-700";

  return (
    <div className="grid grid-cols-3 gap-2 mt-8 md:hidden">
      <div />
      <button 
        className={btnClass}
        onTouchStart={(e) => { e.preventDefault(); onInput('UP'); }}
        onMouseDown={() => onInput('UP')}
      >
        <ChevronUp size={32} className="text-white" />
      </button>
      <div />
      
      <button 
        className={btnClass}
        onTouchStart={(e) => { e.preventDefault(); onInput('LEFT'); }}
        onMouseDown={() => onInput('LEFT')}
      >
        <ChevronLeft size={32} className="text-white" />
      </button>
      <button 
        className={btnClass}
        onTouchStart={(e) => { e.preventDefault(); onInput('DOWN'); }}
        onMouseDown={() => onInput('DOWN')}
      >
        <ChevronDown size={32} className="text-white" />
      </button>
      <button 
        className={btnClass}
        onTouchStart={(e) => { e.preventDefault(); onInput('RIGHT'); }}
        onMouseDown={() => onInput('RIGHT')}
      >
        <ChevronRight size={32} className="text-white" />
      </button>
    </div>
  );
};
