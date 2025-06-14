import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const brutalistButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-wider transition-all duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 brutalist-border brutalist-shadow brutalist-hover brutalist-press",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-gray-100",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border-2 border-black bg-transparent hover:bg-black hover:text-white",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        ghost: "border-0 shadow-none hover:bg-gray-100 hover:shadow-none",
        accent: "bg-yellow-400 text-black hover:bg-yellow-500",
        primary: "bg-black text-white hover:bg-gray-800",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-16 px-8 py-4 text-base",
        xl: "h-20 px-12 py-6 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface BrutalistButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brutalistButtonVariants> {
  asChild?: boolean
}

const BrutalistButton = React.forwardRef<HTMLButtonElement, BrutalistButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(brutalistButtonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
BrutalistButton.displayName = "BrutalistButton"

export { BrutalistButton, brutalistButtonVariants }
