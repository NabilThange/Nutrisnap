import OpenAI from "openai";
import { NextResponse } from "next/server";

const novitaAiApiKey = process.env.NOVITA_AI_API_KEY;

if (!novitaAiApiKey) {
  throw new Error("The NOVITA_AI_API_KEY environment variable is missing or empty. Please set it in your .env.local file or deployment environment.");
}

const novitaAiClient = new OpenAI({
  apiKey: novitaAiApiKey,
  baseURL: "https://api.novita.ai/v3/openai",
});

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const response = await novitaAiClient.chat.completions.create({
      model: "qwen/qwen2.5-vl-72b-instruct",
      messages: [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: image } },
            { type: "text", text: "What food items are in this image? Provide a concise list." },
          ],
        },
      ],
      max_tokens: 100,
    });

    const foodItems = response.choices[0]?.message?.content;

    if (foodItems) {
      return NextResponse.json({ result: foodItems });
    } else {
      return NextResponse.json({ result: "No food items detected or an unexpected response was received." });
    }
  } catch (error) {
    console.error("Error in API route analyzing image:", error);
    return NextResponse.json({ error: "Failed to analyze image." }, { status: 500 });
  }
} 