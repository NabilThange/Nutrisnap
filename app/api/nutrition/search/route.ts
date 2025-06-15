import { NextResponse } from 'next/server';

const API_KEY = process.env.USDA_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';

  try {
    const searchRes = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=5&api_key=${API_KEY}`
    );

    console.log("USDA API Raw Response:", searchRes);

    if (!searchRes.ok) {
      const errorText = await searchRes.text();
      console.error(`USDA API Error: ${searchRes.status} ${searchRes.statusText}, Response: ${errorText}`);
      return NextResponse.json({ error: `Failed to fetch data from USDA API: ${errorText}` }, { status: searchRes.status });
    }

    let data;
    try {
      data = await searchRes.json();
      console.log("USDA API Parsed JSON Data:", data);
    } catch (jsonError) {
      const rawText = await searchRes.text();
      console.error("Error parsing USDA API JSON response:", jsonError, "Raw text:", rawText);
      return NextResponse.json({ error: "Failed to parse USDA API response" }, { status: 500 });
    }

    const results = data.foods.map((food: any) => ({
      name: food.description,
      id: food.fdcId,
      brand: food.brandOwner || '',
      serving: food.householdServingFullText || '100g',
    }));

    return NextResponse.json(results);
  } catch (fetchError) {
    console.error("Error connecting to USDA API:", fetchError);
    return NextResponse.json({ error: "Failed to connect to USDA API" }, { status: 500 });
  }
} 