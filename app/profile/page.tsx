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
import { BrutalistInput } from "@/components/ui/brutalist-input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BrutalistBadge } from "@/components/ui/brutalist-badge"
import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit, Target, Award } from "lucide-react"
import { BrutalistBottomNavigation } from "@/components/brutalist-bottom-nav"

export default function BrutalistProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 28,
    height: 175,
    weight: 70,
    activityLevel: "moderately-active",
    goal: "maintain-weight",
  })

  const [notifications, setNotifications] = useState({
    mealReminders: true,
    goalAchievements: true,
    weeklyReports: false,
    marketingEmails: false,
  })

  const [stats] = useState({
    daysActive: 28,
    mealsLogged: 142,
    streakDays: 7,
    accuracy: 94,
  })

  const handleProfileUpdate = (field: string, value: string | number) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (setting: string) => {
    setNotifications((prev) => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  return (
    <div className="min-h-screen dashboard-simple-bg pb-20">
      {/* Brutalist Header */}
      <header className="bg-black text-white nutrisnap-border-thin border-t-0 border-l-0 border-r-0">
        <div className="container mx-auto mobile-padding py-4 sm:py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-lime-400 nutrisnap-border flex items-center justify-center">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
            </div>

            <div className="flex-1">
              <h1 className="nutrisnap-title text-2xl sm:text-4xl text-lime-400">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-300">{profile.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <BrutalistBadge className="bg-lime-400 text-black nutrisnap-border text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  {stats.streakDays} DAY STREAK
                </BrutalistBadge>
                <BrutalistBadge className="bg-blue-500 text-white nutrisnap-border text-xs">LEVEL 3</BrutalistBadge>
              </div>
            </div>

            <BrutalistButton
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-black touch-target"
            >
              <Edit className="w-4 h-4 mr-2" />
              EDIT
            </BrutalistButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto mobile-padding py-4 sm:py-6 space-y-6">
        {/* Quick Stats */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500 nutrisnap-border flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <BrutalistCardTitle className="text-xl sm:text-2xl">YOUR PROGRESS</BrutalistCardTitle>
                <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                  YOUR NUTRISNAP JOURNEY SO FAR
                </BrutalistCardDescription>
              </div>
            </div>
          </BrutalistCardHeader>
          <BrutalistCardContent>
            <div className="nutrisnap-grid-2 gap-4">
              <div className="text-center p-4 bg-lime-50 nutrisnap-border nutrisnap-hover">
                <div className="nutrisnap-title text-3xl text-lime-600">{stats.daysActive}</div>
                <div className="nutrisnap-subtitle text-xs text-gray-600">DAYS ACTIVE</div>
              </div>

              <div className="text-center p-4 bg-blue-50 nutrisnap-border nutrisnap-hover">
                <div className="nutrisnap-title text-3xl text-blue-600">{stats.mealsLogged}</div>
                <div className="nutrisnap-subtitle text-xs text-gray-600">MEALS LOGGED</div>
              </div>

              <div className="text-center p-4 bg-purple-50 nutrisnap-border nutrisnap-hover">
                <div className="nutrisnap-title text-3xl text-purple-600">{stats.streakDays}</div>
                <div className="nutrisnap-subtitle text-xs text-gray-600">CURRENT STREAK</div>
              </div>

              <div className="text-center p-4 bg-orange-50 nutrisnap-border nutrisnap-hover">
                <div className="nutrisnap-title text-3xl text-orange-600">{stats.accuracy}%</div>
                <div className="nutrisnap-subtitle text-xs text-gray-600">AI ACCURACY</div>
              </div>
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Personal Information */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 nutrisnap-border flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <BrutalistCardTitle className="text-xl sm:text-2xl">PERSONAL INFORMATION</BrutalistCardTitle>
            </div>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-4">
            <div className="nutrisnap-grid-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="nutrisnap-subtitle text-xs">
                  FIRST NAME
                </Label>
                <BrutalistInput
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
                  className="touch-target"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="nutrisnap-subtitle text-xs">
                  LAST NAME
                </Label>
                <BrutalistInput
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
                  className="touch-target"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="nutrisnap-subtitle text-xs">
                EMAIL
              </Label>
              <BrutalistInput
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileUpdate("email", e.target.value)}
                className="touch-target"
              />
            </div>

            <div className="nutrisnap-grid-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="nutrisnap-subtitle text-xs">
                  AGE
                </Label>
                <BrutalistInput
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => handleProfileUpdate("age", Number.parseInt(e.target.value))}
                  className="touch-target"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="nutrisnap-subtitle text-xs">
                  HEIGHT (CM)
                </Label>
                <BrutalistInput
                  id="height"
                  type="number"
                  value={profile.height}
                  onChange={(e) => handleProfileUpdate("height", Number.parseInt(e.target.value))}
                  className="touch-target"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="nutrisnap-subtitle text-xs">
                  WEIGHT (KG)
                </Label>
                <BrutalistInput
                  id="weight"
                  type="number"
                  value={profile.weight}
                  onChange={(e) => handleProfileUpdate("weight", Number.parseInt(e.target.value))}
                  className="touch-target"
                />
              </div>
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Goals & Preferences */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 nutrisnap-border flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <BrutalistCardTitle className="text-xl sm:text-2xl">GOALS & PREFERENCES</BrutalistCardTitle>
            </div>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="nutrisnap-subtitle text-xs">ACTIVITY LEVEL</Label>
              <Select
                value={profile.activityLevel}
                onValueChange={(value) => handleProfileUpdate("activityLevel", value)}
              >
                <SelectTrigger className="nutrisnap-border nutrisnap-hover h-12 font-bold uppercase touch-target">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">SEDENTARY</SelectItem>
                  <SelectItem value="lightly-active">LIGHTLY ACTIVE</SelectItem>
                  <SelectItem value="moderately-active">MODERATELY ACTIVE</SelectItem>
                  <SelectItem value="very-active">VERY ACTIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="nutrisnap-subtitle text-xs">PRIMARY GOAL</Label>
              <Select value={profile.goal} onValueChange={(value) => handleProfileUpdate("goal", value)}>
                <SelectTrigger className="nutrisnap-border nutrisnap-hover h-12 font-bold uppercase touch-target">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose-weight">LOSE WEIGHT</SelectItem>
                  <SelectItem value="maintain-weight">MAINTAIN WEIGHT</SelectItem>
                  <SelectItem value="gain-weight">GAIN WEIGHT</SelectItem>
                  <SelectItem value="general-health">GENERAL HEALTH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Notifications */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 nutrisnap-border flex items-center justify-center">
                <Bell className="w-6 h-6 text-black" />
              </div>
              <div>
                <BrutalistCardTitle className="text-xl sm:text-2xl">NOTIFICATIONS</BrutalistCardTitle>
                <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                  MANAGE YOUR NOTIFICATION PREFERENCES
                </BrutalistCardDescription>
              </div>
            </div>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 nutrisnap-border-thin">
              <div>
                <div className="nutrisnap-subtitle text-sm">MEAL REMINDERS</div>
                <div className="nutrisnap-body text-xs text-gray-600">GET REMINDED TO LOG YOUR MEALS</div>
              </div>
              <Switch
                checked={notifications.mealReminders}
                onCheckedChange={() => handleNotificationToggle("mealReminders")}
                className="touch-target"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 nutrisnap-border-thin">
              <div>
                <div className="nutrisnap-subtitle text-sm">GOAL ACHIEVEMENTS</div>
                <div className="nutrisnap-body text-xs text-gray-600">CELEBRATE WHEN YOU REACH MILESTONES</div>
              </div>
              <Switch
                checked={notifications.goalAchievements}
                onCheckedChange={() => handleNotificationToggle("goalAchievements")}
                className="touch-target"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 nutrisnap-border-thin">
              <div>
                <div className="nutrisnap-subtitle text-sm">WEEKLY REPORTS</div>
                <div className="nutrisnap-body text-xs text-gray-600">GET WEEKLY NUTRITION SUMMARIES</div>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={() => handleNotificationToggle("weeklyReports")}
                className="touch-target"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 nutrisnap-border-thin">
              <div>
                <div className="nutrisnap-subtitle text-sm">MARKETING EMAILS</div>
                <div className="nutrisnap-body text-xs text-gray-600">RECEIVE TIPS AND PRODUCT UPDATES</div>
              </div>
              <Switch
                checked={notifications.marketingEmails}
                onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                className="touch-target"
              />
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Account Actions */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-500 nutrisnap-border flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <BrutalistCardTitle className="text-xl sm:text-2xl">ACCOUNT</BrutalistCardTitle>
            </div>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-3">
            <BrutalistButton
              variant="outline"
              className="w-full justify-start border-black text-black hover:bg-black hover:text-white touch-target"
            >
              <Shield className="w-4 h-4 mr-3" />
              PRIVACY & SECURITY
            </BrutalistButton>

            <BrutalistButton
              variant="outline"
              className="w-full justify-start border-black text-black hover:bg-black hover:text-white touch-target"
            >
              <HelpCircle className="w-4 h-4 mr-3" />
              HELP & SUPPORT
            </BrutalistButton>

            <div className="w-full border-t-2 border-black my-4"></div>

            <BrutalistButton
              variant="outline"
              className="w-full justify-start border-red-500 text-red-600 hover:bg-red-500 hover:text-white touch-target"
            >
              <LogOut className="w-4 h-4 mr-3" />
              SIGN OUT
            </BrutalistButton>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Save Changes */}
        <div className="flex gap-4">
          <BrutalistButton
            variant="outline"
            className="flex-1 border-black text-black hover:bg-black hover:text-white touch-target"
          >
            CANCEL
          </BrutalistButton>
          <BrutalistButton className="flex-1 bg-lime-400 text-black hover:bg-lime-300 nutrisnap-shadow touch-target">
            SAVE CHANGES
          </BrutalistButton>
        </div>
      </div>

      <BrutalistBottomNavigation />
    </div>
  )
}
