// Guardar tokens en localStorage
export function setAuthTokens(tokens: {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_in: number;
}) {
  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('id_token', tokens.id_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);

  // Guardar timestamp de expiración
  const expiresAt = Date.now() + tokens.expires_in * 1000;
  localStorage.setItem('expires_at', expiresAt.toString());
}

// Obtener access token
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

// Obtener refresh token
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refresh_token');
}

// Verificar si el token está expirado
export function isTokenExpired(): boolean {
  if (typeof window === 'undefined') return true;

  const expiresAt = localStorage.getItem('expires_at');
  if (!expiresAt) return true;

  return Date.now() >= parseInt(expiresAt);
}

// Limpiar todos los tokens
export function clearAuthTokens() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_at');
}
