"use client"

import { useState, useEffect } from "react"
import { Check, Zap } from "lucide-react"

interface FoodLogAnimationProps {
  isVisible: boolean
  onComplete: () => void
  foodName?: string
}

export function FoodLogAnimation({ isVisible, onComplete, foodName = "FOOD" }: FoodLogAnimationProps) {
  const [stage, setStage] = useState<"muscle" | "check" | "complete">("muscle")

  useEffect(() => {
    if (!isVisible) {
      setStage("muscle")
      return
    }

    const timer1 = setTimeout(() => {
      setStage("check")
    }, 1500)

    const timer2 = setTimeout(() => {
      setStage("complete")
      onComplete()
    }, 2500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="text-center">
        {stage === "muscle" && (
          <div className="nutrisnap-bounce-in">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-lime-400 nutrisnap-border mx-auto mb-6 flex items-center justify-center nutrisnap-muscle-flex">
              <span className="text-6xl sm:text-7xl">💪</span>
            </div>
            <h2 className="nutrisnap-title text-2xl sm:text-4xl text-white mb-2">POWERING UP!</h2>
            <p className="nutrisnap-subtitle text-sm text-lime-400">LOGGING {foodName.toUpperCase()}</p>
            <div className="flex justify-center space-x-2 mt-4">
              <div className="w-3 h-3 bg-lime-400 nutrisnap-border nutrisnap-loading"></div>
              <div
                className="w-3 h-3 bg-yellow-400 nutrisnap-border nutrisnap-loading"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-3 h-3 bg-blue-500 nutrisnap-border nutrisnap-loading"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )}

        {stage === "check" && (
          <div className="nutrisnap-bounce-in">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-lime-400 nutrisnap-border mx-auto mb-6 flex items-center justify-center nutrisnap-pulse-glow">
              <Check className="w-16 h-16 sm:w-20 sm:h-20 text-black" />
            </div>
            <h2 className="nutrisnap-title text-2xl sm:text-4xl text-lime-400 mb-2">LOGGED!</h2>
            <p className="nutrisnap-subtitle text-sm text-white">NUTRITION DATA SAVED</p>
            <div className="flex justify-center space-x-2 mt-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="nutrisnap-body text-sm text-yellow-400">+10 XP GAINED</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
