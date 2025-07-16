import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-slate-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-slate-400 text-sm">
            Built with <span className="text-purple-400">Make It Heavy</span> framework by{' '}
            <span className="text-white font-semibold">Pietro Schirano</span>
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Multi-agent AI system powered by OpenRouter
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Doriandarko/make-it-heavy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
          
          <a
            href="https://openrouter.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">OpenRouter</span>
          </a>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
        <h4 className="text-sm font-semibold text-white mb-2">How to Connect Your Backend:</h4>
        <ol className="text-xs text-slate-400 space-y-1">
          <li>1. Set your OpenRouter API key in <code className="bg-slate-700 px-1 rounded">config.yaml</code></li>
          <li>2. Run <code className="bg-slate-700 px-1 rounded">python main.py</code> for single agent mode</li>
          <li>3. Run <code className="bg-slate-700 px-1 rounded">python make_it_heavy.py</code> for heavy mode</li>
          <li>4. This frontend simulates the experience - integrate with your Python backend for full functionality</li>
        </ol>
      </div>
    </footer>
  );
};