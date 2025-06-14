"use client"

import type React from "react"
import { useState } from "react"
import { BrutalistButton } from "@/components/ui/brutalist-button"
import { BrutalistInput } from "@/components/ui/brutalist-input"
import { Label } from "@/components/ui/label"
import {
  BrutalistCard,
  BrutalistCardContent,
  BrutalistCardDescription,
  BrutalistCardHeader,
  BrutalistCardTitle,
} from "@/components/ui/brutalist-card"
import { Eye, EyeOff, Square, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function NutriSnapLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen nutrisnap-bg flex items-center justify-center mobile-padding py-8">
      <BrutalistCard className="w-full max-w-md nutrisnap-shadow-lg">
        <BrutalistCardHeader className="text-center mobile-padding">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-lime-400 nutrisnap-border flex items-center justify-center">
              <Square className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-black" />
            </div>
            <span className="nutrisnap-title text-xl sm:text-2xl">NUTRISNAP</span>
          </div>
          <BrutalistCardTitle className="text-2xl sm:text-3xl mb-2">WELCOME BACK</BrutalistCardTitle>
          <BrutalistCardDescription className="nutrisnap-subtitle text-xs sm:text-sm">
            SIGN IN TO CONTINUE YOUR NUTRITION JOURNEY
          </BrutalistCardDescription>
        </BrutalistCardHeader>

        <BrutalistCardContent className="mobile-padding">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="email" className="nutrisnap-subtitle text-xs">
                EMAIL ADDRESS
              </Label>
              <BrutalistInput
                id="email"
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="nutrisnap-hover touch-target"
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="password" className="nutrisnap-subtitle text-xs">
                PASSWORD
              </Label>
              <div className="relative">
                <BrutalistInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="ENTER YOUR PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="nutrisnap-hover pr-12 touch-target"
                />
                <BrutalistButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 touch-target"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-600" />
                  )}
                </BrutalistButton>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/auth/forgot-password"
                className="nutrisnap-subtitle text-xs text-blue-500 hover:text-blue-600 transition-colors touch-target"
              >
                FORGOT PASSWORD?
              </Link>
            </div>

            <BrutalistButton
              type="submit"
              className="w-full bg-lime-400 text-black hover:bg-lime-300 nutrisnap-shadow touch-target"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-black nutrisnap-loading mr-2"></div>
                  SIGNING IN...
                </div>
              ) : (
                <>
                  SIGN IN
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </BrutalistButton>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-2 border-black" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 nutrisnap-subtitle text-gray-500">OR CONTINUE WITH</span>
              </div>
            </div>

            <BrutalistButton
              variant="outline"
              type="button"
              className="w-full border-black text-black hover:bg-black hover:text-white touch-target"
              size="lg"
            >
              <div className="w-5 h-5 mr-3 bg-gradient-to-r from-blue-500 to-red-500 nutrisnap-border"></div>
              GOOGLE
            </BrutalistButton>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <span className="nutrisnap-body text-sm text-gray-600">DON'T HAVE AN ACCOUNT? </span>
            <Link
              href="/auth/signup"
              className="nutrisnap-subtitle text-sm text-lime-500 hover:text-lime-600 transition-colors touch-target"
            >
              SIGN UP
            </Link>
          </div>
        </BrutalistCardContent>
      </BrutalistCard>
    </div>
  )
}
