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
    const error = await response.json().catch(() => ({ detail: 'Failed to create checkout session' }))
    throw new Error(error.detail || 'Failed to create checkout session')
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
    const error = await response.json().catch(() => ({ detail: 'Failed to cancel subscription' }))
    throw new Error(error.detail || 'Failed to cancel subscription')
  }
}

export async function reactivateSubscription(): Promise<Subscription> {
  const response = await fetchWithAuth(`${API_URL}/api/v1/subscription/reactivate`, {
    method: 'POST',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to reactivate subscription' }))
    throw new Error(error.detail || 'Failed to reactivate subscription')
  }

  return response.json()
}
