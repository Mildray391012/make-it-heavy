import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Mode } from '../App';

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isProcessing: boolean;
  mode: Mode;
}

export const QueryInput: React.FC<QueryInputProps> = ({ onSubmit, isProcessing, mode }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isProcessing) {
      onSubmit(query.trim());
    }
  };

  const placeholders = {
    single: "Ask me anything... I'll use my tools to help you.",
    heavy: "Enter your query for comprehensive multi-agent analysis..."
  };

  const examples = {
    single: [
      "Research the latest developments in AI",
      "Calculate the compound interest on $10,000",
      "Analyze this data file for trends"
    ],
    heavy: [
      "Who is Pietro Schirano and what are his contributions?",
      "Analyze the impact of AI on software development in 2024",
      "Create a comprehensive business plan for an AI startup"
    ]
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholders[mode]}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
            rows={3}
            disabled={isProcessing}
          />
          
          <button
            type="submit"
            disabled={!query.trim() || isProcessing}
            className="absolute bottom-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-400">Examples:</span>
          {examples[mode].map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setQuery(example)}
              disabled={isProcessing}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {example}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};