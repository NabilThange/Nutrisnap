"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BrutalistCard, BrutalistCardContent, BrutalistCardHeader, BrutalistCardTitle, BrutalistCardDescription } from "@/components/ui/brutalist-card"
import { BrutalistInput } from "@/components/ui/brutalist-input"
import { BrutalistButton } from "@/components/ui/brutalist-button"
import { Label } from "@/components/ui/label"
import { BrutalistLoading } from "@/components/brutalist-loading"
import { LogIn } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Login failed.")
        return
      }

      // Redirect to the profile page or dashboard on successful login
      router.push("/profile")

    } catch (err: any) {
      console.error("Frontend login error:", err)
      setError(err.message || "An unexpected error occurred during login.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen brutalist-bg flex items-center justify-center p-4">
      <BrutalistCard className="w-full max-w-md brutalist-shadow">
        <BrutalistCardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-lime-400 nutrisnap-border flex items-center justify-center">
              <LogIn className="w-6 h-6 text-black" />
            </div>
            <div>
              <BrutalistCardTitle className="text-2xl sm:text-3xl">LOG IN</BrutalistCardTitle>
              <BrutalistCardDescription className="nutrisnap-subtitle text-xs">
                ACCESS YOUR NUTRISNAP ACCOUNT
              </BrutalistCardDescription>
            </div>
          </div>
        </BrutalistCardHeader>
        <BrutalistCardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="nutrisnap-subtitle text-xs">EMAIL</Label>
              <BrutalistInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="touch-target"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="nutrisnap-subtitle text-xs">PASSWORD</Label>
              <BrutalistInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="touch-target"
              />
            </div>

            {error && (
              <p className="text-red-500 nutrisnap-subtitle text-xs border border-red-500 p-2 brutalist-shadow-sm">ERROR: {error}</p>
            )}

            <BrutalistButton type="submit" className="w-full bg-lime-400 text-black hover:bg-lime-300 nutrisnap-shadow touch-target" disabled={isLoading}>
              {isLoading ? (
                <BrutalistLoading size="sm" text="LOGGING IN..." />
              ) : (
                "LOG IN"
              )}
            </BrutalistButton>
          </form>
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-black" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 nutrisnap-subtitle text-gray-500">OR</span>
            </div>
          </div>
          <BrutalistButton
            onClick={() => router.push('/onboarding')}
            className="w-full bg-gray-300 text-black hover:bg-gray-200 nutrisnap-shadow touch-target"
          >
            CONTINUE WITHOUT SIGN IN
          </BrutalistButton>
          <div className="text-center nutrisnap-subtitle text-xs text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              SIGN UP HERE
            </Link>
          </div>
        </BrutalistCardContent>
      </BrutalistCard>
    </div>
  )
}
