import React from 'react';
import { User, Users } from 'lucide-react';
import { Mode } from '../App';
import { clsx } from 'clsx';

interface ModeSelectorProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-4">Select Mode</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onModeChange('single')}
          className={clsx(
            'p-4 rounded-lg border-2 transition-all duration-200 text-left',
            mode === 'single'
              ? 'border-purple-400 bg-purple-400/10 text-white'
              : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500 hover:bg-slate-700'
          )}
        >
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5" />
            <span className="font-semibold">Single Agent</span>
          </div>
          <p className="text-sm opacity-80">
            Run one intelligent agent with full tool access for straightforward tasks
          </p>
        </button>
        
        <button
          onClick={() => onModeChange('heavy')}
          className={clsx(
            'p-4 rounded-lg border-2 transition-all duration-200 text-left',
            mode === 'heavy'
              ? 'border-purple-400 bg-purple-400/10 text-white'
              : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500 hover:bg-slate-700'
          )}
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Heavy Mode</span>
            <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-xs rounded-full text-white">
              GROK HEAVY
            </span>
          </div>
          <p className="text-sm opacity-80">
            Deploy 4 parallel agents for comprehensive, multi-perspective analysis
          </p>
        </button>
      </div>
    </div>
  );
};