import { Configuration, OpenAIApi } from 'openai';
import { OpenAIStream, StreamingTextResponse } from '@vercel/ai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `You are an AI business analyst. Analyze the following business idea and provide insights on market trends, competition, and potential profitability. Format your response in JSON with the following structure:
        {
          "marketAnalysis": "Your analysis of market trends",
          "competitorInsights": "Your insights on existing competitors",
          "profitabilityEstimation": "Your estimation of potential profitability",
          "overallAssessment": "Your overall assessment of the business idea"
        }`
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}