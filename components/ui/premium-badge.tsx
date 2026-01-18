'use client'

import * as React from "react"
import { Crown } from "lucide-react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const premiumBadgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 font-medium transition-all",
  {
    variants: {
      variant: {
        full: "px-3 py-1.5 rounded-full",
        compact: "px-2.5 py-1 rounded-full",
        "icon-only": "p-1.5 rounded-full",
      },
      prominence: {
        prominent: [
          "bg-gradient-to-r from-amber-50/80 to-orange-50/80",
          "backdrop-blur-sm",
          "border-2 border-amber-200/60",
          "shadow-sm shadow-amber-500/10",
          "text-amber-700",
        ],
        subtle: [
          "bg-amber-50/30",
          "backdrop-blur-sm",
          "border border-amber-200/40",
          "text-amber-600",
        ],
      },
    },
    defaultVariants: {
      variant: "full",
      prominence: "subtle",
    },
  }
)

const iconVariants = cva("", {
  variants: {
    prominence: {
      prominent: "w-4 h-4 text-amber-600",
      subtle: "w-3.5 h-3.5 text-amber-600",
    },
  },
  defaultVariants: {
    prominence: "subtle",
  },
})

const textVariants = cva("", {
  variants: {
    prominence: {
      prominent: "text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent",
      subtle: "text-xs font-medium text-amber-700",
    },
  },
  defaultVariants: {
    prominence: "subtle",
  },
})

export interface PremiumBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof premiumBadgeVariants> {
  showLabel?: boolean
  animated?: boolean
}

export function PremiumBadge({
  variant = "full",
  prominence = "subtle",
  showLabel = true,
  animated = true,
  className,
  ...props
}: PremiumBadgeProps) {
  const shouldShowLabel = variant !== "icon-only" && showLabel

  const badge = (
    <div
      className={cn(premiumBadgeVariants({ variant, prominence }), className)}
      aria-label="Usuario Premium"
      role="status"
      {...props}
    >
      <Crown className={cn(iconVariants({ prominence }))} aria-hidden="true" />
      {shouldShowLabel && (
        <span className={cn(textVariants({ prominence }))}>Premium</span>
      )}
    </div>
  )

  if (!animated) {
    return badge
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {badge}
    </motion.div>
  )
}
