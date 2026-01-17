'use client'

import { useEffect, useState } from 'react'
import { getSubscriptionStatus, type Subscription } from '@/lib/api/subscription'

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshSubscription = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getSubscriptionStatus()
      setSubscription(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscription')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshSubscription()
  }, [])

  return {
    subscription,
    loading,
    error,
    isPremium: subscription?.status === 'active',
    refreshSubscription,
  }
}
