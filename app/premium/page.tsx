'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Sparkles } from 'lucide-react'
import { createCheckoutSession } from '@/lib/api/subscription'
import { toast } from 'sonner'

export default function PremiumPage() {
  return (
    <ProtectedRoute>
      <PremiumView />
    </ProtectedRoute>
  )
}

function PremiumView() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (plan: 'premium_monthly' | 'premium_yearly') => {
    try {
      setLoading(plan)
      const { session_url } = await createCheckoutSession(plan)

      // Redirigir a Stripe checkout
      window.location.href = session_url
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al crear sesión de pago')
      setLoading(null)
    }
  }

  const plans = [
    {
      id: 'premium_monthly',
      name: 'Premium Mensual',
      price: '$9.99',
      period: 'mes',
      popular: false,
      features: [
        'Menús ilimitados',
        'Regeneración de comidas',
        'Soporte prioritario',
        'Personalización avanzada',
      ],
    },
    {
      id: 'premium_yearly',
      name: 'Premium Anual',
      price: '$99',
      period: 'año',
      popular: true,
      features: [
        'Menús ilimitados',
        'Regeneración de comidas',
        'Soporte prioritario',
        'Personalización avanzada',
        '2 meses gratis',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-amber-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Planes Premium
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Desbloquea todo el potencial de Menuum con un plan premium
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular
                  ? 'border-2 border-green-500 shadow-xl scale-105'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Más Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-green-600">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ {plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handleSubscribe(plan.id as any)}
                  disabled={loading !== null}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                      : ''
                  }`}
                  size="lg"
                >
                  {loading === plan.id ? 'Procesando...' : 'Suscribirse'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center text-gray-600">
          <p className="text-sm">
            Cancela en cualquier momento. Sin compromisos a largo plazo.
          </p>
        </div>
      </div>
    </div>
  )
}
