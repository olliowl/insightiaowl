import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set in environment variables')
    return NextResponse.json({ error: 'OpenAI API key is not configured' }, { status: 500 })
  }

  try {
    const { ideaTitle, ideaDescription, targetMarket, uniqueSellingPoint, budget } = await req.json()

    const prompt = `
      As an AI business analyst, provide a detailed evaluation of the following startup idea:

      Title: ${ideaTitle}
      Description: ${ideaDescription}
      Target Market: ${targetMarket}
      Unique Selling Point: ${uniqueSellingPoint}
      Estimated Budget: ${budget}

      Please provide a comprehensive analysis in the following categories:

      1. Market Analysis: Evaluate the potential of the target market, including size, growth trends, and customer segments. Discuss how well the idea aligns with market needs.

      2. Competitive Landscape: Analyze potential competitors, their strengths and weaknesses. Explain how the unique selling point differentiates this idea from existing solutions.

      3. Financial Projections: Based on the provided budget and market potential, offer insights on potential revenue streams, cost structures, and overall financial viability.

      4. Risks and Challenges: Identify potential obstacles and risks associated with implementing this idea. Consider market, technical, and operational challenges.

      5. Recommendations: Provide actionable advice for moving forward with this idea. Suggest potential improvements or pivots if necessary.

      For each category, provide detailed, easy-to-understand explanations that would be valuable for business people looking to start their venture. Use examples and data-driven insights where possible to support your analysis.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    })

    const response = completion.choices[0].message.content

    // Parse the response into sections
    const sections = response.split(/\d\.\s/).slice(1)
    const [marketAnalysis, competitiveLandscape, financialProjections, risksAndChallenges, recommendations] = sections

    return NextResponse.json({
      evaluation: {
        marketAnalysis,
        competitiveLandscape,
        financialProjections,
        risksAndChallenges,
        recommendations
      }
    })
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ error: 'Failed to evaluate idea', details: error.message }, { status: 500 })
  }
}