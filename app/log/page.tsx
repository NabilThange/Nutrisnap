"use client"

import { useState } from "react"
import { BrutalistButton } from "@/components/ui/brutalist-button"
import {
  BrutalistCard,
  BrutalistCardContent,
  BrutalistCardDescription,
  BrutalistCardHeader,
  BrutalistCardTitle,
} from "@/components/ui/brutalist-card"
import { BrutalistBadge } from "@/components/ui/brutalist-badge"
import { BrutalistInput } from "@/components/ui/brutalist-input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Search, Filter, Clock, Trash2, Edit, Plus, Square, Zap, Target } from "lucide-react"
import { BrutalistBottomNavigation } from "@/components/brutalist-bottom-nav"

export default function BrutalistLogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const [foodLog] = useState([
    {
      id: 1,
      name: "AVOCADO TOAST + EGGS",
      time: "08:30",
      meal: "BREAKFAST",
      calories: 420,
      protein: 18,
      carbs: 32,
      fat: 24,
      image: "/placeholder.svg?height=60&width=60",
      confidence: 95,
    },
    {
      id: 2,
      name: "GREEK YOGURT + BERRIES",
      time: "10:15",
      meal: "SNACK",
      calories: 180,
      protein: 15,
      carbs: 22,
      fat: 4,
      image: "/placeholder.svg?height=60&width=60",
      confidence: 88,
    },
    {
      id: 3,
      name: "CHICKEN CAESAR SALAD",
      time: "13:00",
      meal: "LUNCH",
      calories: 520,
      protein: 35,
      carbs: 18,
      fat: 32,
      image: "/placeholder.svg?height=60&width=60",
      confidence: 92,
    },
    {
      id: 4,
      name: "APPLE + PEANUT BUTTER",
      time: "15:30",
      meal: "SNACK",
      calories: 300,
      protein: 8,
      carbs: 25,
      fat: 18,
      image: "/placeholder.svg?height=60&width=60",
      confidence: 90,
    },
    {
      id: 5,
      name: "GRILLED SALMON + VEGETABLES",
      time: "19:00",
      meal: "DINNER",
      calories: 450,
      protein: 40,
      carbs: 15,
      fat: 25,
      image: "/placeholder.svg?height=60&width=60",
      confidence: 94,
    },
  ])

  const [weeklyLog] = useState([
    { date: "2024-01-15", meals: 4, calories: 1890 },
    { date: "2024-01-16", meals: 5, calories: 2150 },
    { date: "2024-01-17", meals: 3, calories: 1650 },
    { date: "2024-01-18", meals: 5, calories: 2050 },
    { date: "2024-01-19", meals: 4, calories: 1920 },
    { date: "2024-01-20", meals: 5, calories: 2180 },
    { date: "2024-01-21", meals: 4, calories: 1870 },
  ])

  const filteredLog = foodLog.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const totalCalories = filteredLog.reduce((sum, item) => sum + item.calories, 0)
  const totalProtein = filteredLog.reduce((sum, item) => sum + item.protein, 0)
  const totalCarbs = filteredLog.reduce((sum, item) => sum + item.carbs, 0)
  const totalFat = filteredLog.reduce((sum, item) => sum + item.fat, 0)

  return (
    <div className="min-h-screen dashboard-simple-bg pb-20">
      {/* Brutalist Header */}
      <header className="bg-black text-white nutrisnap-border-thin border-t-0 border-l-0 border-r-0 sticky top-0 z-40">
        <div className="container mx-auto mobile-padding py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-400 nutrisnap-border flex items-center justify-center">
                <Square className="w-6 h-6 sm:w-8 sm:h-8 text-black fill-black" />
              </div>
              <div>
                <h1 className="nutrisnap-title text-2xl sm:text-4xl text-lime-400">FOOD LOG</h1>
                <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-300">AI NUTRITION TRACKING</p>
              </div>
            </div>
            <BrutalistButton
              size="sm"
              className="bg-lime-400 text-black hover:bg-lime-300 nutrisnap-shadow touch-target"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD FOOD
            </BrutalistButton>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <BrutalistInput
                placeholder="SEARCH FOODS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white text-black touch-target"
              />
            </div>
            <BrutalistButton
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-black touch-target"
            >
              <Filter className="w-4 h-4" />
            </BrutalistButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto mobile-padding py-4 sm:py-6">
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white nutrisnap-border h-12">
            <TabsTrigger
              value="today"
              className="nutrisnap-subtitle text-xs sm:text-sm data-[state=active]:bg-lime-400 data-[state=active]:text-black"
            >
              TODAY
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="nutrisnap-subtitle text-xs sm:text-sm data-[state=active]:bg-lime-400 data-[state=active]:text-black"
            >
              HISTORY
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {/* Date Selector */}
            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 nutrisnap-border flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <span className="nutrisnap-subtitle text-sm sm:text-base">
                      {new Date(selectedDate)
                        .toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                        .toUpperCase()}
                    </span>
                  </div>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="nutrisnap-border bg-white p-2 nutrisnap-subtitle text-xs touch-target"
                  />
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            {/* Daily Summary */}
            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 nutrisnap-border flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <BrutalistCardTitle className="text-xl sm:text-2xl">DAILY SUMMARY</BrutalistCardTitle>
                    <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                      {filteredLog.length} MEALS LOGGED
                    </BrutalistCardDescription>
                  </div>
                </div>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <div className="nutrisnap-grid-2 gap-4">
                  <div className="macro-calories p-4 sm:p-6 nutrisnap-border text-center">
                    <div className="nutrisnap-title text-3xl sm:text-4xl text-white">{totalCalories}</div>
                    <div className="nutrisnap-subtitle text-xs text-white">CALORIES</div>
                  </div>
                  <div className="macro-protein p-4 sm:p-6 nutrisnap-border text-center">
                    <div className="nutrisnap-title text-3xl sm:text-4xl text-white">{totalProtein}G</div>
                    <div className="nutrisnap-subtitle text-xs text-white">PROTEIN</div>
                  </div>
                  <div className="macro-carbs p-4 sm:p-6 nutrisnap-border text-center">
                    <div className="nutrisnap-title text-3xl sm:text-4xl text-black">{totalCarbs}G</div>
                    <div className="nutrisnap-subtitle text-xs text-black">CARBS</div>
                  </div>
                  <div className="macro-fat p-4 sm:p-6 nutrisnap-border text-center">
                    <div className="nutrisnap-title text-3xl sm:text-4xl text-white">{totalFat}G</div>
                    <div className="nutrisnap-subtitle text-xs text-white">FAT</div>
                  </div>
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            {/* Food Entries */}
            <div className="space-y-4">
              {filteredLog.map((item) => (
                <BrutalistCard key={item.id} className="nutrisnap-hover nutrisnap-shadow">
                  <BrutalistCardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 nutrisnap-border flex items-center justify-center flex-shrink-0">
                        <Square className="w-8 h-8 text-gray-600 fill-gray-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="nutrisnap-subtitle text-sm sm:text-base">{item.name}</h3>
                          <div className="flex space-x-2">
                            <BrutalistButton
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-500 hover:text-white touch-target"
                            >
                              <Edit className="w-4 h-4" />
                            </BrutalistButton>
                            <BrutalistButton
                              variant="ghost"
                              size="sm"
                              className="hover:bg-red-500 hover:text-white touch-target"
                            >
                              <Trash2 className="w-4 h-4" />
                            </BrutalistButton>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span className="nutrisnap-body">{item.time}</span>
                          </div>
                          <BrutalistBadge variant="secondary" className="text-[10px]">
                            {item.meal}
                          </BrutalistBadge>
                          <BrutalistBadge
                            variant={
                              item.confidence >= 90 ? "success" : item.confidence >= 70 ? "accent" : "destructive"
                            }
                            className="text-[10px]"
                          >
                            <Zap className="w-2 h-2 mr-1" />
                            {item.confidence}% AI
                          </BrutalistBadge>
                        </div>

                        <div className="nutrisnap-grid-2 gap-4 text-xs">
                          <div className="flex justify-between p-2 bg-black text-white nutrisnap-border-thin">
                            <span className="nutrisnap-subtitle">CALORIES</span>
                            <span className="nutrisnap-title">{item.calories}</span>
                          </div>
                          <div className="flex justify-between p-2 bg-blue-500 text-white nutrisnap-border-thin">
                            <span className="nutrisnap-subtitle">PROTEIN</span>
                            <span className="nutrisnap-title">{item.protein}G</span>
                          </div>
                          <div className="flex justify-between p-2 bg-yellow-400 text-black nutrisnap-border-thin">
                            <span className="nutrisnap-subtitle">CARBS</span>
                            <span className="nutrisnap-title">{item.carbs}G</span>
                          </div>
                          <div className="flex justify-between p-2 bg-orange-500 text-white nutrisnap-border-thin">
                            <span className="nutrisnap-subtitle">FAT</span>
                            <span className="nutrisnap-title">{item.fat}G</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BrutalistCardContent>
                </BrutalistCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Weekly Overview */}
            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 nutrisnap-border flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <BrutalistCardTitle className="text-xl sm:text-2xl">THIS WEEK</BrutalistCardTitle>
                    <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                      NUTRITION TRACKING CONSISTENCY
                    </BrutalistCardDescription>
                  </div>
                </div>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <div className="space-y-4">
                  {weeklyLog.map((day, index) => (
                    <div
                      key={day.date}
                      className="flex items-center justify-between p-4 bg-gray-50 nutrisnap-border nutrisnap-hover"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 nutrisnap-border flex items-center justify-center ${
                            index < 5 ? "bg-lime-400 text-black" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          <span className="nutrisnap-title text-lg">{index < 5 ? "✓" : "○"}</span>
                        </div>
                        <div>
                          <div className="nutrisnap-subtitle text-sm">
                            {new Date(day.date)
                              .toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              })
                              .toUpperCase()}
                          </div>
                          <div className="nutrisnap-body text-xs text-gray-600">{day.meals} MEALS LOGGED</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="nutrisnap-title text-xl">{day.calories}</div>
                        <div className="nutrisnap-subtitle text-xs text-gray-600">CALORIES</div>
                      </div>
                    </div>
                  ))}
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            {/* Monthly Stats */}
            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 nutrisnap-border flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <BrutalistCardTitle className="text-xl sm:text-2xl">MONTHLY STATISTICS</BrutalistCardTitle>
                    <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                      JANUARY 2024
                    </BrutalistCardDescription>
                  </div>
                </div>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <div className="nutrisnap-grid-2 gap-4">
                  <div className="text-center p-6 bg-lime-400 nutrisnap-border nutrisnap-hover">
                    <div className="nutrisnap-title text-4xl text-black">28</div>
                    <div className="nutrisnap-subtitle text-xs text-black">DAYS TRACKED</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500 nutrisnap-border nutrisnap-hover">
                    <div className="nutrisnap-title text-4xl text-white">142</div>
                    <div className="nutrisnap-subtitle text-xs text-white">MEALS LOGGED</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500 nutrisnap-border nutrisnap-hover">
                    <div className="nutrisnap-title text-4xl text-white">1,950</div>
                    <div className="nutrisnap-subtitle text-xs text-white">AVG CALORIES</div>
                  </div>
                  <div className="text-center p-6 bg-orange-500 nutrisnap-border nutrisnap-hover">
                    <div className="nutrisnap-title text-4xl text-white">92%</div>
                    <div className="nutrisnap-subtitle text-xs text-white">AI ACCURACY</div>
                  </div>
                </div>
              </BrutalistCardContent>
            </BrutalistCard>
          </TabsContent>
        </Tabs>
      </div>

      <BrutalistBottomNavigation />
    </div>
  )
}
