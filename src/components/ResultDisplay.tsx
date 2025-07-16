import React from 'react';
import { Clock, Copy, Download, CheckCircle } from 'lucide-react';
import { Mode } from '../App';
import { clsx } from 'clsx';

interface ResultDisplayProps {
  result: string;
  mode: Mode;
  startTime: Date | null;
  endTime: Date | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  result, 
  mode, 
  startTime, 
  endTime 
}) => {
  const [copied, setCopied] = React.useState(false);

  const executionTime = startTime && endTime 
    ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `make-it-heavy-result-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simple markdown-like rendering
  const renderResult = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold text-white mb-4 mt-6 first:mt-0">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-semibold text-purple-300 mb-3 mt-5">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-medium text-blue-300 mb-2 mt-4">
            {line.substring(4)}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-slate-300 mb-1 ml-4">
            {line.substring(2)}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-slate-300 mb-2 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-700/50 px-6 py-4 border-b border-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white">
              {mode === 'heavy' ? 'Heavy Mode Analysis Complete' : 'Single Agent Response'}
            </h3>
            {mode === 'heavy' && (
              <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-xs rounded-full text-white">
                GROK HEAVY
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {executionTime > 0 && (
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(executionTime)}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className={clsx(
                  "p-2 rounded-lg transition-all duration-200",
                  copied 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-slate-600/50 text-slate-300 hover:bg-slate-600 hover:text-white"
                )}
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
              
              <button
                onClick={handleDownload}
                className="p-2 bg-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-600 hover:text-white transition-all duration-200"
                title="Download as markdown"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="prose prose-invert max-w-none">
          {renderResult(result)}
        </div>
      </div>
    </div>
  );
};