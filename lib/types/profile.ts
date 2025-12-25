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

export const GOAL_LABELS: Record<string, string> = {
  perder_peso: 'Perder peso',
  mantener_peso: 'Mantener peso',
  ganar_musculo: 'Ganar músculo',
};

export const ACTIVITY_LABELS: Record<string, string> = {
  sedentario: 'Sedentario',
  ligero: 'Ligero',
  moderado: 'Moderado',
  alto: 'Alto',
  muy_alto: 'Muy alto',
};

export interface AvatarUploadResponse {
  avatar_url: string;
}
