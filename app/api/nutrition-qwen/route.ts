import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Helper function to extract content from Novita AI response
function extractContent(data: any): string | null {
  if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
    return data.choices[0].message.content;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { foodName } = await req.json();
    console.log('[API/nutrition-qwen] Received foodName:', foodName);

    if (!foodName) {
      return NextResponse.json({ error: 'Food name is required' }, { status: 400 });
    }

    const NOVITA_AI_API_KEY = process.env.NOVITA_AI_API_KEY;
    if (!NOVITA_AI_API_KEY) {
      console.error('[API/nutrition-qwen] NOVITA_API_KEY is not set in environment variables.');
      return NextResponse.json({ error: 'NOVITA_API_KEY is not set' }, { status: 500 });
    }

    const QWEN_ENDPOINT = "https://api.novita.ai/v3/openai/chat/completions";

    const systemPrompt = `You are an expert food nutrition analyzer.\nYou will receive a food name and must output exactly one JSON object in this format:\n\n{\n  \"name\": \"<food name>\",\n  \"calories\": <number>,\n  \"protein\": <number>,\n  \"carbs\": <number>,\n  \"sugar\": <number>,\n  \"fiber\": <number>,\n  \"fat\": <number>,\n  \"confidence\": <0.0\u20131.0>\n}\n\nIf the food is a combination of things, like a sandwich, then predict what are its macros. The food may be in someone's hand, maybe in a plate, or maybe a wrapped food, so be very intelligent in your analysis. Provide numerical values for nutrition, use 0 if a specific value is not available.`;

    const userQuery = `Analyze the nutrition for: ${foodName}`;
    console.log('[API/nutrition-qwen] Qwen prompt:', systemPrompt, userQuery);

    const payload = {
      model: "qwen/qwen2.5-7b-instruct",
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: `${systemPrompt}\n\n${userQuery}` }],
        },
      ],
      stream: false,
    };

    const response = await axios.post(QWEN_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': NOVITA_AI_API_KEY,
      },
      timeout: 30000, // 30 seconds timeout
    });

    console.log('[API/nutrition-qwen] Raw Qwen API response data:', JSON.stringify(response.data, null, 2));
    const nutritionData = extractContent(response.data);
    console.log('[API/nutrition-qwen] Extracted nutritionData (after parsing):', nutritionData);

    if (nutritionData) {
      return NextResponse.json({ nutritionData });
    } else {
      return NextResponse.json({ error: 'Failed to get nutrition data from Qwen' }, { status: response.status });
    }

  } catch (error) {
    console.error('Error fetching nutrition data from Qwen:', error);
    let errorMessage = 'Failed to fetch nutrition data.';
    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = `Qwen API responded with status ${error.response.status}: ${JSON.stringify(error.response.data)}`;
      } else if (error.request) {
        errorMessage = 'No response received from Qwen API. Check network connectivity or API endpoint.';
      } else {
        errorMessage = `Error setting up Qwen API request: ${error.message}`;
      }
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 