import * as React from "react"
import { cn } from "@/lib/utils"

export interface BrutalistInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const BrutalistInput = React.forwardRef<HTMLInputElement, BrutalistInputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full brutalist-border bg-white px-4 py-3 text-sm font-bold uppercase tracking-wider placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 brutalist-shadow-sm transition-all duration-100 focus:translate-x-[-2px] focus:translate-y-[-2px] focus:shadow-[6px_6px_0px_0px_black]",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
BrutalistInput.displayName = "BrutalistInput"

export { BrutalistInput }
