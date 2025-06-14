"use client"

import { useState } from "react"
import {
  BrutalistCard,
  BrutalistCardContent,
  BrutalistCardDescription,
  BrutalistCardHeader,
  BrutalistCardTitle,
} from "@/components/ui/brutalist-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrutalistBadge } from "@/components/ui/brutalist-badge"
import { BrutalistProgress } from "@/components/ui/brutalist-progress"
import { TrendingUp, TrendingDown, Target, Calendar, Award, Zap, Brain, BarChart3, Activity } from "lucide-react"
import { BrutalistBottomNavigation } from "@/components/brutalist-bottom-nav"

export default function BrutalistAnalyticsPage() {
  const [weeklyData] = useState({
    calories: { current: 1950, target: 2150, change: -5.2 },
    protein: { current: 125, target: 120, change: 4.2 },
    carbs: { current: 245, target: 270, change: -9.3 },
    fat: { current: 68, target: 72, change: -5.6 },
  })

  const [goals] = useState([
    { name: "DAILY CALORIE TARGET", progress: 91, status: "on-track" },
    { name: "PROTEIN GOAL", progress: 104, status: "exceeded" },
    { name: "MEAL LOGGING STREAK", progress: 85, status: "good" },
    { name: "WEEKLY EXERCISE", progress: 60, status: "behind" },
  ])

  const [insights] = useState([
    {
      type: "positive",
      title: "EXCELLENT PROTEIN INTAKE!",
      description: "YOU'VE CONSISTENTLY MET YOUR PROTEIN GOALS THIS WEEK.",
      icon: Award,
    },
    {
      type: "suggestion",
      title: "CONSIDER MORE FIBER",
      description: "ADDING MORE VEGETABLES COULD HELP REACH YOUR FIBER GOALS.",
      icon: TrendingUp,
    },
    {
      type: "achievement",
      title: "7-DAY LOGGING STREAK!",
      description: "YOU'VE LOGGED MEALS EVERY DAY THIS WEEK. KEEP IT UP!",
      icon: Zap,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeded":
        return "bg-lime-400 text-black"
      case "on-track":
        return "bg-blue-500 text-white"
      case "good":
        return "bg-purple-500 text-white"
      case "behind":
        return "bg-orange-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-lime-50 border-lime-400"
      case "suggestion":
        return "bg-blue-50 border-blue-400"
      case "achievement":
        return "bg-purple-50 border-purple-400"
      default:
        return "bg-gray-50 border-gray-400"
    }
  }

  return (
    <div className="min-h-screen dashboard-simple-bg pb-20">
      {/* Brutalist Header */}
      <header className="bg-black text-white nutrisnap-border-thin border-t-0 border-l-0 border-r-0 sticky top-0 z-40">
        <div className="container mx-auto mobile-padding py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 nutrisnap-border flex items-center justify-center">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="nutrisnap-title text-2xl sm:text-4xl text-blue-400">ANALYTICS</h1>
                <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-300">TRACK YOUR NUTRITION PROGRESS</p>
              </div>
            </div>
            <BrutalistBadge className="bg-lime-400 text-black nutrisnap-border text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              THIS WEEK
            </BrutalistBadge>
          </div>
        </div>
      </header>

      <div className="container mx-auto mobile-padding py-4 sm:py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white nutrisnap-border h-12">
            <TabsTrigger
              value="overview"
              className="nutrisnap-subtitle text-xs sm:text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              OVERVIEW
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="nutrisnap-subtitle text-xs sm:text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              TRENDS
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="nutrisnap-subtitle text-xs sm:text-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              GOALS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Weekly Summary */}
            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 nutrisnap-border flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <BrutalistCardTitle className="text-xl sm:text-2xl">WEEKLY AVERAGE</BrutalistCardTitle>
                    <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                      COMPARED TO YOUR TARGETS
                    </BrutalistCardDescription>
                  </div>
                </div>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <div className="nutrisnap-grid-2 gap-6">
                  {Object.entries(weeklyData).map(([key, data]) => (
                    <div key={key} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="nutrisnap-subtitle text-sm capitalize">{key}</span>
                        <div className="flex items-center space-x-2">
                          {data.change > 0 ? (
                            <div className="w-8 h-8 bg-lime-400 nutrisnap-border flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-black" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-red-500 nutrisnap-border flex items-center justify-center">
                              <TrendingDown className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <span
                            className={`nutrisnap-subtitle text-sm ${
                              data.change > 0 ? "text-lime-600" : "text-red-600"
                            }`}
                          >
                            {Math.abs(data.change)}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="nutrisnap-title text-3xl">
                          {data.current}
                          {key === "calories" ? "" : "G"}
                        </span>
                        <span className="nutrisnap-body text-sm text-gray-600">
                          TARGET: {data.target}
                          {key === "calories" ? "" : "G"}
                        </span>
                      </div>

                      <BrutalistProgress value={(data.current / data.target) * 100} className="h-4" />
                    </div>
                  ))}
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            {/* AI Insights */}
            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 nutrisnap-border flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <BrutalistCardTitle className="text-xl sm:text-2xl">AI INSIGHTS</BrutalistCardTitle>
                    <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                      PERSONALIZED RECOMMENDATIONS BASED ON YOUR DATA
                    </BrutalistCardDescription>
                  </div>
                </div>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <div className="space-y-4">
                  {insights.map((insight, index) => {
                    const Icon = insight.icon
                    return (
                      <div
                        key={index}
                        className={`p-4 nutrisnap-border ${getInsightColor(insight.type)} nutrisnap-hover`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-white nutrisnap-border flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="nutrisnap-subtitle text-sm mb-2">{insight.title}</h4>
                            <p className="nutrisnap-body text-xs text-gray-600">{insight.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            {/* Quick Stats */}
            <div className="nutrisnap-grid-2 gap-4">
              <BrutalistCard className="nutrisnap-hover">
                <BrutalistCardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-lime-400 nutrisnap-border mx-auto mb-4 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-black" />
                  </div>
                  <div className="nutrisnap-title text-4xl text-lime-600">7</div>
                  <div className="nutrisnap-subtitle text-xs text-gray-600">DAY STREAK</div>
                </BrutalistCardContent>
              </BrutalistCard>

              <BrutalistCard className="nutrisnap-hover">
                <BrutalistCardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500 nutrisnap-border mx-auto mb-4 flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="nutrisnap-title text-4xl text-blue-600">94%</div>
                  <div className="nutrisnap-subtitle text-xs text-gray-600">AI ACCURACY</div>
                </BrutalistCardContent>
              </BrutalistCard>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            {/* Trend Charts Placeholder */}
            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-lime-400 nutrisnap-border flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <BrutalistCardTitle className="text-xl sm:text-2xl">CALORIE TRENDS</BrutalistCardTitle>
                    <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                      LAST 30 DAYS
                    </BrutalistCardDescription>
                  </div>
                </div>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <div className="h-64 bg-gradient-to-r from-lime-50 to-blue-50 nutrisnap-border flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-lime-400 nutrisnap-border mx-auto mb-4 flex items-center justify-center">
                      <TrendingUp className="w-12 h-12 text-black" />
                    </div>
                    <p className="nutrisnap-subtitle text-sm text-gray-700">INTERACTIVE CHARTS COMING SOON</p>
                    <p className="nutrisnap-body text-xs text-gray-500 mt-2">AI-POWERED TREND ANALYSIS</p>
                  </div>
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 nutrisnap-border flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <BrutalistCardTitle className="text-xl sm:text-2xl">MACRO DISTRIBUTION</BrutalistCardTitle>
                    <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                      WEEKLY BREAKDOWN
                    </BrutalistCardDescription>
                  </div>
                </div>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 nutrisnap-border flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-500 nutrisnap-border mx-auto mb-4 flex items-center justify-center">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <p className="nutrisnap-subtitle text-sm text-gray-700">MACRO CHARTS COMING SOON</p>
                  </div>
                </div>
              </BrutalistCardContent>
            </BrutalistCard>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            {/* Goal Progress */}
            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 nutrisnap-border flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <BrutalistCardTitle className="text-xl sm:text-2xl">GOAL PROGRESS</BrutalistCardTitle>
                    <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                      TRACK YOUR NUTRITION AND LIFESTYLE GOALS
                    </BrutalistCardDescription>
                  </div>
                </div>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <div className="space-y-6">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="nutrisnap-subtitle text-sm">{goal.name}</span>
                        <BrutalistBadge className={`${getStatusColor(goal.status)} nutrisnap-border text-xs`}>
                          {goal.status.replace("-", " ").toUpperCase()}
                        </BrutalistBadge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="nutrisnap-body text-gray-600">{goal.progress}% COMPLETE</span>
                        <span className="nutrisnap-body text-gray-600">
                          {goal.progress > 100 ? "EXCEEDED!" : `${100 - goal.progress}% REMAINING`}
                        </span>
                      </div>

                      <BrutalistProgress value={Math.min(goal.progress, 100)} className="h-4" />
                    </div>
                  ))}
                </div>
              </BrutalistCardContent>
            </BrutalistCard>

            {/* Achievement Badges */}
            <BrutalistCard className="nutrisnap-shadow">
              <BrutalistCardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-400 nutrisnap-border flex items-center justify-center">
                    <Award className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <BrutalistCardTitle className="text-xl sm:text-2xl">ACHIEVEMENTS</BrutalistCardTitle>
                    <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                      YOUR NUTRITION MILESTONES
                    </BrutalistCardDescription>
                  </div>
                </div>
              </BrutalistCardHeader>
              <BrutalistCardContent>
                <div className="nutrisnap-grid-3 gap-4">
                  <div className="text-center p-4 bg-yellow-50 nutrisnap-border nutrisnap-hover">
                    <div className="w-16 h-16 bg-yellow-400 nutrisnap-border mx-auto mb-3 flex items-center justify-center">
                      <Award className="w-8 h-8 text-black" />
                    </div>
                    <div className="nutrisnap-subtitle text-xs">FIRST WEEK</div>
                  </div>

                  <div className="text-center p-4 bg-lime-50 nutrisnap-border nutrisnap-hover">
                    <div className="w-16 h-16 bg-lime-400 nutrisnap-border mx-auto mb-3 flex items-center justify-center">
                      <Target className="w-8 h-8 text-black" />
                    </div>
                    <div className="nutrisnap-subtitle text-xs">GOAL CRUSHER</div>
                  </div>

                  <div className="text-center p-4 bg-blue-50 nutrisnap-border nutrisnap-hover">
                    <div className="w-16 h-16 bg-blue-500 nutrisnap-border mx-auto mb-3 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="nutrisnap-subtitle text-xs">STREAK MASTER</div>
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
