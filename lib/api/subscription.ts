import { fetchWithAuth } from '@/lib/auth/interceptor'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.menuum.com'

export interface CheckoutRequest {
  plan: 'premium_monthly' | 'premium_yearly'
}

export interface CheckoutResponse {
  session_url: string
}

export interface Subscription {
  id: number
  user_id: string
  tenant: string
  stripe_customer_id: string
  stripe_subscription_id: string
  status: string
  plan: string
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

export interface SubscriptionStatusResponse {
  subscription: Subscription | null
  has_premium_access: boolean
}

export async function createCheckoutSession(
  plan: 'premium_monthly' | 'premium_yearly',
): Promise<CheckoutResponse> {
  const response = await fetchWithAuth(`${API_URL}/api/v1/subscription/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan }),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({ error: 'Error al crear sesión de pago' }))
    throw new Error(data.error || data.detail || 'Error al crear sesión de pago')
  }

  return response.json()
}

export async function getSubscriptionStatus(): Promise<SubscriptionStatusResponse> {
  const response = await fetchWithAuth(`${API_URL}/api/v1/subscription/status`)

  if (!response.ok) {
    if (response.status === 404) {
      return { subscription: null, has_premium_access: false }
    }
    throw new Error('Failed to fetch subscription status')
  }

  return response.json()
}

export async function cancelSubscription(): Promise<void> {
  const response = await fetchWithAuth(`${API_URL}/api/v1/subscription/cancel`, {
    method: 'POST',
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({ error: 'Error al cancelar suscripción' }))
    throw new Error(data.error || data.detail || 'Error al cancelar suscripción')
  }
}

export async function reactivateSubscription(): Promise<Subscription> {
  const response = await fetchWithAuth(`${API_URL}/api/v1/subscription/reactivate`, {
    method: 'POST',
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({ error: 'Error al reactivar suscripción' }))
    throw new Error(data.error || data.detail || 'Error al reactivar suscripción')
  }

  return response.json()
}
