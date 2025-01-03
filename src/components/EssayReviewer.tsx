import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { analyzeEssay } from '../lib/openai';
import { FeedbackDisplay } from './FeedbackDisplay';
import type { EssayFeedback } from '../types/essay';

export function EssayReviewer() {
  const [essay, setEssay] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<EssayFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!essay.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeEssay(essay);
      setFeedback(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze essay');
      console.error('Error analyzing essay:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Essay Reviewer</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="essay" className="block text-sm font-medium text-gray-700 mb-2">
              Paste your essay here
            </label>
            <textarea
              id="essay"
              rows={10}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Enter your essay text here..."
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !essay.trim()}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="mr-2" size={20} />
                Analyze Essay
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {feedback && <FeedbackDisplay 
          score={feedback.overallScore}
          summary={feedback.summary}
          items={feedback.items}
        />}
      </div>
    </div>
  );
}