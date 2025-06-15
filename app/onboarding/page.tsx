"use client"

import { useState, useEffect } from "react"
import { BrutalistButton } from "@/components/ui/brutalist-button"
import { BrutalistInput } from "@/components/ui/brutalist-input"
import { Label } from "@/components/ui/label"
import {
  BrutalistCard,
  BrutalistCardContent,
  BrutalistCardDescription,
  BrutalistCardHeader,
} from "@/components/ui/brutalist-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Square, ArrowRight, ArrowLeft, User, Activity, Target, Sparkles, Zap, Brain, Utensils } from "lucide-react"

export default function NutriSnapOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    preferredCuisines: [] as string[],
  })

  const [calculatedNutrition, setCalculatedNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const totalSteps = 5

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const { age, gender, height, weight, activityLevel, goal } = formData;

    const numAge = parseFloat(age);
    const numHeight = parseFloat(height);
    const numWeight = parseFloat(weight);

    if (numAge > 0 && numHeight > 0 && numWeight > 0 && gender && activityLevel && goal) {
      let bmr: number;

      // Mifflin-St Jeor Equation for BMR
      if (gender === 'male') {
        bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge) + 5;
      } else if (gender === 'female') {
        bmr = (10 * numWeight) + (6.25 * numHeight) - (5 * numAge) - 161;
      } else {
        bmr = 0; // Handle other/prefer-not-to-say by setting to 0 or an average
      }

      let tdee: number = bmr;

      // Activity Level Multipliers
      switch (activityLevel) {
        case 'sedentary':
          tdee *= 1.2;
          break;
        case 'lightly-active':
          tdee *= 1.375;
          break;
        case 'moderately-active':
          tdee *= 1.55;
          break;
        case 'very-active':
          tdee *= 1.725;
          break;
        default:
          break;
      }

      let totalCalories = tdee;

      // Goal-based Adjustments
      switch (goal) {
        case 'lose-weight':
          totalCalories -= 500; // Aim for ~1lb/week loss
          break;
        case 'gain-weight':
          totalCalories += 500; // Aim for ~1lb/week gain
          break;
        case 'maintain-weight':
        case 'general-health':
        default:
          break;
      }

      // Ensure calories don't go below a reasonable minimum
      totalCalories = Math.max(1200, totalCalories); 

      // Macronutrient Distribution (Example: 30% Protein, 40% Carbs, 30% Fat)
      const proteinCalories = totalCalories * 0.30;
      const carbCalories = totalCalories * 0.40;
      const fatCalories = totalCalories * 0.30;

      const proteinGrams = Math.round(proteinCalories / 4); // 4 kcal/g for protein
      const carbGrams = Math.round(carbCalories / 4);     // 4 kcal/g for carbs
      const fatGrams = Math.round(fatCalories / 9);         // 9 kcal/g for fat

      setCalculatedNutrition({
        calories: Math.round(totalCalories),
        protein: proteinGrams,
        carbs: carbGrams,
        fat: fatGrams,
      });
    } else {
      setCalculatedNutrition({ calories: 0, protein: 0, carbs: 0, fat: 0 });
    }
  }, [formData]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save calculated nutrition to local storage before redirecting to dashboard
      if (calculatedNutrition.calories > 0) {
        localStorage.setItem('userNutritionData', JSON.stringify(calculatedNutrition));
      }
      // Save all form data (including preferred cuisines) to local storage
      localStorage.setItem('userOnboardingData', JSON.stringify(formData));
      window.location.href = "/dashboard"
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleCuisine = (cuisine: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredCuisines: prev.preferredCuisines.includes(cuisine)
        ? prev.preferredCuisines.filter((c) => c !== cuisine)
        : [...prev.preferredCuisines, cuisine],
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={`space-y-6 sm:space-y-8 ${isLoaded ? "nutrisnap-slide-in" : ""}`}>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-lime-400 nutrisnap-border mx-auto mb-4 sm:mb-6 flex items-center justify-center nutrisnap-float">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
              </div>
              <h2 className="nutrisnap-title text-2xl sm:text-4xl mb-3 sm:mb-4">TELL US ABOUT YOURSELF</h2>
              <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-600">
                PERSONALIZE YOUR AI NUTRITION EXPERIENCE
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="nutrisnap-grid-2 gap-4 sm:gap-6">
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="age" className="nutrisnap-subtitle text-xs">
                    AGE
                  </Label>
                  <BrutalistInput
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    className="nutrisnap-hover touch-target"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Label className="nutrisnap-subtitle text-xs">GENDER</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                    <SelectTrigger className="nutrisnap-border nutrisnap-hover h-12 font-bold uppercase touch-target">
                      <SelectValue placeholder="SELECT GENDER" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">MALE</SelectItem>
                      <SelectItem value="female">FEMALE</SelectItem>
                      <SelectItem value="other">OTHER</SelectItem>
                      <SelectItem value="prefer-not-to-say">PREFER NOT TO SAY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="nutrisnap-grid-2 gap-4 sm:gap-6">
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="height" className="nutrisnap-subtitle text-xs">
                    HEIGHT (CM)
                  </Label>
                  <BrutalistInput
                    id="height"
                    type="number"
                    placeholder="170"
                    value={formData.height}
                    onChange={(e) => updateFormData("height", e.target.value)}
                    className="nutrisnap-hover touch-target"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="weight" className="nutrisnap-subtitle text-xs">
                    WEIGHT (KG)
                  </Label>
                  <BrutalistInput
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => updateFormData("weight", e.target.value)}
                    className="nutrisnap-hover touch-target"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className={`space-y-6 sm:space-y-8 ${isLoaded ? "nutrisnap-bounce-in" : ""}`}>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 nutrisnap-border mx-auto mb-4 sm:mb-6 flex items-center justify-center nutrisnap-float">
                <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="nutrisnap-title text-2xl sm:text-4xl mb-3 sm:mb-4">ACTIVITY LEVEL</h2>
              <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-600">HOW ACTIVE ARE YOU DAILY?</p>
            </div>

            <RadioGroup
              value={formData.activityLevel}
              onValueChange={(value) => updateFormData("activityLevel", value)}
              className="space-y-3 sm:space-y-4"
            >
              {[
                { value: "sedentary", title: "SEDENTARY", desc: "LITTLE OR NO EXERCISE", color: "bg-gray-200" },
                {
                  value: "lightly-active",
                  title: "LIGHTLY ACTIVE",
                  desc: "LIGHT EXERCISE 1-3 DAYS/WEEK",
                  color: "bg-yellow-400",
                },
                {
                  value: "moderately-active",
                  title: "MODERATELY ACTIVE",
                  desc: "MODERATE EXERCISE 3-5 DAYS/WEEK",
                  color: "bg-orange-500",
                },
                {
                  value: "very-active",
                  title: "VERY ACTIVE",
                  desc: "HARD EXERCISE 6-7 DAYS/WEEK",
                  color: "bg-red-500",
                },
              ].map((option, index) => (
                <div key={option.value} className={`nutrisnap-bounce-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 nutrisnap-border nutrisnap-hover cursor-pointer touch-target">
                    <RadioGroupItem value={option.value} id={option.value} className="nutrisnap-border" />
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${option.color} nutrisnap-border flex items-center justify-center`}
                    >
                      <span className="nutrisnap-subtitle text-xs text-black">{index + 1}</span>
                    </div>
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      <div className="nutrisnap-subtitle text-sm mb-1">{option.title}</div>
                      <div className="nutrisnap-body text-xs text-gray-600">{option.desc}</div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 3:
        return (
          <div className={`space-y-6 sm:space-y-8 ${isLoaded ? "nutrisnap-slide-in" : ""}`}>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-500 nutrisnap-border mx-auto mb-4 sm:mb-6 flex items-center justify-center nutrisnap-float">
                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="nutrisnap-title text-2xl sm:text-4xl mb-3 sm:mb-4">YOUR GOAL</h2>
              <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-600">CUSTOMIZE YOUR NUTRITION TARGETS</p>
            </div>

            <RadioGroup
              value={formData.goal}
              onValueChange={(value) => updateFormData("goal", value)}
              className="space-y-3 sm:space-y-4"
            >
              {[
                {
                  value: "lose-weight",
                  title: "LOSE WEIGHT",
                  desc: "CREATE CALORIC DEFICIT",
                  icon: "📉",
                  color: "bg-red-500",
                },
                {
                  value: "maintain-weight",
                  title: "MAINTAIN WEIGHT",
                  desc: "STAY AT CURRENT WEIGHT",
                  icon: "⚖️",
                  color: "bg-blue-500",
                },
                {
                  value: "gain-weight",
                  title: "GAIN WEIGHT",
                  desc: "BUILD MUSCLE OR INCREASE MASS",
                  icon: "📈",
                  color: "bg-green-500",
                },
                {
                  value: "general-health",
                  title: "GENERAL HEALTH",
                  desc: "TRACK NUTRITION FOR WELLNESS",
                  icon: "💚",
                  color: "bg-lime-400",
                },
              ].map((option, index) => (
                <div key={option.value} className={`nutrisnap-bounce-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 nutrisnap-border nutrisnap-hover cursor-pointer touch-target">
                    <RadioGroupItem value={option.value} id={option.value} className="nutrisnap-border" />
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${option.color} nutrisnap-border flex items-center justify-center`}
                    >
                      <span className="text-lg">{option.icon}</span>
                    </div>
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      <div className="nutrisnap-subtitle text-sm mb-1">{option.title}</div>
                      <div className="nutrisnap-body text-xs text-gray-600">{option.desc}</div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 4:
        return (
          <div className={`space-y-6 sm:space-y-8 ${isLoaded ? "nutrisnap-bounce-in" : ""}`}>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-500 nutrisnap-border mx-auto mb-4 sm:mb-6 flex items-center justify-center nutrisnap-float">
                <Utensils className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="nutrisnap-title text-2xl sm:text-4xl mb-3 sm:mb-4">PREFERRED CUISINES</h2>
              <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-600">
                SELECT ALL FOODS YOU ENJOY (MULTIPLE CHOICES)
              </p>
              <div className="mt-2 text-center">
                <span className="nutrisnap-body text-xs text-purple-600">
                  {formData.preferredCuisines.length} SELECTED
                </span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[
                { value: "indian", title: "INDIAN", desc: "CURRY, RICE, SPICES", flag: "🇮🇳", color: "bg-orange-500" },
                {
                  value: "chinese",
                  title: "CHINESE",
                  desc: "STIR-FRY, NOODLES, DIM SUM",
                  flag: "🇨🇳",
                  color: "bg-red-500",
                },
                { value: "japanese", title: "JAPANESE", desc: "SUSHI, RAMEN, MISO", flag: "🇯🇵", color: "bg-pink-500" },
                {
                  value: "american",
                  title: "AMERICAN",
                  desc: "BURGERS, BBQ, COMFORT FOOD",
                  flag: "🇺🇸",
                  color: "bg-blue-500",
                },
                { value: "british", title: "BRITISH", desc: "FISH & CHIPS, ROASTS", flag: "🇬🇧", color: "bg-gray-500" },
                {
                  value: "italian",
                  title: "ITALIAN",
                  desc: "PASTA, PIZZA, MEDITERRANEAN",
                  flag: "🇮🇹",
                  color: "bg-green-500",
                },
                {
                  value: "mexican",
                  title: "MEXICAN",
                  desc: "TACOS, BURRITOS, SPICY",
                  flag: "🇲🇽",
                  color: "bg-yellow-500",
                },
                { value: "thai", title: "THAI", desc: "PAD THAI, CURRY, COCONUT", flag: "🇹🇭", color: "bg-purple-500" },
                {
                  value: "mediterranean",
                  title: "MEDITERRANEAN",
                  desc: "OLIVE OIL, FRESH HERBS",
                  flag: "🫒",
                  color: "bg-lime-500",
                },
                {
                  value: "korean",
                  title: "KOREAN",
                  desc: "KIMCHI, BBQ, FERMENTED",
                  flag: "🇰🇷",
                  color: "bg-indigo-500",
                },
              ].map((option, index) => (
                <div
                  key={option.value}
                  className={`nutrisnap-bounce-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 nutrisnap-border nutrisnap-hover cursor-pointer touch-target ${
                      formData.preferredCuisines.includes(option.value)
                        ? "bg-lime-50 border-lime-400"
                        : "bg-white border-black"
                    }`}
                    onClick={() => toggleCuisine(option.value)}
                  >
                    <Checkbox
                      checked={formData.preferredCuisines.includes(option.value)}
                      onChange={() => toggleCuisine(option.value)}
                      className="nutrisnap-border"
                    />
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${option.color} nutrisnap-border flex items-center justify-center`}
                    >
                      <span className="text-lg">{option.flag}</span>
                    </div>
                    <Label className="flex-1 cursor-pointer">
                      <div className="nutrisnap-subtitle text-sm mb-1">{option.title}</div>
                      <div className="nutrisnap-body text-xs text-gray-600">{option.desc}</div>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className={`space-y-6 sm:space-y-8 ${isLoaded ? "nutrisnap-bounce-in" : ""}`}>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-lime-400 nutrisnap-border mx-auto mb-4 sm:mb-6 flex items-center justify-center nutrisnap-pulse-glow">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
              </div>
              <h2 className="nutrisnap-title text-2xl sm:text-4xl mb-3 sm:mb-4">YOU'RE ALL SET!</h2>
              <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-600">AI NUTRITION TRACKING READY</p>
            </div>

            <div className="bg-gradient-to-br from-lime-50 to-blue-50 p-4 sm:p-8 nutrisnap-border">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-lime-400 to-blue-500 nutrisnap-border mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="nutrisnap-subtitle text-base sm:text-lg mb-3 sm:mb-4">
                  YOUR AI NUTRITION PLAN IS READY!
                </h3>
                <p className="nutrisnap-body text-sm text-gray-600 mb-4 sm:mb-6">
                  BASED ON YOUR DATA, WE'VE CALCULATED PERSONALIZED TARGETS:
                </p>

                <div className="nutrisnap-grid-2 gap-3 sm:gap-4 mb-4">
                  <div className="macro-calories p-3 sm:p-4 nutrisnap-border text-center">
                    <div className="nutrisnap-title text-2xl sm:text-3xl text-white">
                      {calculatedNutrition.calories.toLocaleString()}
                    </div>
                    <div className="nutrisnap-subtitle text-xs text-white">DAILY CALORIES</div>
                  </div>
                  <div className="macro-protein p-3 sm:p-4 nutrisnap-border text-center">
                    <div className="nutrisnap-title text-2xl sm:text-3xl text-black">
                      {calculatedNutrition.protein}G
                    </div>
                    <div className="nutrisnap-subtitle text-xs text-black">PROTEIN</div>
                  </div>
                  <div className="macro-carbs p-3 sm:p-4 nutrisnap-border text-center">
                    <div className="nutrisnap-title text-2xl sm:text-3xl text-black">
                      {calculatedNutrition.carbs}G
                    </div>
                    <div className="nutrisnap-subtitle text-xs text-black">CARBS</div>
                  </div>
                  <div className="macro-fat p-3 sm:p-4 nutrisnap-border text-center">
                    <div className="nutrisnap-title text-2xl sm:text-3xl text-white">
                      {calculatedNutrition.fat}G
                    </div>
                    <div className="nutrisnap-subtitle text-xs text-white">FAT</div>
                  </div>
                </div>

                {formData.preferredCuisines.length > 0 && (
                  <div className="bg-purple-50 p-3 sm:p-4 nutrisnap-border-thin">
                    <h4 className="nutrisnap-subtitle text-xs mb-2">YOUR PREFERRED CUISINES:</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.preferredCuisines.map((cuisine) => (
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
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen nutrisnap-bg flex items-center justify-center mobile-padding py-8">
      <BrutalistCard className="w-full max-w-2xl nutrisnap-shadow-lg">
        <BrutalistCardHeader className="mobile-padding">
          <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-lime-400 nutrisnap-border flex items-center justify-center">
              <Square className="w-4 h-4 sm:w-5 sm:h-5 text-black fill-black" />
            </div>
            <span className="nutrisnap-title text-lg sm:text-xl">NUTRISNAP</span>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full bg-gray-200 nutrisnap-border h-4 sm:h-6 mb-4 sm:mb-6">
            <div
              className="h-full bg-gradient-to-r from-lime-400 via-blue-500 to-orange-500 transition-all duration-500 ease-out flex items-center justify-end pr-1 sm:pr-2"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>

          <div className="text-center">
            <BrutalistCardDescription className="nutrisnap-subtitle text-xs sm:text-sm">
              STEP {currentStep} OF {totalSteps}
            </BrutalistCardDescription>
          </div>
        </BrutalistCardHeader>

        <BrutalistCardContent className="mobile-padding">
          {renderStep()}

          <div className="flex justify-between mt-6 sm:mt-10 gap-3">
            <BrutalistButton
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center border-black text-black hover:bg-black hover:text-white touch-target"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK
            </BrutalistButton>

            <BrutalistButton
              onClick={handleNext}
              className="bg-lime-400 text-black hover:bg-lime-300 flex items-center nutrisnap-shadow touch-target"
            >
              {currentStep === totalSteps ? "GET STARTED" : "NEXT"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </BrutalistButton>
          </div>
        </BrutalistCardContent>
      </BrutalistCard>
    </div>
  )
}
