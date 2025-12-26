'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import ProfileView from "./ProfileView";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  // Mostrar loading mientras se carga la autenticación
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <ProfileView user={user} />
    </ProtectedRoute>
  );
}
