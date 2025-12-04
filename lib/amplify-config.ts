// Configuración de AWS Amplify para Cognito
export const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '',
      region: process.env.NEXT_PUBLIC_COGNITO_REGION || 'us-east-1',
      // Configuración de cookies para SSR
      cookieStorage: {
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
        path: '/',
        expires: 365,
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}
