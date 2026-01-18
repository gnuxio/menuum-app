'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { reactivateSubscription } from '@/lib/api/subscription'
import { formatPlanName } from '@/lib/utils'

interface ReactivateSubscriptionButtonProps {
  onReactivate: () => Promise<void>
  plan: string
}

export default function ReactivateSubscriptionButton({
  onReactivate,
  plan
}: ReactivateSubscriptionButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleReactivate = async () => {
    try {
      setLoading(true)
      setError(null)
      await reactivateSubscription()
      setSuccess(true)
      await onReactivate()

      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo reactivar. Contacta soporte.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleReactivate}
        disabled={loading || success}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Reactivando...
          </>
        ) : success ? (
          '¡Reactivada!'
        ) : (
          'Reactivar suscripción'
        )}
      </Button>

      {success && (
        <div className="text-center text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          ¡Suscripción reactivada! Continuarás con tu plan {formatPlanName(plan)}.
        </div>
      )}

      {error && (
        <div className="text-center text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}
    </div>
  )
}
