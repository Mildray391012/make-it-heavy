import React, { useState } from 'react';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { QueryInput } from './components/QueryInput';
import { AgentProgress } from './components/AgentProgress';
import { ResultDisplay } from './components/ResultDisplay';
import { ConfigPanel } from './components/ConfigPanel';
import { Footer } from './components/Footer';

export type Mode = 'single' | 'heavy';

export interface AgentStatus {
  id: number;
  status: 'queued' | 'initializing' | 'processing' | 'completed' | 'failed';
  question?: string;
}

function App() {
  const [mode, setMode] = useState<Mode>('heavy');
  const [isProcessing, setIsProcessing] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([]);
  const [showConfig, setShowConfig] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleSubmit = async (inputQuery: string) => {
    setQuery(inputQuery);
    setResult('');
    setIsProcessing(true);
    setStartTime(new Date());

    if (mode === 'heavy') {
      // Initialize 4 agents for heavy mode
      const initialStatuses: AgentStatus[] = Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        status: 'queued'
      }));
      setAgentStatuses(initialStatuses);

      // Simulate heavy mode processing
      await simulateHeavyMode(inputQuery, initialStatuses);
    } else {
      // Single agent mode
      await simulateSingleAgent(inputQuery);
    }

    setIsProcessing(false);
  };

  const simulateHeavyMode = async (inputQuery: string, statuses: AgentStatus[]) => {
    // Simulate question generation
    const questions = [
      `Research comprehensive information about: ${inputQuery}`,
      `Analyze and provide insights about: ${inputQuery}`,
      `Find alternative perspectives on: ${inputQuery}`,
      `Verify and cross-check facts about: ${inputQuery}`
    ];

    // Update statuses with questions
    const updatedStatuses = statuses.map((status, i) => ({
      ...status,
      question: questions[i]
    }));
    setAgentStatuses(updatedStatuses);

    // Simulate parallel processing
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        setAgentStatuses(prev => prev.map(agent => 
          agent.id === i + 1 ? { ...agent, status: 'processing' as const } : agent
        ));
      }, i * 500);

      setTimeout(() => {
        setAgentStatuses(prev => prev.map(agent => 
          agent.id === i + 1 ? { ...agent, status: 'completed' as const } : agent
        ));
      }, 2000 + i * 500);
    }

    // Simulate final result after all agents complete
    setTimeout(() => {
      setResult(`# Comprehensive Analysis: ${inputQuery}

## Executive Summary
This analysis combines insights from 4 specialized AI agents to provide a comprehensive understanding of your query.

## Key Findings

### Research Perspective (Agent 1)
Based on comprehensive research, the topic shows significant relevance and multiple dimensions worth exploring. Current data suggests various approaches and methodologies are applicable.

### Analytical Insights (Agent 2)
Deep analysis reveals underlying patterns and connections that provide valuable context. The analytical framework suggests several key considerations and implications.

### Alternative Viewpoints (Agent 3)
Alternative perspectives highlight different approaches and potential counterarguments. This diversity of viewpoints enriches the overall understanding and provides balanced insights.

### Verification & Cross-checking (Agent 4)
Fact-checking and verification processes confirm the reliability of information sources and validate key claims made in the analysis.

## Synthesis
The combined intelligence from all agents provides a robust, multi-faceted answer that addresses your query from multiple angles, ensuring comprehensive coverage and reliable insights.

## Recommendations
Based on the collective analysis, here are the key recommendations and next steps to consider...`);
    }, 3000);
  };

  const simulateSingleAgent = async (inputQuery: string) => {
    // Simulate single agent processing
    setTimeout(() => {
      setResult(`# Single Agent Response: ${inputQuery}

## Analysis
As a single intelligent agent with access to multiple tools, I've processed your query and provided a comprehensive response.

## Key Points
- Thorough research using web search capabilities
- Mathematical calculations where applicable
- File operations for data processing
- Comprehensive synthesis of information

## Conclusion
This response demonstrates the capabilities of a single agent with full tool access, providing detailed analysis and actionable insights for your query.

The agent has successfully completed the task using available tools including web search, calculator, file operations, and task completion markers.`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ModeSelector mode={mode} onModeChange={setMode} />
            
            <QueryInput 
              onSubmit={handleSubmit} 
              isProcessing={isProcessing}
              mode={mode}
            />
            
            {isProcessing && mode === 'heavy' && (
              <AgentProgress 
                agents={agentStatuses} 
                startTime={startTime}
              />
            )}
            
            {result && (
              <ResultDisplay 
                result={result} 
                mode={mode}
                startTime={startTime}
                endTime={isProcessing ? null : new Date()}
              />
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <ConfigPanel 
              isOpen={showConfig}
              onToggle={() => setShowConfig(!showConfig)}
            />
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;