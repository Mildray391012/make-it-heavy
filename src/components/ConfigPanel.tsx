import React from 'react';
import { Settings, ChevronDown, ChevronUp, Key, Zap, Users, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface ConfigPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-slate-700/30 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5" />
          <span className="font-semibold">Configuration</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      <div className={clsx(
        "transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
              <Key className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-sm font-medium text-white">API Configuration</p>
                <p className="text-xs text-slate-400">Set your OpenRouter API key in config.yaml</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
              <Zap className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-white">Model Selection</p>
                <p className="text-xs text-slate-400">Currently: moonshotai/kimi-k2</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
              <Users className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-sm font-medium text-white">Parallel Agents</p>
                <p className="text-xs text-slate-400">Heavy Mode: 4 agents</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-400" />
              <div>
                <p className="text-sm font-medium text-white">Timeout Settings</p>
                <p className="text-xs text-slate-400">Task timeout: 300 seconds</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-600">
            <h4 className="text-sm font-semibold text-white mb-2">Available Tools</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">search_web</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">calculate</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">read_file</span>
              <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">write_file</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-slate-400">
              To modify settings, edit the <code className="bg-slate-700 px-1 rounded">config.yaml</code> file 
              in your project directory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};