import * as React from "react"
import { cn } from "@/lib/utils"

const BrutalistCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "brutalist-concrete brutalist-border brutalist-shadow bg-white p-6 text-card-foreground",
        className,
      )}
      {...props}
    />
  ),
)
BrutalistCard.displayName = "BrutalistCard"

const BrutalistCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 pb-4", className)} {...props} />
  ),
)
BrutalistCardHeader.displayName = "BrutalistCardHeader"

const BrutalistCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("brutalist-title text-2xl font-black leading-none tracking-tight", className)}
      {...props}
    />
  ),
)
BrutalistCardTitle.displayName = "BrutalistCardTitle"

const BrutalistCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("brutalist-subtitle text-sm text-muted-foreground", className)} {...props} />
  ),
)
BrutalistCardDescription.displayName = "BrutalistCardDescription"

const BrutalistCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("pt-0", className)} {...props} />,
)
BrutalistCardContent.displayName = "BrutalistCardContent"

const BrutalistCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center pt-4", className)} {...props} />,
)
BrutalistCardFooter.displayName = "BrutalistCardFooter"

export {
  BrutalistCard,
  BrutalistCardHeader,
  BrutalistCardFooter,
  BrutalistCardTitle,
  BrutalistCardDescription,
  BrutalistCardContent,
}
