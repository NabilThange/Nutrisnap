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
import { BrutalistInput } from "@/components/ui/brutalist-input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BrutalistBadge } from "@/components/ui/brutalist-badge"
import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit, Target, Award } from "lucide-react"
import { BrutalistBottomNavigation } from "@/components/brutalist-bottom-nav"
import { BrutalistLoading } from "@/components/brutalist-loading"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function BrutalistProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    height: 0,
    weight: 0,
    activityLevel: "sedentary",
    goal: "maintain-weight",
  })

  const [notifications, setNotifications] = useState({
    mealReminders: true,
    goalAchievements: true,
    weeklyReports: false,
    marketingEmails: false,
  })

  const [stats, setStats] = useState({
    daysActive: 0,
    mealsLogged: 0,
    streakDays: 0,
    accuracy: 0,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsLoggedIn(true);
          const fetchUserData = async () => {
            try {
              const res = await fetch("/api/user/me")
              if (!res.ok) {
                throw new Error(`Failed to fetch user data: ${res.statusText}`)
              }
              const data = await res.json()
              setProfile(data)
              setStats({
                daysActive: 28,
                mealsLogged: 142,
                streakDays: 7,
                accuracy: 94,
              });
            } catch (err: any) {
              console.error("Error fetching user data:", err)
              setError(err.message || "An unknown error occurred")
            } finally {
              setIsLoading(false)
            }
          }
          fetchUserData();
        } else {
          setIsLoggedIn(false);
          setProfile({
            firstName: "Guest",
            lastName: "User",
            email: "guest@example.com",
            age: 25,
            height: 170,
            weight: 70,
            activityLevel: "sedentary",
            goal: "maintain-weight",
          });
          setStats({
            daysActive: 0,
            mealsLogged: 0,
            streakDays: 0,
            accuracy: 0,
          });
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error("Error checking session:", err);
        setError(err.message || "Failed to check user session.");
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const handleProfileUpdate = (field: string, value: string | number) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (setting: string) => {
    setNotifications((prev) => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  const handleSaveChanges = async () => {
    if (!isLoggedIn) {
      alert("Please sign in to save changes.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/user/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        throw new Error('Failed to update profile');
      }
      alert('Profile updated successfully!');
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isLoggedIn === null) {
    return (
      <div className="min-h-screen brutalist-bg flex items-center justify-center">
        <BrutalistLoading size="lg" text="LOADING PROFILE..." />
      </div>
    )
  }

  if (error && isLoggedIn) {
    return (
      <div className="min-h-screen brutalist-bg flex items-center justify-center">
        <BrutalistCard className="w-full max-w-md mx-4 text-center p-8">
          <BrutalistCardTitle>ERROR</BrutalistCardTitle>
          <BrutalistCardDescription className="text-red-500">{error}</BrutalistCardDescription>
          <p className="mt-4">Please try again later.</p>
        </BrutalistCard>
      </div>
    )
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
              disabled={!isLoggedIn}
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
                  readOnly={!isLoggedIn}
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
                  readOnly={!isLoggedIn}
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
                readOnly
                className="touch-target bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
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
                  readOnly={!isLoggedIn}
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
                  readOnly={!isLoggedIn}
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
                  readOnly={!isLoggedIn}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activityLevel" className="nutrisnap-subtitle text-xs">
                ACTIVITY LEVEL
              </Label>
              <Select
                value={profile.activityLevel}
                onValueChange={(value) => handleProfileUpdate("activityLevel", value)}
                disabled={!isLoggedIn}
              >
                <SelectTrigger className="w-full brutalist-input touch-target">
                  <SelectValue placeholder="SELECT ACTIVITY LEVEL" />
                </SelectTrigger>
                <SelectContent className="brutalist-card brutalist-shadow">
                  <SelectItem value="sedentary">SEDENTARY (LITTLE TO NO EXERCISE)</SelectItem>
                  <SelectItem value="lightly-active">LIGHTLY ACTIVE (LIGHT EXERCISE/SPORTS 1-3 DAYS/WEEK)</SelectItem>
                  <SelectItem value="moderately-active">MODERATELY ACTIVE (MODERATE EXERCISE/SPORTS 3-5 DAYS/WEEK)</SelectItem>
                  <SelectItem value="very-active">VERY ACTIVE (HARD EXERCISE/SPORTS 6-7 DAYS/WEEK)</SelectItem>
                  <SelectItem value="extra-active">EXTRA ACTIVE (VERY HARD EXERCISE/PHYSICAL JOB)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal" className="nutrisnap-subtitle text-xs">GOAL</Label>
              <Select
                value={profile.goal}
                onValueChange={(value) => handleProfileUpdate("goal", value)}
                disabled={!isLoggedIn}
              >
                <SelectTrigger className="w-full brutalist-input touch-target">
                  <SelectValue placeholder="SELECT YOUR GOAL" />
                </SelectTrigger>
                <SelectContent className="brutalist-card brutalist-shadow">
                  <SelectItem value="lose-weight">LOSE WEIGHT</SelectItem>
                  <SelectItem value="maintain-weight">MAINTAIN WEIGHT</SelectItem>
                  <SelectItem value="gain-weight">GAIN WEIGHT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <BrutalistButton
              onClick={handleSaveChanges}
              className="w-full bg-blue-500 text-white hover:bg-blue-400 nutrisnap-shadow touch-target"
              disabled={isLoading || !isLoggedIn}
            >
              SAVE CHANGES
            </BrutalistButton>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Notification Settings */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-lime-500 nutrisnap-border flex items-center justify-center">
                <Bell className="w-6 h-6 text-black" />
              </div>
              <BrutalistCardTitle className="text-xl sm:text-2xl">NOTIFICATIONS</BrutalistCardTitle>
            </div>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="mealReminders" className="nutrisnap-subtitle">
                MEAL REMINDERS
              </Label>
              <Switch
                id="mealReminders"
                checked={notifications.mealReminders}
                onCheckedChange={() => handleNotificationToggle("mealReminders")}
                className="touch-target"
                disabled={!isLoggedIn}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="goalAchievements" className="nutrisnap-subtitle">
                GOAL ACHIEVEMENTS
              </Label>
              <Switch
                id="goalAchievements"
                checked={notifications.goalAchievements}
                onCheckedChange={() => handleNotificationToggle("goalAchievements")}
                className="touch-target"
                disabled={!isLoggedIn}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weeklyReports" className="nutrisnap-subtitle">
                WEEKLY REPORTS
              </Label>
              <Switch
                id="weeklyReports"
                checked={notifications.weeklyReports}
                onCheckedChange={() => handleNotificationToggle("weeklyReports")}
                className="touch-target"
                disabled={!isLoggedIn}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="marketingEmails" className="nutrisnap-subtitle">
                MARKETING EMAILS
              </Label>
              <Switch
                id="marketingEmails"
                checked={notifications.marketingEmails}
                onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                className="touch-target"
                disabled={!isLoggedIn}
              />
            </div>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* General Settings */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 nutrisnap-border flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <BrutalistCardTitle className="text-xl sm:text-2xl">GENERAL SETTINGS</BrutalistCardTitle>
            </div>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-4">
            <BrutalistButton
              className="w-full bg-gray-200 text-black hover:bg-gray-100 nutrisnap-shadow touch-target"
              disabled={!isLoggedIn}
            >
              CHANGE PASSWORD
            </BrutalistButton>
            <BrutalistButton
              className="w-full bg-gray-200 text-black hover:bg-gray-100 nutrisnap-shadow touch-target"
              disabled={!isLoggedIn}
            >
              MANAGE PRIVACY
            </BrutalistButton>
            <BrutalistButton
              className="w-full bg-gray-200 text-black hover:bg-gray-100 nutrisnap-shadow touch-target"
              disabled={!isLoggedIn}
            >
              DOWNLOAD MY DATA
            </BrutalistButton>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Support & Legal */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-500 nutrisnap-border flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <BrutalistCardTitle className="text-xl sm:text-2xl">SUPPORT & LEGAL</BrutalistCardTitle>
            </div>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-4">
            <Link href="/support" className="block brutalist-button w-full brutalist-shadow hover:bg-gray-100 text-left pl-4 py-3">
              GET HELP
            </Link>
            <Link href="/terms" className="block brutalist-button w-full brutalist-shadow hover:bg-gray-100 text-left pl-4 py-3">
              TERMS OF SERVICE
            </Link>
            <Link href="/privacy" className="block brutalist-button w-full brutalist-shadow hover:bg-gray-100 text-left pl-4 py-3">
              PRIVACY POLICY
            </Link>
          </BrutalistCardContent>
        </BrutalistCard>

        {/* Logout */}
        <BrutalistCard className="nutrisnap-shadow">
          <BrutalistCardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500 nutrisnap-border flex items-center justify-center">
                <LogOut className="w-6 h-6 text-white" />
              </div>
              <BrutalistCardTitle className="text-xl sm:text-2xl">ACCOUNT ACTIONS</BrutalistCardTitle>
            </div>
          </BrutalistCardHeader>
          <BrutalistCardContent className="space-y-4">
            <BrutalistButton
              onClick={async () => {
                await supabase.auth.signOut();
                alert("Logged out successfully!");
                window.location.href = "/";
              }}
              className="w-full bg-red-500 text-white hover:bg-red-400 nutrisnap-shadow touch-target"
              disabled={!isLoggedIn}
            >
              LOG OUT
            </BrutalistButton>
          </BrutalistCardContent>
        </BrutalistCard>
      </div>
      <BrutalistBottomNavigation />
    </div>
  )
}
