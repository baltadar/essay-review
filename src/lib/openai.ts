import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, calls should go through your backend
});

export async function analyzeEssay(text: string) {
  const prompt = `Analyze the following essay and provide feedback. Include:
  1. Overall score (1-10)
  2. Brief summary
  3. Detailed feedback on:
     - Structure
     - Content
     - Language
  
  Essay:
  ${text}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert essay reviewer. Provide constructive feedback in a structured format."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
  });

  // Parse the AI response
  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('No response from AI');

  // You might want to add more robust parsing here
  return {
    overallScore: 8.5, // Extract from AI response
    summary: content.split('\n')[0], // First line as summary
    items: [
      {
        category: "Structure",
        feedback: "Analysis of essay structure",
        suggestions: ["Improvement point 1", "Improvement point 2"]
      },
      // Add more categories...
    ]
  };
}