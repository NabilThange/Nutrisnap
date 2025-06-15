import { NextResponse } from 'next/server';

const API_KEY = process.env.USDA_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fdcId = searchParams.get('fdcId');

  if (!fdcId) return NextResponse.json({ error: 'Missing fdcId' }, { status: 400 });

  const detailRes = await fetch(
    `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${API_KEY}`
  );

  const data = await detailRes.json();

  if (!data) {
    return NextResponse.json({ error: 'Food details not found' }, { status: 404 });
  }

  const nutrients = {
    calories: data.labelNutrients?.calories?.value || 0,
    protein: data.labelNutrients?.protein?.value || 0,
    fat: data.labelNutrients?.fat?.value || 0,
    carbs: data.labelNutrients?.carbohydrates?.value || 0,
    fiber: data.labelNutrients?.fiber?.value || 0
  };

  return NextResponse.json({
    name: data.description,
    fdcId: data.fdcId,
    servingSize: data.servingSize || 100,
    servingUnit: data.servingSizeUnit || 'g',
    nutrition: nutrients
  });
} 