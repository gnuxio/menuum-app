/**
 * Interceptor para refrescar tokens automáticamente cuando expiran
 * Útil para requests al backend Go (api.menuum.com/api/v1/...)
 */

import { authClient } from './client';
import { getAccessToken, clearAuthTokens } from './tokens';

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

/**
 * Hace fetch con refresh automático en caso de 401
 * Agrega Authorization header con Bearer token
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const makeRequest = () => {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string> || {}),
    };

    // Solo agregar Content-Type si no es FormData (el browser lo configura automáticamente)
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    // Agregar Authorization header con Bearer token
    const accessToken = getAccessToken();
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  // Primer intento
  let response = await makeRequest();

  // Si es 401, intentar refresh
  if (response.status === 401 && !isRefreshing) {
    // Iniciar refresh
    isRefreshing = true;
    refreshPromise = authClient
      .refresh()
      .then(() => {
        isRefreshing = false;
        refreshPromise = null;
      })
      .catch((err) => {
        isRefreshing = false;
        refreshPromise = null;
        // Si refresh falla, limpiar tokens y redirigir a login
        clearAuthTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw err;
      });

    try {
      await refreshPromise;

      // Reintentar request original con nuevo token
      response = await makeRequest();
    } catch (error) {
      // El refresh falló, retornar response 401 original
      return response;
    }
  }

  return response;
}
