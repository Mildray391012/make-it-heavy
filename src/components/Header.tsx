import React from 'react';
import { Brain, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="relative">
          <Brain className="w-12 h-12 text-purple-400" />
          <Zap className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Make It Heavy
        </h1>
      </div>
      
      <p className="text-slate-300 text-lg max-w-2xl mx-auto">
        A powerful multi-agent AI system that emulates <span className="text-purple-400 font-semibold">Grok Heavy</span> functionality 
        through intelligent agent orchestration
      </p>
      
      <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>OpenRouter API</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span>Multi-Agent System</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>Real-time Processing</span>
        </div>
      </div>
    </header>
  );
};