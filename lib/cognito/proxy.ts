import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify, createRemoteJWKSet } from 'jose'

const COGNITO_REGION = process.env.NEXT_PUBLIC_COGNITO_REGION || 'us-east-1'
const COGNITO_USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || ''
const COGNITO_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || ''

// JWKS endpoint de Cognito
const JWKS_URI = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}/.well-known/jwks.json`
const JWKS = createRemoteJWKSet(new URL(JWKS_URI))

/**
 * Actualiza la sesión verificando el token de Cognito en las cookies
 * Implementa lógica de protección de rutas
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({
    request,
  })

  try {
    // Buscar el idToken en las cookies
    const cookies = request.cookies
    let idToken: string | null = null

    // Iterar sobre todas las cookies para encontrar el idToken de Cognito
    cookies.getAll().forEach((cookie) => {
      if (cookie.name.includes('CognitoIdentityServiceProvider') && cookie.name.endsWith('.idToken')) {
        idToken = cookie.value
      }
    })

    // También verificar cookie directa
    if (!idToken) {
      const directToken = cookies.get('idToken')
      if (directToken) {
        idToken = directToken.value
      }
    }

    let isAuthenticated = false

    // Verificar el token si existe
    if (idToken) {
      try {
        await jwtVerify(idToken, JWKS, {
          issuer: `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`,
          audience: COGNITO_CLIENT_ID,
        })
        isAuthenticated = true
      } catch (error) {
        // Token inválido o expirado
        console.error('Token verification failed:', error)
        isAuthenticated = false
      }
    }

    const url = request.nextUrl.clone()

    // Rutas protegidas que requieren autenticación
    const protectedRoutes = ['/dashboard', '/onboarding']
    const isProtectedRoute = protectedRoutes.some((route) => url.pathname.startsWith(route))

    // Rutas de autenticación (login, register)
    const authRoutes = ['/login', '/register']
    const isAuthRoute = authRoutes.some((route) => url.pathname.startsWith(route))

    // Redirigir usuarios no autenticados desde rutas protegidas
    if (isProtectedRoute && !isAuthenticated) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Redirigir usuarios autenticados desde rutas de auth al dashboard
    if (isAuthRoute && isAuthenticated) {
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    return response
  } catch (error) {
    console.error('Error in updateSession:', error)
    return response
  }
}
