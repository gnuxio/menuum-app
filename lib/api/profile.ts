/**
 * API service for profile operations with the Go backend
 */

import { fetchAuthSession } from 'aws-amplify/auth';
import '@/lib/cognito/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.menuum.com';

/**
 * Profile data structure matching the Go backend CreateProfileRequest
 * Only sending basic fields for now
 */
export interface CreateProfilePayload {
    name: string;
    last_name: string;
    country: string;
    goal: string;
    activity_level: string;
    dislikes?: string[];
}

/**
 * Backend response for profile creation (basic fields only)
 */
export interface ProfileResponse {
    id: string;
    name?: string;
    last_name?: string;
    goal?: string;
    calories?: number;
    dislikes?: string[];
    country?: string;
}

/**
 * Get the Cognito ID token from the current session
 *
 * IMPORTANTE: El backend Go necesitará actualizar su validación de JWT para:
 * 1. Cambiar el JWKS endpoint a Cognito:
 *    https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json
 * 2. Validar el issuer de Cognito:
 *    https://cognito-idp.{region}.amazonaws.com/{userPoolId}
 * 3. Extraer el user ID desde el claim "sub" en lugar de "user_id"
 */
async function getAuthToken(): Promise<string> {
    try {
        const session = await fetchAuthSession();

        if (!session.tokens?.idToken) {
            throw new Error('No hay sesión activa. Por favor inicia sesión nuevamente.');
        }

        // Retornamos el idToken (no el accessToken)
        // El idToken contiene los claims del usuario
        return session.tokens.idToken.toString();
    } catch (error) {
        throw new Error('No hay sesión activa. Por favor inicia sesión nuevamente.');
    }
}

/**
 * Create a new profile in the Go backend
 */
export async function createProfile(payload: CreateProfilePayload): Promise<ProfileResponse> {
    try {
        const token = await getAuthToken();

        const response = await fetch(`${API_URL}/api/v1/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            // Extract error message from backend response
            const errorMessage = data.error || data.message || 'Error al crear el perfil';
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Error desconocido al crear el perfil');
    }
}

/**
 * Get user profile from the Go backend
 */
export async function getProfile(): Promise<ProfileResponse> {
    try {
        const token = await getAuthToken();

        const response = await fetch(`${API_URL}/api/v1/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.error || data.message || 'Error al obtener el perfil';
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Error desconocido al obtener el perfil');
    }
}

/**
 * Update user profile in the Go backend
 */
export async function updateProfile(payload: Partial<CreateProfilePayload>): Promise<ProfileResponse> {
    try {
        const token = await getAuthToken();

        const response = await fetch(`${API_URL}/api/v1/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.error || data.message || 'Error al actualizar el perfil';
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Error desconocido al actualizar el perfil');
    }
}
