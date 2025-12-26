/**
 * Cliente de autenticación para Client Components
 * Maneja todas las operaciones de auth con Bearer tokens
 *
 * Llama directamente al backend de auth en todos los entornos
 */

import { setAuthTokens, getAccessToken, getRefreshToken, clearAuthTokens } from './tokens';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const AUTH_URL = IS_PRODUCTION
  ? 'https://api.menuum.com/auth'
  : (process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:8080/auth');

export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  name: string;
}

export interface AuthResponse {
  user?: User;
  message?: string;
  access_token?: string;
  id_token?: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

/**
 * Helper para hacer fetch con Authorization header
 */
async function authFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Agregar Authorization header si hay token
  const accessToken = getAccessToken();
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return fetch(`${AUTH_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

export const authClient = {
  /**
   * Login con email y password
   * Guarda tokens en localStorage
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await authFetch('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    // Guardar tokens en localStorage
    if (data.access_token && data.id_token && data.refresh_token && data.expires_in) {
      setAuthTokens({
        access_token: data.access_token,
        id_token: data.id_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
      });
    }

    return data;
  },

  /**
   * Registro de nuevo usuario
   * NO establece cookies, requiere verificación de email
   */
  async register(email: string, password: string, name?: string): Promise<AuthResponse> {
    const response = await authFetch('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrarse');
    }

    return data;
  },

  /**
   * Verificar email con código
   */
  async verifyEmail(email: string, code: string): Promise<AuthResponse> {
    const response = await authFetch('/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al verificar email');
    }

    return data;
  },

  /**
   * Reenviar código de verificación
   */
  async resendVerification(email: string): Promise<AuthResponse> {
    const response = await authFetch('/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al reenviar código');
    }

    return data;
  },

  /**
   * Obtener usuario actual
   * Lee desde cookies httpOnly automáticamente
   */
  async me(): Promise<User> {
    const response = await authFetch('/me', {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'No autenticado');
    }

    return data.user;
  },

  /**
   * Refrescar access token
   * Envía refresh_token en el body
   */
  async refresh(): Promise<AuthResponse> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await authFetch('/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      clearAuthTokens();
      throw new Error(data.message || 'Error al refrescar sesión');
    }

    // Actualizar tokens en localStorage
    if (data.access_token && data.id_token && data.refresh_token && data.expires_in) {
      setAuthTokens({
        access_token: data.access_token,
        id_token: data.id_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
      });
    }

    return data;
  },

  /**
   * Logout
   * Limpia todos los tokens de localStorage
   */
  async logout(): Promise<void> {
    try {
      const response = await authFetch('/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        console.error('Error en logout, pero continuando...');
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Siempre limpiar tokens localmente
      clearAuthTokens();
    }
  },

  /**
   * Iniciar reset de password
   */
  async forgotPassword(email: string): Promise<AuthResponse> {
    const response = await authFetch('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al solicitar reset de password');
    }

    return data;
  },

  /**
   * Completar reset de password
   */
  async resetPassword(email: string, code: string, newPassword: string): Promise<AuthResponse> {
    const response = await authFetch('/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, code, new_password: newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al resetear password');
    }

    return data;
  },

  /**
   * Cambiar password (usuario autenticado)
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    const response = await authFetch('/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al cambiar password');
    }

    return data;
  },
};
