import React from 'react';
import { BrutalistCard, BrutalistCardContent } from './brutalist-card';

interface FoodSearchItem {
  name: string;
  id: string;
  brand: string;
  serving: string;
}

interface FoodSearchResultsListProps {
  results: FoodSearchItem[];
  onSelectFood: (id: string) => void;
}

export const FoodSearchResultsList: React.FC<FoodSearchResultsListProps> = ({ results, onSelectFood }) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 max-h-60 overflow-y-auto nutrisnap-border p-2">
      {results.map((food) => (
        <BrutalistCard
          key={food.id}
          className="p-3 bg-gray-100 nutrisnap-border-thin cursor-pointer hover:bg-gray-200 brutalist-shadow-sm transition-all duration-100 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[6px_6px_0px_0px_black]"
          onClick={() => onSelectFood(food.id)}
        >
          <BrutalistCardContent className="p-0">
            <h4 className="font-bold text-sm uppercase tracking-wider">{food.name}</h4>
            <p className="text-xs text-gray-600">{food.brand ? food.brand + ' - ' : ''}{food.serving}</p>
          </BrutalistCardContent>
        </BrutalistCard>
      ))}
    </div>
  );
}; 