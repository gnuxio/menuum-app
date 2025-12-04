'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut as amplifySignOut, fetchAuthSession } from 'aws-amplify/auth'
import '@/lib/cognito/client' // Configurar Amplify

export interface CognitoUserAttributes {
  sub: string
  email?: string
  email_verified?: boolean
  // Añadir más atributos según necesites
}

export interface AuthUser {
  userId: string
  username: string
  attributes: CognitoUserAttributes
}

interface UseAuthReturn {
  user: AuthUser | null
  loading: boolean
  signOut: () => Promise<void>
}

/**
 * Hook personalizado para manejar la autenticación con AWS Cognito
 * Proporciona el usuario actual, estado de carga y función de logout
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Obtener usuario actual
    const getUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        const session = await fetchAuthSession()

        const authUser: AuthUser = {
          userId: currentUser.userId,
          username: currentUser.username,
          attributes: (currentUser.signInDetails?.loginId
            ? {
                sub: currentUser.userId,
                email: currentUser.signInDetails.loginId,
              }
            : { sub: currentUser.userId }) as CognitoUserAttributes,
        }

        setUser(authUser)
      } catch (error) {
        // Usuario no autenticado
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Cognito no tiene onAuthStateChange built-in
    // Podrías implementar polling o usar eventos personalizados si necesitas
    // Por ahora, el estado se actualiza al montar el componente
  }, [])

  const handleSignOut = async () => {
    try {
      await amplifySignOut()
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    user,
    loading,
    signOut: handleSignOut,
  }
}
