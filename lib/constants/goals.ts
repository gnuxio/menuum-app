/**
 * Goal constants for user profiles
 */

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
