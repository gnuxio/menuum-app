'use client'

import { useEffect, useState } from 'react'
import { getSubscriptionStatus, type SubscriptionStatusResponse } from '@/lib/api/subscription'

export function useSubscription() {
  const [data, setData] = useState<SubscriptionStatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshSubscription = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getSubscriptionStatus()
      setData(response)
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
    subscription: data?.subscription,
    loading,
    error,
    isPremium: data?.has_premium_access ?? false,
    isCancelling: data?.subscription?.cancel_at_period_end === true,
    refreshSubscription,
  }
}
