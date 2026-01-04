/**
 * Profile-specific type definitions
 */

export interface ProfileData {
  id: string;
  name?: string;
  last_name?: string;
  goal?: string;
  calories?: number;
  dislikes?: string[];
  country?: string;
  avatar_url?: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: string;
  activity_level?: string;
}

export const GOALS = [
  { id: 'weight_loss', label: 'Perder peso' },
  { id: 'weight_gain', label: 'Ganar peso' },
  { id: 'maintain_weight', label: 'Mantener peso' },
  { id: 'muscle_gain', label: 'Ganar músculo' },
  { id: 'general_health', label: 'Salud general' },
] as const;

export const GOAL_LABELS: Record<string, string> = {
  weight_loss: 'Perder peso',
  weight_gain: 'Ganar peso',
  maintain_weight: 'Mantener peso',
  muscle_gain: 'Ganar músculo',
  general_health: 'Salud general',
};

export const ACTIVITY_LABELS: Record<string, string> = {
  sedentary: 'Sedentario',
  lightly_active: 'Ligero',
  moderately_active: 'Moderado',
  very_active: 'Alto',
  extremely_active: 'Muy alto',
};

export const ACTIVITIES = [
  { id: 'sedentary', label: 'Sedentario', desc: 'Poco o ningún ejercicio' },
  { id: 'lightly_active', label: 'Ligero', desc: 'Ejercicio ligero 1-3 días/semana' },
  { id: 'moderately_active', label: 'Moderado', desc: 'Ejercicio moderado 3-5 días/semana' },
  { id: 'very_active', label: 'Alto', desc: 'Ejercicio intenso 6-7 días/semana' },
  { id: 'extremely_active', label: 'Muy alto', desc: 'Entrenamiento intenso diario' },
] as const;

export interface AvatarUploadResponse {
  avatar_url: string;
}
