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
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Square, Sparkles } from "lucide-react"
import Link from "next/link"

export default function NutriSnapSignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("PASSWORDS DO NOT MATCH")
      return
    }
    if (!agreeToTerms) {
      alert("PLEASE AGREE TO TERMS AND CONDITIONS")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/onboarding"
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
          <BrutalistCardTitle className="text-2xl sm:text-3xl mb-2">CREATE ACCOUNT</BrutalistCardTitle>
          <BrutalistCardDescription className="nutrisnap-subtitle text-xs sm:text-sm">
            START YOUR AI-POWERED NUTRITION JOURNEY
          </BrutalistCardDescription>
        </BrutalistCardHeader>

        <BrutalistCardContent className="mobile-padding">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="nutrisnap-grid-2 gap-3 sm:gap-4">
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="firstName" className="nutrisnap-subtitle text-xs">
                  FIRST NAME
                </Label>
                <BrutalistInput
                  id="firstName"
                  placeholder="JOHN"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                  className="nutrisnap-hover touch-target"
                />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="lastName" className="nutrisnap-subtitle text-xs">
                  LAST NAME
                </Label>
                <BrutalistInput
                  id="lastName"
                  placeholder="DOE"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                  className="nutrisnap-hover touch-target"
                />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="email" className="nutrisnap-subtitle text-xs">
                EMAIL ADDRESS
              </Label>
              <BrutalistInput
                id="email"
                type="email"
                placeholder="JOHN@EXAMPLE.COM"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                  placeholder="CREATE STRONG PASSWORD"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
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

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="confirmPassword" className="nutrisnap-subtitle text-xs">
                CONFIRM PASSWORD
              </Label>
              <div className="relative">
                <BrutalistInput
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="CONFIRM YOUR PASSWORD"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="nutrisnap-hover pr-12 touch-target"
                />
                <BrutalistButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 touch-target"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-600" />
                  )}
                </BrutalistButton>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="nutrisnap-border mt-1 touch-target"
              />
              <Label htmlFor="terms" className="nutrisnap-body text-sm leading-relaxed">
                I AGREE TO THE{" "}
                <Link href="/terms" className="text-lime-500 hover:text-lime-600 transition-colors">
                  TERMS OF SERVICE
                </Link>{" "}
                AND{" "}
                <Link href="/privacy" className="text-lime-500 hover:text-lime-600 transition-colors">
                  PRIVACY POLICY
                </Link>
              </Label>
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
                  CREATING ACCOUNT...
                </div>
              ) : (
                <>
                  CREATE ACCOUNT
                  <Sparkles className="w-5 h-5 ml-2" />
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
            <span className="nutrisnap-body text-sm text-gray-600">ALREADY HAVE AN ACCOUNT? </span>
            <Link
              href="/auth/login"
              className="nutrisnap-subtitle text-sm text-lime-500 hover:text-lime-600 transition-colors touch-target"
            >
              SIGN IN
            </Link>
          </div>
        </BrutalistCardContent>
      </BrutalistCard>
    </div>
  )
}
