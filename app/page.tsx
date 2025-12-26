'use client';

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import DashboardView from "./DashboardView";

export default function Home() {
    const { user } = useAuth();

    return (
        <ProtectedRoute>
            <DashboardView user={user!} />
        </ProtectedRoute>
    );
}
