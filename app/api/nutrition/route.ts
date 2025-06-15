import { type NextRequest, NextResponse } from "next/server"

// Mock Edamam API response
const mockNutritionData = (foodName: string, quantity = 1) => {
  const baseNutrition = {
    "avocado toast": { calories: 347, protein: 12, carbs: 28, fat: 22, fiber: 8 },
    "chicken salad": { calories: 520, protein: 35, carbs: 18, fat: 32, fiber: 6 },
    "greek yogurt": { calories: 180, protein: 15, carbs: 22, fat: 4, fiber: 0 },
    apple: { calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4 },
  }

  const food = foodName.toLowerCase()
  const nutrition = baseNutrition[food as keyof typeof baseNutrition] || baseNutrition["apple"]

  return {
    food: foodName,
    quantity,
    nutrition: {
      calories: Math.round(nutrition.calories * quantity),
      protein: Math.round(nutrition.protein * quantity * 10) / 10,
      carbs: Math.round(nutrition.carbs * quantity * 10) / 10,
      fat: Math.round(nutrition.fat * quantity * 10) / 10,
      fiber: Math.round(nutrition.fiber * quantity * 10) / 10,
    },
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const food = searchParams.get('food')
    const quantity = Number.parseFloat(searchParams.get('quantity') || '1')

    if (!food) {
      return NextResponse.json(
        { error: 'Food parameter is required' },
        { status: 400 }
      )
    }

    const nutritionData = mockNutritionData(food, quantity);
    return NextResponse.json(nutritionData);

  } catch (error) {
    console.error("Error in nutrition API route:", error);
    return NextResponse.json({ error: "Failed to fetch nutrition data." }, { status: 500 });
  }
}

// In a real implementation, this would call Edamam API
// const response = await fetch(`https://api.edamam

const API_KEY = process.env.USDA_API_KEY;

export async function POST(req: Request) {
  const { foodName } = await req.json();

  const searchRes = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&pageSize=1&api_key=${API_KEY}`
  );

  const searchData = await searchRes.json();
  const foodItem = searchData.foods?.[0];

  if (!foodItem) {
    return NextResponse.json({ error: 'Food not found' }, { status: 404 });
  }

  const foodId = foodItem.fdcId;

  const detailRes = await fetch(
    `https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${API_KEY}`
  );
  const detailData = await detailRes.json();

  const nutrients: { [key: string]: any } = {};
  for (const nutrient of detailData.foodNutrients) {
    const name = nutrient.nutrientName.toLowerCase();
    if (name.includes('energy')) nutrients.calories = nutrient.value;
    else if (name.includes('protein')) nutrients.protein = nutrient.value;
    else if (name.includes('carbohydrate')) nutrients.carbs = nutrient.value;
    else if (name.includes('total lipid')) nutrients.fat = nutrient.value;
    else if (name.includes('fiber')) nutrients.fiber = nutrient.value;
  }

  return NextResponse.json({
    foodId,
    name: detailData.description,
    nutritionPer100g: nutrients,
    measures: detailData.householdServingFullText || '100g',
    image: '/placeholder.jpg' // USDA doesn't provide image links
  });
}
