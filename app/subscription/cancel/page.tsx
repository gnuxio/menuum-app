'use client'

import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { XCircle } from 'lucide-react'

export default function SubscriptionCancelPage() {
  return (
    <ProtectedRoute>
      <CancelView />
    </ProtectedRoute>
  )
}

function CancelView() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-8">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="pb-4">
          <XCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Pago Cancelado</h1>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-gray-600">
            No se completó el proceso de suscripción. Puedes intentarlo de nuevo cuando estés listo.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => router.push('/premium')}
              className="w-full"
              variant="default"
            >
              Ver planes de nuevo
            </Button>
            <Button onClick={() => router.push('/')} variant="outline" className="w-full">
              Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
