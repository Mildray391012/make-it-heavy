import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { AgentStatus } from '../App';
import { clsx } from 'clsx';

interface AgentProgressProps {
  agents: AgentStatus[];
  startTime: Date | null;
}

export const AgentProgress: React.FC<AgentProgressProps> = ({ agents, startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: AgentStatus['status']) => {
    switch (status) {
      case 'queued':
        return <div className="w-4 h-4 border-2 border-slate-500 rounded-full" />;
      case 'initializing':
        return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = (status: AgentStatus['status']) => {
    switch (status) {
      case 'queued':
        return 'text-slate-400';
      case 'initializing':
        return 'text-yellow-400';
      case 'processing':
        return 'text-blue-400';
      case 'completed':
        return 'text-green-400';
      case 'failed':
        return 'text-red-400';
    }
  };

  const createProgressBar = (status: AgentStatus['status']) => {
    const baseClasses = "h-1 rounded-full transition-all duration-500";
    
    switch (status) {
      case 'queued':
        return <div className={clsx(baseClasses, "bg-slate-600")} />;
      case 'initializing':
        return (
          <div className={clsx(baseClasses, "bg-gradient-to-r from-yellow-400 to-yellow-600")}>
            <div className="h-full bg-yellow-300 rounded-full animate-pulse" style={{ width: '30%' }} />
          </div>
        );
      case 'processing':
        return (
          <div className={clsx(baseClasses, "bg-gradient-to-r from-blue-400 to-purple-500")}>
            <div className="h-full bg-blue-300 rounded-full animate-pulse" style={{ width: '70%' }} />
          </div>
        );
      case 'completed':
        return <div className={clsx(baseClasses, "bg-gradient-to-r from-green-400 to-emerald-500")} />;
      case 'failed':
        return <div className={clsx(baseClasses, "bg-gradient-to-r from-red-400 to-red-600")} />;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            HEAVY MODE
          </span>
        </h3>
        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-4 h-4" />
          <span className="font-mono">{formatTime(elapsedTime)}</span>
        </div>
      </div>

      <div className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(agent.status)}
                <span className="font-medium text-white">
                  AGENT {agent.id.toString().padStart(2, '0')}
                </span>
                <span className={clsx("text-sm font-medium uppercase", getStatusColor(agent.status))}>
                  {agent.status}
                </span>
              </div>
            </div>
            
            {createProgressBar(agent.status)}
            
            {agent.question && (
              <p className="text-sm text-slate-400 ml-7 italic">
                "{agent.question}"
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
        <p className="text-sm text-slate-300">
          <span className="text-purple-400 font-semibold">Heavy Mode:</span> Running {agents.length} specialized agents in parallel 
          for comprehensive multi-perspective analysis. Each agent approaches your query from a different analytical angle.
        </p>
      </div>
    </div>
  );
};