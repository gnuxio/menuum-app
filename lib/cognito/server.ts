import { cookies } from 'next/headers'
import { jwtVerify, createRemoteJWKSet, JWTPayload } from 'jose'

const COGNITO_REGION = process.env.NEXT_PUBLIC_COGNITO_REGION || 'us-east-1'
const COGNITO_USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || ''
const COGNITO_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || ''

// JWKS endpoint de Cognito para verificar firmas de JWT
const JWKS_URI = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}/.well-known/jwks.json`
const JWKS = createRemoteJWKSet(new URL(JWKS_URI))

export interface CognitoUser extends JWTPayload {
  sub: string // User ID
  email?: string
  email_verified?: boolean
  'cognito:username'?: string
  // Añadir más claims según necesites
}

/**
 * Obtiene el usuario actual desde las cookies en Server Components
 * Valida el JWT token contra JWKS de Cognito
 */
export async function getCurrentUser(): Promise<CognitoUser | null> {
  try {
    const cookieStore = await cookies()

    // Buscar el token en las cookies de Amplify
    // Amplify guarda tokens en formato: CognitoIdentityServiceProvider.{clientId}.{username}.idToken
    const allCookies = cookieStore.getAll()

    let idToken: string | null = null

    // Buscar el idToken en las cookies
    for (const cookie of allCookies) {
      if (cookie.name.includes('CognitoIdentityServiceProvider') && cookie.name.endsWith('.idToken')) {
        idToken = cookie.value
        break
      }
    }

    // También verificar si hay un token directo (para compatibilidad)
    if (!idToken) {
      const directToken = cookieStore.get('idToken')
      if (directToken) {
        idToken = directToken.value
      }
    }

    if (!idToken) {
      return null
    }

    // Verificar el token contra JWKS de Cognito
    const { payload } = await jwtVerify(idToken, JWKS, {
      issuer: `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`,
      audience: COGNITO_CLIENT_ID,
    })

    return payload as CognitoUser
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

/**
 * Obtiene el access token actual desde las cookies
 * Útil para llamadas a APIs externas
 */
export async function getAccessToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()

    // Buscar el accessToken en las cookies
    for (const cookie of allCookies) {
      if (cookie.name.includes('CognitoIdentityServiceProvider') && cookie.name.endsWith('.accessToken')) {
        return cookie.value
      }
    }

    // También verificar si hay un token directo
    const directToken = cookieStore.get('accessToken')
    return directToken?.value || null
  } catch (error) {
    console.error('Error getting access token:', error)
    return null
  }
}

/**
 * Obtiene el ID token actual desde las cookies
 * Este es el token que debes usar para autenticar con tu backend
 */
export async function getIdToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()

    // Buscar el idToken en las cookies
    for (const cookie of allCookies) {
      if (cookie.name.includes('CognitoIdentityServiceProvider') && cookie.name.endsWith('.idToken')) {
        return cookie.value
      }
    }

    // También verificar si hay un token directo
    const directToken = cookieStore.get('idToken')
    return directToken?.value || null
  } catch (error) {
    console.error('Error getting ID token:', error)
    return null
  }
}
