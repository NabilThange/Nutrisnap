"use client"

import { useState } from 'react';

export default function RecognizePage() {
  const [image, setImage] = useState<string | null>(null);
  const [food, setFood] = useState(null);

  const handleSubmit = async () => {
    const res1 = await fetch('/api/recognize', {
      method: 'POST',
      body: JSON.stringify({ image }),
    });
    const { foodLabel } = await res1.json();

    const res2 = await fetch('/api/nutrition', {
      method: 'POST',
      body: JSON.stringify({ foodName: foodLabel }),
    });
    const data = await res2.json();
    setFood(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Recognize Food</h1>
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          const reader = new FileReader();
          reader.onload = () => setImage(reader.result as string);
          reader.readAsDataURL(e.target.files?.[0]!);
        }}
      />
      <button onClick={handleSubmit}>Analyze</button>

      {food && (
        <div className="mt-4">
          <h2>{food.name}</h2>
          <p>Calories: {food.nutritionPer100g.calories}</p>
          <p>Protein: {food.nutritionPer100g.protein}g</p>
          <p>Carbs: {food.nutritionPer100g.carbs}g</p>
          <p>Fat: {food.nutritionPer100g.fat}g</p>
          <p>Fiber: {food.nutritionPer100g.fiber}g</p>
        </div>
      )}
    </div>
  );
}
