import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const brutalistBadgeVariants = cva(
  "inline-flex items-center brutalist-border-thin px-3 py-1 text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-white text-black",
        secondary: "bg-gray-200 text-black",
        destructive: "bg-red-500 text-white",
        outline: "bg-transparent text-black",
        accent: "bg-yellow-400 text-black",
        success: "bg-green-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BrutalistBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof brutalistBadgeVariants> {}

function BrutalistBadge({ className, variant, ...props }: BrutalistBadgeProps) {
  return <div className={cn(brutalistBadgeVariants({ variant }), className)} {...props} />
}

export { BrutalistBadge, brutalistBadgeVariants }
