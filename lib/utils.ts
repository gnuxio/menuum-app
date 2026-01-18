import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, format: 'long' | 'short' = 'long'): string {
  const date = new Date(dateString)

  if (format === 'short') {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date) // "17 ene 2026"
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date) // "17 de enero de 2026"
}

export function formatPrice(plan: string): string {
  return plan === 'premium_monthly' ? '$9.99/mes' : '$99/año'
}

export function formatPlanName(plan: string): string {
  return plan === 'premium_monthly' ? 'Premium Mensual' : 'Premium Anual'
}
