/**
 * Types for menu/plans functionality
 */

export interface MenuHistoryItem {
  id: string;
  user_id: string;
  week_start_date: string; // "2025-12-22"
  calories_total: number;
  source: string; // "openai"
  status: "processing" | "completed" | "failed";
  created_at: string; // ISO 8601
}

export interface Meal {
  id: string;
  type: string; // "Breakfast", "Lunch", "Dinner", "Snack"
  name: string;
  calories: number;
  ingredients: string[];
}

export interface Day {
  id: string;
  day_name: string; // "Monday", "Tuesday", etc.
  calories_day: number;
  meals: Meal[];
}

export interface MenuDetail {
  id: string;
  profile_id: string;
  week_start_date: string;
  calories_total: number;
  source: string;
  status: "processing" | "completed" | "failed";
  error_message: string | null;
  days: Day[];
  created_at: string;
}

export interface MenuHistoryResponse {
  data: MenuHistoryItem[];
}

export interface MenuDetailResponse {
  data: MenuDetail;
}

// Constantes para estados
export const MENU_STATUS = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// Constantes para labels de estados
export const STATUS_LABELS: Record<string, string> = {
  processing: 'Generando...',
  completed: 'Completado',
  failed: 'Error',
};

// Constantes para estilos de badges según estado
export const STATUS_BADGE_STYLES: Record<string, string> = {
  processing: 'bg-blue-100 text-blue-700 border-blue-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  failed: 'bg-red-100 text-red-700 border-red-200',
};

// Constantes para tipos de comida
export const MEAL_TYPES = {
  BREAKFAST: 'Breakfast',
  LUNCH: 'Lunch',
  DINNER: 'Dinner',
  SNACK: 'Snack',
} as const;

// Labels en español para tipos de comida
export const MEAL_TYPE_LABELS: Record<string, string> = {
  Breakfast: 'Desayuno',
  Lunch: 'Almuerzo',
  Dinner: 'Cena',
  Snack: 'Snack',
};

// Estilos para badges de tipos de comida
export const MEAL_TYPE_STYLES: Record<string, string> = {
  Breakfast: 'bg-orange-100 text-orange-700 border-orange-200',
  Lunch: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Dinner: 'bg-purple-100 text-purple-700 border-purple-200',
  Snack: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

// Labels en español para días de la semana
export const DAY_NAME_LABELS: Record<string, string> = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
};
