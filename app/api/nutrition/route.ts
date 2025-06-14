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
