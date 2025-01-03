export interface FeedbackItem {
  category: string;
  feedback: string;
  suggestions: string[];
}

export interface EssayFeedback {
  overallScore: number;
  items: FeedbackItem[];
  summary: string;
}