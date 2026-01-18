'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useSubscription } from '@/hooks/useSubscription'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { PremiumBadge } from '@/components/ui/premium-badge'
import { Button } from '@/components/ui/button'
import CancelSubscriptionModal from '@/components/subscription/CancelSubscriptionModal'
import ReactivateSubscriptionButton from '@/components/subscription/ReactivateSubscriptionButton'
import { formatDate, formatPrice, formatPlanName } from '@/lib/utils'
import {
  CreditCard,
  Calendar,
  Check,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react'

function SubscriptionManageView() {
  const router = useRouter()
  const { subscription, loading, isPremium, isCancelling, refreshSubscription } = useSubscription()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando suscripción...</p>
        </div>
      </div>
    )
  }

  if (!subscription || !isPremium) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 p-8 md:p-12 text-center shadow-lg"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <CreditCard className="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              No tienes una suscripción activa
            </h1>
            <p className="text-gray-600 mb-8">
              Explora nuestros planes Premium y desbloquea todas las funciones de Menuum
            </p>
            <Button
              onClick={() => router.push('/premium')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 cursor-pointer"
            >
              Explorar planes Premium
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  const features = [
    'Generación ilimitada de menús personalizados',
    'Planes de alimentación basados en tus objetivos',
    'Recetas detalladas con valores nutricionales',
    'Soporte prioritario'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Gestión de Suscripción
            </h1>
            <PremiumBadge
              variant="compact"
              prominence="prominent"
              isCancelling={isCancelling}
              cancelDate={subscription.current_period_end || undefined}
            />
          </div>
        </motion.div>

        {/* Cancelling Alert */}
        {isCancelling && subscription.current_period_end && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">
                Tu suscripción está programada para cancelarse el{' '}
                <strong>{formatDate(subscription.current_period_end, 'long')}</strong>
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Puedes reactivarla en cualquier momento antes de esa fecha
              </p>
            </div>
          </motion.div>
        )}

        {/* Current Plan Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 p-6 md:p-8 mb-6 shadow-lg"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Plan Actual</h2>
              <p className="text-lg font-semibold text-green-600">
                {formatPlanName(subscription.plan)}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              isCancelling
                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}>
              {isCancelling
                ? `Cancela el ${formatDate(subscription.current_period_end!, 'short')}`
                : 'Activa'
              }
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <Calendar className="w-4 h-4" />
                <span>Período actual</span>
              </div>
              <p className="text-gray-800 font-semibold">
                Del {formatDate(subscription.current_period_start!, 'short')} al{' '}
                {formatDate(subscription.current_period_end!, 'short')}
              </p>
            </div>

            {!isCancelling && (
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-2 text-green-700 text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Próxima renovación</span>
                </div>
                <p className="text-green-800 font-semibold">
                  {formatDate(subscription.current_period_end!, 'short')} • {formatPrice(subscription.plan)}
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Características de tu plan</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Actions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 p-6 md:p-8 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Acciones</h2>

          <div className="space-y-4">
            {isCancelling ? (
              <ReactivateSubscriptionButton
                onReactivate={refreshSubscription}
                plan={subscription.plan}
              />
            ) : (
              <CancelSubscriptionModal
                currentPeriodEnd={subscription.current_period_end!}
                onCancel={refreshSubscription}
              />
            )}

            <Button
              variant="outline"
              onClick={() => router.push('/premium')}
              className="w-full border-2 cursor-pointer"
            >
              Ver planes disponibles
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function SubscriptionManagePage() {
  return (
    <ProtectedRoute>
      <SubscriptionManageView />
    </ProtectedRoute>
  )
}
