"use client"

import { BrutalistButton } from "@/components/ui/brutalist-button"
import { Home, Camera, BookOpen, BarChart3, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BrutalistBottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", icon: Home, label: "HOME" },
    { href: "/capture", icon: Camera, label: "SCAN" },
    { href: "/log", icon: BookOpen, label: "LOG" },
    { href: "/analytics", icon: BarChart3, label: "DATA" },
    { href: "/profile", icon: User, label: "USER" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white nutrisnap-border-thin border-b-0 z-50">
      <div className="nutrisnap-grid-5 p-3 gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <BrutalistButton
                variant={isActive ? "primary" : "ghost"}
                size="sm"
                className={`w-full flex flex-col items-center py-3 h-auto space-y-2 nutrisnap-hover ${
                  isActive ? "bg-lime-400 text-black nutrisnap-shadow" : "bg-transparent text-black hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="nutrisnap-subtitle text-[9px] tracking-wider">{item.label}</span>
              </BrutalistButton>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
