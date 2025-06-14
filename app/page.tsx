"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Camera, Upload, Zap, Target, TrendingUp, Users, ArrowRight, Square, Sparkles, Brain, Cpu } from "lucide-react"
import { BrutalistButton } from "@/components/ui/brutalist-button"
import {
  BrutalistCard,
  BrutalistCardContent,
  BrutalistCardHeader,
  BrutalistCardTitle,
  BrutalistCardDescription,
} from "@/components/ui/brutalist-card"
import { BrutalistBadge } from "@/components/ui/brutalist-badge"
import Link from "next/link"

export default function NutriSnapLandingPage() {
  const [isCapturing, setIsCapturing] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setHeroLoaded(true)
  }, [])

  const handleCameraCapture = useCallback(() => {
    setIsCapturing(true)
    setTimeout(() => {
      setIsCapturing(false)
      window.location.href = "/recognize"
    }, 1000)
  }, [])

  const handleFileUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      window.location.href = "/recognize"
    }
  }, [])

  return (
    <div className="min-h-screen hero-brutalist-bg">
      {/* Header */}
      <header className="bg-white nutrisnap-border-thin border-t-0 border-l-0 border-r-0 sticky top-0 z-50">
        <div className="container mx-auto mobile-padding py-3 sm:py-6">
          <div className="flex justify-between items-center">
            <div className={`flex items-center space-x-2 sm:space-x-4 ${heroLoaded ? "nutrisnap-slide-in" : ""}`}>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black flex items-center justify-center nutrisnap-border">
                <Square className="w-4 h-4 sm:w-6 sm:h-6 text-lime-400 fill-lime-400" />
              </div>
              <span className="nutrisnap-title text-xl sm:text-3xl">NUTRISNAP</span>
            </div>
            <div className="flex space-x-2 sm:space-x-3">
              <Link href="/auth/login">
                <BrutalistButton variant="outline" size="sm" className="text-xs sm:text-sm touch-target">
                  LOGIN
                </BrutalistButton>
              </Link>
              <Link href="/auth/signup">
                <BrutalistButton variant="primary" size="sm" className="text-xs sm:text-sm touch-target">
                  SIGN UP
                </BrutalistButton>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Reduced Height Hero Section */}
      <section className="container mx-auto mobile-padding py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="nutrisnap-grid gap-6 sm:gap-12 items-center">
            {/* Left Column - Dynamic Content */}
            <div className="space-y-6 sm:space-y-10">
              <div className={`space-y-4 sm:space-y-6 ${heroLoaded ? "nutrisnap-slide-in" : ""}`}>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <BrutalistBadge variant="accent" className="nutrisnap-shadow-sm nutrisnap-bounce-in text-xs">
                    <Brain className="w-3 h-3 mr-1" />
                    AI-POWERED
                  </BrutalistBadge>
                  <BrutalistBadge
                    variant="success"
                    className="nutrisnap-shadow-sm nutrisnap-bounce-in text-xs"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    INSTANT SCAN
                  </BrutalistBadge>
                  <BrutalistBadge
                    variant="secondary"
                    className="nutrisnap-shadow-sm nutrisnap-bounce-in text-xs"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <Cpu className="w-3 h-3 mr-1" />
                    BRUTALIST UI
                  </BrutalistBadge>
                </div>

                <h1 className="nutrisnap-title text-4xl sm:text-7xl lg:text-9xl leading-none">
                  <span className="block">SNAP.</span>
                  <span className="block text-lime-400">SCAN.</span>
                  <span className="block text-blue-500">TRACK.</span>
                  <span className="block text-orange-500">OPTIMIZE.</span>
                </h1>

                <div className="max-w-2xl">
                  <p className="nutrisnap-body text-lg sm:text-2xl text-gray-800 mb-4 sm:mb-6">
                    REVOLUTIONARY AI NUTRITION TRACKING THAT TRANSFORMS YOUR SMARTPHONE INTO A MOLECULAR-LEVEL FOOD
                    ANALYZER.
                  </p>
                  <p className="nutrisnap-subtitle text-xs sm:text-sm text-gray-600">
                    NO MORE MANUAL LOGGING. NO MORE GUESSING. JUST PURE, INSTANT NUTRITION DATA.
                  </p>
                </div>
              </div>

              {/* Dynamic CTA Section */}
              <div
                className={`flex flex-col gap-4 sm:flex-row sm:gap-6 ${heroLoaded ? "nutrisnap-bounce-in" : ""}`}
                style={{ animationDelay: "0.6s" }}
              >
                <Link href="/auth/signup" className="w-full sm:w-auto">
                  <BrutalistButton
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto bg-lime-400 text-black hover:bg-lime-300 nutrisnap-pulse-glow touch-target"
                  >
                    START TRACKING NOW
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
                  </BrutalistButton>
                </Link>
                <BrutalistButton
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-black text-black hover:bg-black hover:text-white touch-target"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  WATCH AI DEMO
                </BrutalistButton>
              </div>

              {/* Stats Row */}
              <div
                className={`nutrisnap-grid-3 gap-4 sm:gap-6 ${heroLoaded ? "nutrisnap-slide-in" : ""}`}
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-center">
                  <div className="nutrisnap-title text-2xl sm:text-4xl text-lime-400">3SEC</div>
                  <div className="nutrisnap-subtitle text-xs text-gray-600">SCAN TIME</div>
                </div>
                <div className="text-center">
                  <div className="nutrisnap-title text-2xl sm:text-4xl text-blue-500">94%</div>
                  <div className="nutrisnap-subtitle text-xs text-gray-600">AI ACCURACY</div>
                </div>
                <div className="text-center">
                  <div className="nutrisnap-title text-2xl sm:text-4xl text-orange-500">900K+</div>
                  <div className="nutrisnap-subtitle text-xs text-gray-600">FOOD DATABASE</div>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Camera */}
            <div className={`${heroLoaded ? "nutrisnap-float" : ""}`}>
              <BrutalistCard className="max-w-lg mx-auto nutrisnap-shadow-lg">
                <BrutalistCardContent className="p-4 sm:p-8">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 nutrisnap-border mb-4 sm:mb-8 flex items-center justify-center relative overflow-hidden">
                    {isCapturing ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-lime-400 nutrisnap-border nutrisnap-loading mb-4 sm:mb-6"></div>
                        <p className="nutrisnap-subtitle text-xs sm:text-sm">AI ANALYZING...</p>
                        <div className="mt-2 sm:mt-4 flex space-x-2">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-lime-400 nutrisnap-border"></div>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 nutrisnap-border"></div>
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 nutrisnap-border"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="w-16 h-16 sm:w-24 sm:h-24 text-gray-600 mx-auto mb-4 sm:mb-6" />
                        <p className="nutrisnap-title text-lg sm:text-xl text-gray-700 mb-2">POINT & CAPTURE</p>
                        <p className="nutrisnap-body text-xs sm:text-sm text-gray-500">AI VISION READY</p>
                      </div>
                    )}

                    {/* Advanced Viewfinder */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 border-4 border-lime-400 opacity-60"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 nutrisnap-border border-white"></div>

                      {/* Corner Brackets */}
                      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-t-4 border-lime-400"></div>
                      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-t-4 border-lime-400"></div>
                      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-b-4 border-lime-400"></div>
                      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-b-4 border-lime-400"></div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <BrutalistButton
                      onClick={handleCameraCapture}
                      disabled={isCapturing}
                      variant="primary"
                      size="lg"
                      className="w-full bg-lime-400 text-black hover:bg-lime-300 touch-target"
                    >
                      {isCapturing ? "AI PROCESSING..." : "CAPTURE FOOD"}
                    </BrutalistButton>

                    <BrutalistButton
                      onClick={handleFileUpload}
                      variant="outline"
                      size="lg"
                      className="w-full border-black text-black hover:bg-black hover:text-white touch-target"
                    >
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      UPLOAD IMAGE
                    </BrutalistButton>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </BrutalistCardContent>
              </BrutalistCard>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-black text-white py-12 sm:py-20">
        <div className="container mx-auto mobile-padding">
          <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-16">
            <h2 className="nutrisnap-title text-3xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6">HOW IT WORKS</h2>
            <p className="nutrisnap-body text-lg sm:text-2xl text-gray-300">THREE STEPS TO NUTRITION MASTERY</p>
          </div>

          <div className="nutrisnap-grid-3 gap-6 sm:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-lime-400 nutrisnap-border mx-auto mb-4 sm:mb-8 flex items-center justify-center nutrisnap-hover">
                <span className="nutrisnap-title text-xl sm:text-3xl text-black">01</span>
              </div>
              <h3 className="nutrisnap-subtitle text-lg sm:text-2xl mb-2 sm:mb-4 text-lime-400">CAPTURE</h3>
              <p className="nutrisnap-body text-sm sm:text-base text-gray-300">
                POINT CAMERA AT ANY FOOD AND CAPTURE WITH AI PRECISION
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-yellow-400 nutrisnap-border mx-auto mb-4 sm:mb-8 flex items-center justify-center nutrisnap-hover">
                <span className="nutrisnap-title text-xl sm:text-3xl text-black">02</span>
              </div>
              <h3 className="nutrisnap-subtitle text-lg sm:text-2xl mb-2 sm:mb-4 text-yellow-400">ANALYZE</h3>
              <p className="nutrisnap-body text-sm sm:text-base text-gray-300">
                AI INSTANTLY IDENTIFIES FOOD AND CALCULATES NUTRITION
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-500 nutrisnap-border mx-auto mb-4 sm:mb-8 flex items-center justify-center nutrisnap-hover">
                <span className="nutrisnap-title text-xl sm:text-3xl text-white">03</span>
              </div>
              <h3 className="nutrisnap-subtitle text-lg sm:text-2xl mb-2 sm:mb-4 text-blue-400">OPTIMIZE</h3>
              <p className="nutrisnap-body text-sm sm:text-base text-gray-300">
                GET COMPLETE DATA AND OPTIMIZE YOUR NUTRITION GOALS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-12 sm:py-20">
        <div className="container mx-auto mobile-padding">
          <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-16">
            <h2 className="nutrisnap-title text-3xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6">FEATURES</h2>
            <p className="nutrisnap-body text-lg sm:text-2xl text-gray-700">BUILT FOR MAXIMUM EFFICIENCY</p>
          </div>

          <div className="nutrisnap-grid gap-4 sm:gap-8">
            <BrutalistCard className="nutrisnap-hover">
              <BrutalistCardHeader>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-400 nutrisnap-border flex items-center justify-center mb-4 sm:mb-6">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <BrutalistCardTitle className="text-lg sm:text-xl">3-SECOND SCANNING</BrutalistCardTitle>
                <BrutalistCardDescription className="text-sm">
                  INSTANT FOOD RECOGNITION WITH 94% AI ACCURACY
                </BrutalistCardDescription>
              </BrutalistCardHeader>
            </BrutalistCard>

            <BrutalistCard className="nutrisnap-hover">
              <BrutalistCardHeader>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 nutrisnap-border flex items-center justify-center mb-4 sm:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <BrutalistCardTitle className="text-lg sm:text-xl">SMART PORTIONS</BrutalistCardTitle>
                <BrutalistCardDescription className="text-sm">
                  AI ANALYZES PHOTOS FOR PRECISE PORTION ESTIMATION
                </BrutalistCardDescription>
              </BrutalistCardHeader>
            </BrutalistCard>

            <BrutalistCard className="nutrisnap-hover">
              <BrutalistCardHeader>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 nutrisnap-border flex items-center justify-center mb-4 sm:mb-6">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <BrutalistCardTitle className="text-lg sm:text-xl">INTELLIGENT INSIGHTS</BrutalistCardTitle>
                <BrutalistCardDescription className="text-sm">
                  PERSONALIZED NUTRITION ANALYTICS AND PROGRESS TRACKING
                </BrutalistCardDescription>
              </BrutalistCardHeader>
            </BrutalistCard>

            <BrutalistCard className="nutrisnap-hover">
              <BrutalistCardHeader>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 nutrisnap-border flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                </div>
                <BrutalistCardTitle className="text-lg sm:text-xl">900K+ DATABASE</BrutalistCardTitle>
                <BrutalistCardDescription className="text-sm">
                  COMPREHENSIVE NUTRITION DATA FOR EVERY FOOD IMAGINABLE
                </BrutalistCardDescription>
              </BrutalistCardHeader>
            </BrutalistCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-lime-400 text-black py-12 sm:py-20">
        <div className="container mx-auto mobile-padding text-center">
          <h2 className="nutrisnap-title text-3xl sm:text-5xl lg:text-7xl mb-4 sm:mb-8">READY TO START?</h2>
          <p className="nutrisnap-body text-lg sm:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto">
            JOIN THOUSANDS OF USERS WHO HAVE REVOLUTIONIZED THEIR NUTRITION TRACKING WITH AI PRECISION
          </p>
          <Link href="/auth/signup">
            <BrutalistButton
              variant="outline"
              size="xl"
              className="border-black text-black hover:bg-black hover:text-lime-400 nutrisnap-shadow-lg touch-target"
            >
              GET STARTED FREE
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
            </BrutalistButton>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 sm:py-16">
        <div className="container mx-auto mobile-padding">
          <div className="nutrisnap-grid-2 gap-6 sm:gap-12">
            <div>
              <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-lime-400 flex items-center justify-center nutrisnap-border">
                  <Square className="w-6 h-6 sm:w-8 sm:h-8 text-black fill-black" />
                </div>
                <span className="nutrisnap-title text-2xl sm:text-3xl">NUTRISNAP</span>
              </div>
              <p className="nutrisnap-body text-gray-400 max-w-md text-sm sm:text-lg">
                AI-POWERED NUTRITION TRACKING FOR THE MODERN WORLD
              </p>
            </div>

            <div className="nutrisnap-grid-2 gap-4 sm:gap-8">
              <div>
                <h4 className="nutrisnap-subtitle text-xs sm:text-sm mb-4 sm:mb-6 text-lime-400">PRODUCT</h4>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <li>
                    <Link href="/features" className="hover:text-lime-400 transition-colors">
                      FEATURES
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-lime-400 transition-colors">
                      PRICING
                    </Link>
                  </li>
                  <li>
                    <Link href="/api" className="hover:text-lime-400 transition-colors">
                      API
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="nutrisnap-subtitle text-xs sm:text-sm mb-4 sm:mb-6 text-lime-400">SUPPORT</h4>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <li>
                    <Link href="/help" className="hover:text-lime-400 transition-colors">
                      HELP
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-lime-400 transition-colors">
                      CONTACT
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-lime-400 transition-colors">
                      PRIVACY
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="nutrisnap-subtitle text-xs text-gray-500">© 2024 NUTRISNAP. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
