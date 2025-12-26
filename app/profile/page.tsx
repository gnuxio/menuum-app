'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import ProfileView from "./ProfileView";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <ProfileView user={user!} />
    </ProtectedRoute>
  );
}
