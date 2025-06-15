import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { image } = await req.json(); // base64 image string

  const response = await fetch('http://localhost:5000/qwen-vl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: "Identify the food item in this image.",
      image
    })
  });

  const result = await response.json();

  return NextResponse.json({
    foodLabel: result.food || result.label || 'Unknown',
    confidence: result.confidence || 0.9 // optional
  });
}
