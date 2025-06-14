"use client"

import { useState, useEffect } from "react"
import { BrutalistButton } from "@/components/ui/brutalist-button"
import {
  BrutalistCard,
  BrutalistCardContent,
  BrutalistCardDescription,
  BrutalistCardHeader,
  BrutalistCardTitle,
} from "@/components/ui/brutalist-card"
import { BrutalistBadge } from "@/components/ui/brutalist-badge"
import { BrutalistProgress } from "@/components/ui/brutalist-progress"
import { Slider } from "@/components/ui/slider"
import { Check, Edit, ArrowLeft, Zap, Target, Square } from "lucide-react"
import Link from "next/link"
import { BrutalistBottomNavigation } from "@/components/brutalist-bottom-nav"
import { BrutalistLoading } from "@/components/brutalist-loading"
import { FoodLogAnimation } from "@/components/food-log-animation"

export default function BrutalistRecognizePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [isLogging, setIsLogging] = useState(false)
  const [showLogAnimation, setShowLogAnimation] = useState(false)
  const [portion, setPortion] = useState([1])
  const [recognizedFood] = useState({
    name: "AVOCADO TOAST + POACHED EGG",
    confidence: 94,
    category: "BREAKFAST",
    baseNutrition: {
      calories: 347,
      protein: 12,
      carbs: 28,
      fat: 22,
      fiber: 8,
      sugar: 3,
    },
    portionSuggestions: [
      { name: "1 SLICE", multiplier: 1 },
      { name: "2 SLICES", multiplier: 2 },
      { name: "1/2 SLICE", multiplier: 0.5 },
    ],
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const calculateNutrition = (base: number) => {
    return Math.round(base * portion[0])
  }

  const handleLogFood = () => {
    setIsLogging(true)
    setShowLogAnimation(true)
  }

  const handleAnimationComplete = () => {
    setShowLogAnimation(false)
    setIsLogging(false)
    // Redirect to dashboard after animation
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 500)
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen brutalist-bg flex items-center justify-center pb-20">
        <BrutalistCard className="w-full max-w-md mx-4">
          <BrutalistCardContent className="p-8 text-center">
            <BrutalistLoading size="lg" text="ANALYZING FOOD..." />

            <div className="space-y-6 mt-8">
              <div className="flex items-center justify-between text-sm">
                <span className="nutrisnap-subtitle">IDENTIFYING FOOD</span>
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <BrutalistProgress value={100} className="h-4" />

              <div className="flex items-center justify-between text-sm">
                <span className="nutrisnap-subtitle">ESTIMATING PORTIONS</span>
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <BrutalistProgress value={100} className="h-4" />

              <div className="flex items-center justify-between text-sm">
                <span className="nutrisnap-subtitle">CALCULATING NUTRITION</span>
                <div className="w-5 h-5 bg-blue-500 nutrisnap-loading"></div>
              </div>
              <BrutalistProgress value={75} className="h-4" />
            </div>

            <p className="nutrisnap-body text-gray-600 mt-8">AI PROCESSING WITH COMPUTER VISION...</p>
          </BrutalistCardContent>
        </BrutalistCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen brutalist-bg pb-20">
      {/* Food Log Animation Overlay */}
      <FoodLogAnimation
        isVisible={showLogAnimation}
        onComplete={handleAnimationComplete}
        foodName={recognizedFood.name}
      />

      {/* Header */}
      <header className="bg-white nutrisnap-border-thin border-t-0 border-l-0 border-r-0 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/capture">
              <BrutalistButton variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5 mr-2" />
                BACK
              </BrutalistButton>
            </Link>
            <h1 className="nutrisnap-title text-xl">FOOD RECOGNITION</h1>
            <BrutalistButton variant="ghost" size="sm">
              <Edit className="w-5 h-5" />
            </BrutalistButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Captured Image */}
        <BrutalistCard>
          <BrutalistCardContent className="p-0">
            <div className="aspect-video overflow-hidden">
              <div className="w-full h-full bg-gray-200 nutrisnap-border flex items-center justify-center">
                <Square className="w-32 h-32 text-gray-600 fill-gray-600" />
              </div>
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Recognition Results */}
        <BrutalistCard>
          <BrutalistCardHeader>
            <div className="flex items-center justify-between">
              <div>
                <BrutalistCardTitle className="text-2xl">{recognizedFood.name}</BrutalistCardTitle>
                <BrutalistCardDescription className="flex items-center mt-2">
                  <BrutalistBadge variant="success" className="mr-3">
                    {recognizedFood.confidence}% CONFIDENT
                  </BrutalistBadge>
                  <span className="nutrisnap-subtitle text-xs text-gray-600">{recognizedFood.category}</span>
                </BrutalistCardDescription>
              </div>
              <div className="w-16 h-16 bg-green-500 nutrisnap-border flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </BrutalistCardHeader>
        </BrutalistCard>

        {/* Portion Adjustment */}
        <BrutalistCard>
          <BrutalistCardHeader>
            <BrutalistCardTitle>ADJUST PORTION</BrutalistCardTitle>
            <BrutalistCardDescription>DRAG SLIDER TO MATCH ACTUAL PORTION</BrutalistCardDescription>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="nutrisnap-subtitle text-sm">PORTION MULTIPLIER</span>
                <span className="text-4xl font-black text-green-600">{portion[0]}X</span>
              </div>

              <div className="relative">
                <Slider
                  value={portion}
                  onValueChange={setPortion}
                  max={3}
                  min={0.25}
                  step={0.25}
                  className="w-full h-6 nutrisnap-border bg-gray-200"
                />
              </div>

              <div className="flex justify-between nutrisnap-subtitle text-xs text-gray-600">
                <span>0.25X</span>
                <span>1X (SUGGESTED)</span>
                <span>3X</span>
              </div>
            </div>

            {/* Quick Portion Buttons */}
            <div className="nutrisnap-grid-3 gap-2">
              {recognizedFood.portionSuggestions.map((suggestion, index) => (
                <BrutalistButton
                  key={index}
                  variant={portion[0] === suggestion.multiplier ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setPortion([suggestion.multiplier])}
                  className="text-xs"
                >
                  {suggestion.name}
                </BrutalistButton>
              ))}
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Nutrition Information */}
        <BrutalistCard>
          <BrutalistCardHeader>
            <BrutalistCardTitle>NUTRITION DATA</BrutalistCardTitle>
            <BrutalistCardDescription>BASED ON PORTION SIZE ({portion[0]}X)</BrutalistCardDescription>
          </BrutalistCardHeader>
          <BrutalistCardContent>
            <div className="nutrisnap-grid-2 gap-4">
              <div className="bg-red-500 text-white p-6 nutrisnap-border text-center">
                <div className="text-4xl font-black mb-2">
                  {calculateNutrition(recognizedFood.baseNutrition.calories)}
                </div>
                <div className="nutrisnap-subtitle text-xs">CALORIES</div>
              </div>

              <div className="bg-blue-500 text-white p-6 nutrisnap-border text-center">
                <div className="text-4xl font-black mb-2">
                  {calculateNutrition(recognizedFood.baseNutrition.protein)}G
                </div>
                <div className="nutrisnap-subtitle text-xs">PROTEIN</div>
              </div>

              <div className="bg-green-500 text-white p-6 nutrisnap-border text-center">
                <div className="text-4xl font-black mb-2">
                  {calculateNutrition(recognizedFood.baseNutrition.carbs)}G
                </div>
                <div className="nutrisnap-subtitle text-xs">CARBS</div>
              </div>

              <div className="bg-purple-500 text-white p-6 nutrisnap-border text-center">
                <div className="text-4xl font-black mb-2">{calculateNutrition(recognizedFood.baseNutrition.fat)}G</div>
                <div className="nutrisnap-subtitle text-xs">FAT</div>
              </div>
            </div>

            {/* Additional Nutrients */}
            <div className="mt-6 nutrisnap-grid-2 gap-4 nutrisnap-subtitle text-sm">
              <div className="flex justify-between p-3 bg-gray-100 nutrisnap-border-thin">
                <span>FIBER</span>
                <span className="font-black">{calculateNutrition(recognizedFood.baseNutrition.fiber)}G</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-100 nutrisnap-border-thin">
                <span>SUGAR</span>
                <span className="font-black">{calculateNutrition(recognizedFood.baseNutrition.sugar)}G</span>
              </div>
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <BrutalistButton variant="outline" className="flex-1">
            <Edit className="w-4 h-4 mr-2" />
            EDIT DETAILS
          </BrutalistButton>

          <BrutalistButton onClick={handleLogFood} variant="accent" className="flex-1" disabled={isLogging}>
            {isLogging ? (
              <>
                <div className="w-4 h-4 bg-black nutrisnap-loading mr-2"></div>
                LOGGING...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                LOG FOOD
              </>
            )}
          </BrutalistButton>
        </div>

        {/* Confidence Info */}
        <BrutalistCard className="bg-blue-500 text-white">
          <BrutalistCardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white nutrisnap-border flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h4 className="nutrisnap-subtitle text-sm mb-2">HIGH CONFIDENCE RECOGNITION</h4>
                <p className="nutrisnap-body text-sm text-blue-100">
                  AI IS {recognizedFood.confidence}% CONFIDENT. EDIT IF INCORRECT.
                </p>
              </div>
            </div>
          </BrutalistCardContent>
        </BrutalistCard>
      </div>

      <BrutalistBottomNavigation />
    </div>
  )
}
