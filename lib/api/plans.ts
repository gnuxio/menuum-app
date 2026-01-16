/**
 * API service for menu/plans operations with the Go backend
 */

import { fetchWithAuth } from '@/lib/auth/interceptor';
import {
  MenuHistoryResponse,
  MenuDetailResponse,
  MenuDetail,
  MenuHistoryItem
} from '@/lib/types/plans';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.menuum.com';

interface ApiResponseError {
    error?: string | {
        message: string;
    };
    message?: string;
}

/**
 * Get menu history (all plans for the user)
 */
export async function getMenuHistory(): Promise<MenuHistoryItem[]> {
  try {
    const response = await fetchWithAuth(`${API_URL}/api/v1/menu/history`, {
      method: 'GET',
    });

    const result: MenuHistoryResponse | ApiResponseError = await response.json();

    if (!response.ok) {
      const errorResult = result as ApiResponseError;
      const errorMessage =
        (typeof errorResult.error === 'string' ? errorResult.error : errorResult.error?.message) ||
        errorResult.message ||
        'Error al obtener historial de planes';
      throw new Error(errorMessage);
    }

    // El backend devuelve el array directamente (sin wrapper { data: ... })
    return result as MenuHistoryItem[];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido al obtener historial de planes');
  }
}

/**
 * Get specific menu by ID with all details
 */
export async function getMenuById(id: string): Promise<MenuDetail> {
  try {
    const response = await fetchWithAuth(`${API_URL}/api/v1/menu/${id}`, {
      method: 'GET',
    });

    const result: MenuDetailResponse | ApiResponseError = await response.json();

    if (!response.ok) {
      const errorResult = result as ApiResponseError;
      const errorMessage =
        (typeof errorResult.error === 'string' ? errorResult.error : errorResult.error?.message) ||
        errorResult.message ||
        'Error al obtener plan';
      throw new Error(errorMessage);
    }

    // El backend devuelve el objeto directamente (sin wrapper { data: ... })
    return result as MenuDetail;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido al obtener plan');
  }
}

/**
 * Create new menu (asynchronous - returns 202 with status="processing")
 */
export async function createMenu(): Promise<MenuHistoryItem> {
  try {
    const response = await fetchWithAuth(`${API_URL}/api/v1/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result: MenuDetailResponse | ApiResponseError = await response.json();

    // 202 Accepted es válido para proceso asíncrono
    if (response.status !== 202 && !response.ok) {
      const errorResult = result as ApiResponseError;
      // El backend puede devolver error como string o como objeto con message
      const errorMessage =
        (typeof errorResult.error === 'string' ? errorResult.error : errorResult.error?.message) ||
        errorResult.message ||
        'Error al generar nuevo plan';
      throw new Error(errorMessage);
    }

    // El backend devuelve el objeto directamente (sin wrapper { data: ... })
    return result as MenuHistoryItem;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido al generar nuevo plan');
  }
}

/**
 * Regenerate a specific meal in a menu
 */
export async function regenerateMeal(
  menuId: string,
  dayName: string,
  mealType: string
): Promise<MenuDetail> {
  try {
    const response = await fetchWithAuth(`${API_URL}/api/v1/menu/${menuId}/meals/regenerate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        day_name: dayName,
        meal_type: mealType,
      }),
    });

    const result: MenuDetailResponse | ApiResponseError = await response.json();

    if (!response.ok) {
      const errorResult = result as ApiResponseError;
      const errorMessage =
        (typeof errorResult.error === 'string' ? errorResult.error : errorResult.error?.message) ||
        errorResult.message ||
        'Error al regenerar comida';
      throw new Error(errorMessage);
    }

    // El backend devuelve el objeto directamente (sin wrapper { data: ... })
    return result as MenuDetail;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido al regenerar comida');
  }
}
