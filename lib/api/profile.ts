import { fetchWithAuth } from '@/lib/auth/interceptor';
import { COUNTRIES } from '@/lib/constants/countries';
import { GOALS, ACTIVITIES } from '@/lib/types/profile';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.menuum.com';

/**
 * Profile data structure matching the Go backend
 * Todos los campos son opcionales - el backend hace upsert automático
 */
export interface ProfilePayload {
    name?: string;
    last_name?: string;
    age?: number;
    weight?: number;
    height?: number;
    gender?: string;
    country?: string;
    goal?: string;
    activity_level?: string;
    dislikes?: string[];
}

/**
 * Backend response for profile creation
 */
export interface ProfileResponse {
    id: string;
    name?: string;
    last_name?: string;
    age?: number;
    weight?: number;
    height?: number;
    gender?: string;
    country?: string;
    goal?: string;
    activity_level?: string;
    calories?: number;
    dislikes?: string[];
    avatar_url?: string;
}

/**
 * Save (create or update) user profile in the Go backend
 * El backend hace upsert automáticamente - crea si no existe, actualiza si existe
 * Todos los campos son opcionales, se puede enviar un body vacío
 */
export async function saveProfile(payload: ProfilePayload = {}): Promise<ProfileResponse> {
    try {
        // Frontend validation for country code
        if (payload.country) {
            payload.country = payload.country.toLowerCase(); // Convert to lowercase
            const allowedCountryCodes = COUNTRIES.map((c) => c.code);
            if (!allowedCountryCodes.includes(payload.country)) {
                throw new Error(`El código de país '${payload.country}' no es válido.`);
            }
        }

        // Frontend validation for goal
        if (payload.goal) {
            const allowedGoals = GOALS.map((g) => g.id);
            if (!allowedGoals.includes(payload.goal)) {
                throw new Error(`El objetivo '${payload.goal}' no es válido.`);
            }
        }

        // Frontend validation for activity level
        if (payload.activity_level) {
            const allowedActivityLevels = ACTIVITIES.map((a) => a.id);
            if (!allowedActivityLevels.includes(payload.activity_level)) {
                throw new Error(`El nivel de actividad '${payload.activity_level}' no es válido.`);
            }
        }

        const response = await fetchWithAuth(`${API_URL}/api/v1/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.error?.message || result.message || 'Error al guardar el perfil';
            throw new Error(errorMessage);
        }

        // Backend envuelve la respuesta en { data: ... }
        return result.data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Error desconocido al guardar el perfil');
    }
}

/**
 * Get user profile from the Go backend
 */
export async function getProfile(): Promise<ProfileResponse> {
    try {
        const response = await fetchWithAuth(`${API_URL}/api/v1/profile`, {
            method: 'GET',
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.error?.message || result.message || 'Error al obtener el perfil';
            throw new Error(errorMessage);
        }

        return result.data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Error desconocido al obtener el perfil');
    }
}

/**
 * Upload user avatar to the Go backend
 */
export async function uploadAvatar(file: File): Promise<{ avatar_url: string }> {
    try {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await fetchWithAuth(`${API_URL}/api/v1/profile/avatar`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = result.error?.message || result.message || 'Error al subir imagen';
            throw new Error(errorMessage);
        }

        return result.data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Error desconocido al subir imagen');
    }
}

/**
 * Delete user avatar from the Go backend
 */
export async function deleteAvatar(): Promise<void> {
    try {
        const response = await fetchWithAuth(`${API_URL}/api/v1/profile/avatar`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data = await response.json();
            const errorMessage = data.error || data.message || 'Error al eliminar imagen';
            throw new Error(errorMessage);
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Error desconocido al eliminar imagen');
    }
}
