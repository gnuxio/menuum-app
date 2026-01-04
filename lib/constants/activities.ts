/**
 * Activity level constants for user profiles
 */

export const ACTIVITIES = [
  { id: 'sedentary', label: 'Sedentario', desc: 'Poco o ningún ejercicio' },
  { id: 'lightly_active', label: 'Ligero', desc: 'Ejercicio ligero 1-3 días/semana' },
  { id: 'moderately_active', label: 'Moderado', desc: 'Ejercicio moderado 3-5 días/semana' },
  { id: 'very_active', label: 'Alto', desc: 'Ejercicio intenso 6-7 días/semana' },
  { id: 'extremely_active', label: 'Muy alto', desc: 'Entrenamiento intenso diario' },
] as const;

export const ACTIVITY_LABELS: Record<string, string> = {
  sedentary: 'Sedentario',
  lightly_active: 'Ligero',
  moderately_active: 'Moderado',
  very_active: 'Alto',
  extremely_active: 'Muy alto',
};
