'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { AlertTriangle, Loader2, CheckCircle, X } from 'lucide-react'
import { cancelSubscription } from '@/lib/api/subscription'
import { formatDate } from '@/lib/utils'

interface CancelSubscriptionModalProps {
  currentPeriodEnd: string
  onCancel: () => Promise<void>
}

export default function CancelSubscriptionModal({
  currentPeriodEnd,
  onCancel
}: CancelSubscriptionModalProps) {
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleCancel = async () => {
    try {
      setLoading(true)
      setError(null)
      await cancelSubscription()
      await onCancel()
      setSuccess(true)

      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setFeedback('')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cancelar. Intenta de nuevo o contacta soporte.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setOpen(false)
      setFeedback('')
      setError(null)
      setSuccess(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 cursor-pointer"
        >
          Cancelar suscripción
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {success ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Suscripción cancelada exitosamente
            </h3>
            <p className="text-gray-600">
              Tendrás acceso hasta el {formatDate(currentPeriodEnd, 'long')}
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <DialogTitle className="text-xl">¿Cancelar tu suscripción?</DialogTitle>
              </div>
              <DialogDescription className="text-base text-gray-600">
                Tendrás acceso completo hasta el fin de tu período actual
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Acceso hasta:</strong> {formatDate(currentPeriodEnd, 'long')}
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-medium text-red-900 mb-2">
                  Después del {formatDate(currentPeriodEnd, 'short')}, perderás acceso a:
                </p>
                <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                  <li>Generación ilimitada de menús personalizados</li>
                  <li>Planes de alimentación basados en tus objetivos</li>
                  <li>Recetas detalladas con valores nutricionales</li>
                  <li>Soporte prioritario</li>
                </ul>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-sm text-gray-700">
                  ¿Por qué nos dejas? (opcional)
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tu opinión nos ayuda a mejorar..."
                  disabled={loading}
                  className="min-h-[100px] resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={loading}
                className="cursor-pointer"
              >
                No, mantener suscripción
              </Button>
              <Button
                onClick={handleCancel}
                disabled={loading}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Cancelando...
                  </>
                ) : (
                  'Sí, cancelar mi suscripción'
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
