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
import { BrutalistProgress } from "@/components/ui/brutalist-progress"
import { BrutalistBadge } from "@/components/ui/brutalist-badge"
import {
  Camera,
  Plus,
  TrendingUp,
  Target,
  Calendar,
  Clock,
  Flame,
  Zap,
  Square,
  Brain,
  Star,
  ChefHat,
} from "lucide-react"
import Link from "next/link"
import { BrutalistBottomNavigation } from "@/components/brutalist-bottom-nav"

export default function NutriSnapDashboardPage() {
  const [todayStats, setTodayStats] = useState({
    calories: { consumed: 0, target: 2150 },
    protein: { consumed: 0, target: 120 },
    carbs: { consumed: 0, target: 270 },
    fat: { consumed: 0, target: 72 },
  })

  const [preferredCuisines, setPreferredCuisines] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNutrition = localStorage.getItem('userNutritionData');
      if (savedNutrition) {
        const nutritionData = JSON.parse(savedNutrition);
        setTodayStats(prevStats => ({
          ...prevStats,
          calories: { ...prevStats.calories, target: nutritionData.calories },
          protein: { ...prevStats.protein, target: nutritionData.protein },
          carbs: { ...prevStats.carbs, target: nutritionData.carbs },
          fat: { ...prevStats.fat, target: nutritionData.fat },
        }));
      }
      const savedCuisines = localStorage.getItem('userOnboardingData');
      if (savedCuisines) {
        const onboardingData = JSON.parse(savedCuisines);
        if (onboardingData.preferredCuisines) {
          setPreferredCuisines(onboardingData.preferredCuisines);
        }
      }
      console.log("Preferred Cuisines from Local Storage:", preferredCuisines);
    }
  }, []);

  const [recentMeals] = useState([
    {
      id: 1,
      name: "AVOCADO TOAST + EGGS",
      time: "08:30",
      calories: 420,
      image: "/placeholder.svg?height=60&width=60",
      confidence: 95,
    },
    {
      id: 2,
      name: "GREEK YOGURT + BERRIES",
      time: "10:15",
      calories: 180,
      image: "/placeholder.svg?height=60&width=60",
      confidence: 88,
    },
    {
      id: 3,
      name: "CHICKEN CAESAR SALAD",
      time: "13:00",
      calories: 520,
      image: "/placeholder.svg?height=60&width=60",
      confidence: 92,
    },
  ])

  const [recommendedFoods] = useState([
    {
      id: 1,
      name: "GRILLED SALMON",
      calories: 350,
      protein: 40,
      reason: "HIGH PROTEIN FOR YOUR GOALS",
      confidence: 96,
      cuisine: "MEDITERRANEAN",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "QUINOA BOWL",
      calories: 280,
      protein: 12,
      reason: "BALANCED MACROS",
      confidence: 91,
      cuisine: "HEALTHY",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "CHICKEN TIKKA",
      calories: 320,
      protein: 35,
      reason: "MATCHES YOUR CUISINE PREFERENCE",
      confidence: 94,
      cuisine: "INDIAN",
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const calculatePercentage = (consumed: number, target: number) => {
    return Math.min((consumed / target) * 100, 100)
  }

  return (
    <div className="min-h-screen dashboard-simple-bg pb-20">
      {/* Header */}
      <header className="bg-white nutrisnap-border-thin border-t-0 border-l-0 border-r-0 sticky top-0 z-40">
        <div className="container mx-auto mobile-padding py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="nutrisnap-title text-2xl sm:text-4xl">DASHBOARD</h1>
              <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-600">AI NUTRITION TRACKING</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <BrutalistBadge variant="success" className="nutrisnap-shadow-sm text-xs">
                <Target className="w-3 h-3 mr-1" />
                ON TRACK
              </BrutalistBadge>
              <BrutalistBadge variant="accent" className="nutrisnap-shadow-sm text-xs">
                <Brain className="w-3 h-3 mr-1" />
                AI ACTIVE
              </BrutalistBadge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto mobile-padding py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* AI-Powered Quick Scan */}
        <BrutalistCard className="bg-black text-white nutrisnap-shadow-lg">
          <BrutalistCardContent className="p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4 text-center sm:text-left">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-400 nutrisnap-border flex items-center justify-center nutrisnap-float">
                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <div>
                  <h2 className="nutrisnap-title text-xl sm:text-3xl mb-1 sm:mb-2 text-lime-400">SCAN FOOD</h2>
                  <p className="nutrisnap-body text-sm sm:text-base text-gray-300">POINT AI CAMERA AT ANY MEAL</p>
                </div>
              </div>
              <Link href="/capture" className="w-full sm:w-auto">
                <BrutalistButton
                  size="lg"
                  className="w-full sm:w-auto bg-lime-400 text-black hover:bg-lime-300 nutrisnap-shadow-lg nutrisnap-hover touch-target"
                >
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  SCAN NOW
                </BrutalistButton>
              </Link>
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Today's Progress - Enhanced */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <BrutalistCardTitle className="flex items-center text-xl sm:text-3xl">
              <Flame className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 text-orange-500" />
              TODAY'S PROGRESS
            </BrutalistCardTitle>
            <BrutalistCardDescription className="nutrisnap-subtitle text-xs sm:text-sm">
              {new Date()
                .toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                .toUpperCase()}
            </BrutalistCardDescription>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-6 sm:space-y-8">
            {/* Main Calories Display */}
            <div className="text-center p-4 sm:p-8 bg-gradient-to-r from-gray-50 to-gray-100 nutrisnap-border">
              <div className="nutrisnap-title text-4xl sm:text-6xl mb-2">{todayStats.calories.consumed}</div>
              <div className="nutrisnap-subtitle text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                OF {todayStats.calories.target} CALORIES
              </div>
              <BrutalistProgress
                value={calculatePercentage(todayStats.calories.consumed, todayStats.calories.target)}
                className="h-6 sm:h-8 max-w-md mx-auto"
              />
              <div className="nutrisnap-body text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">
                {todayStats.calories.target - todayStats.calories.consumed} CALORIES REMAINING
              </div>
            </div>

            {/* Macro Grid - Enhanced */}
            <div className="nutrisnap-grid-3 gap-3 sm:gap-6">
              <div className="macro-protein p-4 sm:p-6 nutrisnap-border text-center nutrisnap-hover">
                <div className="nutrisnap-title text-2xl sm:text-4xl text-white mb-1 sm:mb-2">
                  {todayStats.protein.consumed}G
                </div>
                <div className="nutrisnap-subtitle text-xs text-white mb-2 sm:mb-3">PROTEIN</div>
                <BrutalistProgress
                  value={calculatePercentage(todayStats.protein.consumed, todayStats.protein.target)}
                  className="h-3 sm:h-4"
                />
              </div>

              <div className="macro-carbs p-4 sm:p-6 nutrisnap-border text-center nutrisnap-hover">
                <div className="nutrisnap-title text-2xl sm:text-4xl text-black mb-1 sm:mb-2">
                  {todayStats.carbs.consumed}G
                </div>
                <div className="nutrisnap-subtitle text-xs text-black mb-2 sm:mb-3">CARBS</div>
                <BrutalistProgress
                  value={calculatePercentage(todayStats.carbs.consumed, todayStats.carbs.target)}
                  className="h-3 sm:h-4"
                />
              </div>

              <div className="macro-fat p-4 sm:p-6 nutrisnap-border text-center nutrisnap-hover">
                <div className="nutrisnap-title text-2xl sm:text-4xl text-white mb-1 sm:mb-2">
                  {todayStats.fat.consumed}G
                </div>
                <div className="nutrisnap-subtitle text-xs text-white mb-2 sm:mb-3">FAT</div>
                <BrutalistProgress
                  value={calculatePercentage(todayStats.fat.consumed, todayStats.fat.target)}
                  className="h-3 sm:h-4"
                />
              </div>
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Recommended Food Section */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center justify-between">
              <BrutalistCardTitle className="flex items-center text-lg sm:text-2xl">
                <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-purple-500" />
                RECOMMENDED FOOD
              </BrutalistCardTitle>
              <BrutalistBadge variant="accent" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                AI PICKS
              </BrutalistBadge>
            </div>
            <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
              PERSONALIZED FOR YOUR GOALS & PREFERENCES
            </BrutalistCardDescription>
          </BrutalistCardHeader>
          <BrutalistCardContent>
            {preferredCuisines.length > 0 && (
              <div className="bg-purple-50 p-3 sm:p-4 nutrisnap-border-thin mb-4">
                <h4 className="nutrisnap-subtitle text-xs mb-2">YOUR PREFERRED CUISINES:</h4>
                <div className="flex flex-wrap gap-2">
                  {preferredCuisines.map((cuisine) => (
                    <span
                      key={cuisine}
                      className="bg-purple-500 text-white px-2 py-1 nutrisnap-border-thin text-xs nutrisnap-subtitle"
                    >
                      {cuisine.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-3 sm:space-y-4">
              {recommendedFoods.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 nutrisnap-border-thin nutrisnap-hover"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 nutrisnap-border flex items-center justify-center flex-shrink-0">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover rounded-sm"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="nutrisnap-subtitle text-sm mb-1">{food.name}</div>
                    <div className="nutrisnap-body text-xs text-gray-600">
                      {food.calories} CAL | {food.protein}G PROTEIN
                    </div>
                    <div className="nutrisnap-caption text-xs text-gray-500 mt-1">{food.reason}</div>
                  </div>
                  <BrutalistButton variant="outline" size="sm" className="touch-target">
                    <Plus className="w-4 h-4 mr-1" />
                    ADD
                  </BrutalistButton>
                </div>
              ))}
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Recent Activity */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <BrutalistCardTitle className="flex items-center text-lg sm:text-2xl">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-500" />
              RECENT ACTIVITY
            </BrutalistCardTitle>
            <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
              YOUR LATEST AI-POWERED LOGS
            </BrutalistCardDescription>
          </BrutalistCardHeader>
          <BrutalistCardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 nutrisnap-border-thin nutrisnap-hover"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 nutrisnap-border flex items-center justify-center flex-shrink-0">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover rounded-sm"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="nutrisnap-subtitle text-sm mb-1">{meal.name}</div>
                    <div className="nutrisnap-body text-xs text-gray-600">
                      {meal.calories} CAL | {meal.time}
                    </div>
                    <div className="nutrisnap-caption text-xs text-gray-500 mt-1">
                      AI CONFIDENCE: {meal.confidence}%
                    </div>
                  </div>
                  <BrutalistButton variant="outline" size="sm" className="touch-target">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    VIEW
                  </BrutalistButton>
                </div>
              ))}
            </div>
          </BrutalistCardContent>
        </BrutalistCard>
      </div>
      <BrutalistBottomNavigation />
    </div>
  )
}