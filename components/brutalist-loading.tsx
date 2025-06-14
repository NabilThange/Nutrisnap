interface BrutalistLoadingProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function BrutalistLoading({ size = "md", text }: BrutalistLoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} brutalist-loading brutalist-border bg-red-500`} />
        <div className={`${sizeClasses[size]} brutalist-border bg-yellow-400 absolute top-2 left-2 -z-10`} />
        <div className={`${sizeClasses[size]} brutalist-border bg-blue-500 absolute top-4 left-4 -z-20`} />
      </div>
      {text && <p className="brutalist-subtitle text-sm text-center max-w-xs">{text}</p>}
    </div>
  )
}
