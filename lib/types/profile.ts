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

export interface AvatarUploadResponse {
  avatar_url: string;
}
