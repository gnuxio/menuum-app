'use client'

import { Amplify } from 'aws-amplify'
import { amplifyConfig } from '@/lib/amplify-config'

// Configurar Amplify solo una vez en el cliente
let isConfigured = false

export function configureAmplify() {
  if (typeof window !== 'undefined' && !isConfigured) {
    Amplify.configure(amplifyConfig, { ssr: true })
    isConfigured = true
  }
}

// Auto-configurar al importar
configureAmplify()
