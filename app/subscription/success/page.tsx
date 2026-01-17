'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SubscriptionSuccessPage() {
  return (
    <ProtectedRoute>
      <SuccessView />
    </ProtectedRoute>
  )
}

function SuccessView() {
  const router = useRouter()

  useEffect(() => {
    // Opcionalmente, recargar el perfil del usuario para actualizar is_premium
    // Esto puede hacerse llamando refreshUser() de useAuth
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-md w-full text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto" />
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ¡Bienvenido a Premium!
            </h1>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-gray-600 text-lg">
              Tu suscripción ha sido activada exitosamente. Ahora tienes acceso ilimitado a todas las funciones premium.
            </p>

            <div className="bg-green-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-green-700">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Beneficios desbloqueados:</span>
              </div>
              <ul className="text-left text-green-700 space-y-1 ml-7">
                <li>✓ Menús ilimitados</li>
                <li>✓ Regeneración de comidas</li>
                <li>✓ Soporte prioritario</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.push('/plans')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                size="lg"
              >
                Crear mi primer plan
              </Button>
              <Button onClick={() => router.push('/')} variant="outline" className="w-full">
                Ir al inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
