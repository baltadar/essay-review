import React from 'react';
import type { FeedbackItem } from '../types/essay';

interface FeedbackDisplayProps {
  score: number;
  summary: string;
  items: FeedbackItem[];
}

export function FeedbackDisplay({ score, summary, items }: FeedbackDisplayProps) {
  return (
    <div className="mt-8 space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Overall Score</h3>
          <span className="text-2xl font-bold text-blue-600">{score}/10</span>
        </div>
        <p className="text-gray-700">{summary}</p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">{item.category}</h4>
            <p className="text-gray-700 mb-2">{item.feedback}</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {item.suggestions.map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}