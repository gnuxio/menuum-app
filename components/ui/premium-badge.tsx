'use client'

import * as React from "react"
import { Crown } from "lucide-react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn, formatDate } from "@/lib/utils"

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
          "backdrop-blur-sm",
          "border-2",
          "shadow-sm",
        ],
        subtle: [
          "backdrop-blur-sm",
          "border",
        ],
      },
      status: {
        active: "",
        cancelling: "",
      },
    },
    compoundVariants: [
      // Active + Prominent
      {
        status: "active",
        prominence: "prominent",
        className: [
          "bg-gradient-to-r from-amber-50/80 to-orange-50/80",
          "border-amber-200/60",
          "shadow-amber-500/10",
          "text-amber-700",
        ],
      },
      // Active + Subtle
      {
        status: "active",
        prominence: "subtle",
        className: [
          "bg-amber-50/30",
          "border-amber-200/40",
          "text-amber-600",
        ],
      },
      // Cancelling + Prominent
      {
        status: "cancelling",
        prominence: "prominent",
        className: [
          "bg-gradient-to-r from-orange-50/80 to-red-50/80",
          "border-orange-200/60",
          "shadow-orange-500/10",
          "text-orange-700",
        ],
      },
      // Cancelling + Subtle
      {
        status: "cancelling",
        prominence: "subtle",
        className: [
          "bg-orange-50/30",
          "border-orange-200/40",
          "text-orange-600",
        ],
      },
    ],
    defaultVariants: {
      variant: "full",
      prominence: "subtle",
      status: "active",
    },
  }
)

const iconVariants = cva("", {
  variants: {
    prominence: {
      prominent: "w-4 h-4",
      subtle: "w-3.5 h-3.5",
    },
    status: {
      active: "text-amber-600",
      cancelling: "text-orange-600",
    },
  },
  defaultVariants: {
    prominence: "subtle",
    status: "active",
  },
})

const textVariants = cva("", {
  variants: {
    prominence: {
      prominent: "text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent",
      subtle: "text-xs font-medium",
    },
    status: {
      active: "",
      cancelling: "",
    },
  },
  compoundVariants: [
    {
      prominence: "prominent",
      status: "active",
      className: "from-amber-600 to-orange-600",
    },
    {
      prominence: "prominent",
      status: "cancelling",
      className: "from-orange-600 to-red-600",
    },
    {
      prominence: "subtle",
      status: "active",
      className: "text-amber-700",
    },
    {
      prominence: "subtle",
      status: "cancelling",
      className: "text-orange-700",
    },
  ],
  defaultVariants: {
    prominence: "subtle",
    status: "active",
  },
})

export interface PremiumBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof premiumBadgeVariants> {
  showLabel?: boolean
  animated?: boolean
  isCancelling?: boolean
  cancelDate?: string
}

export function PremiumBadge({
  variant = "full",
  prominence = "subtle",
  showLabel = true,
  animated = true,
  isCancelling = false,
  cancelDate,
  className,
  ...props
}: PremiumBadgeProps) {
  const shouldShowLabel = variant !== "icon-only" && showLabel
  const status = isCancelling ? "cancelling" : "active"

  const getBadgeLabel = () => {
    if (!shouldShowLabel) return null

    if (isCancelling && cancelDate && variant === "full") {
      return `Premium (Cancela ${formatDate(cancelDate, 'short')})`
    }

    return "Premium"
  }

  const ariaLabel = isCancelling && cancelDate
    ? `Usuario Premium - Tu suscripción termina el ${formatDate(cancelDate, 'long')}`
    : "Usuario Premium"

  const badge = (
    <div
      className={cn(premiumBadgeVariants({ variant, prominence, status }), className)}
      aria-label={ariaLabel}
      role="status"
      title={isCancelling && cancelDate ? `Tu suscripción termina el ${formatDate(cancelDate, 'long')}` : undefined}
      {...props}
    >
      <Crown className={cn(iconVariants({ prominence, status }))} aria-hidden="true" />
      {shouldShowLabel && (
        <span className={cn(textVariants({ prominence, status }))}>{getBadgeLabel()}</span>
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
