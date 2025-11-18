'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
                <div className="text-slate-600">Cargando...</div>
            </main>
        );
    }

    if (!user) {
        return null; // Evitar flash mientras redirige
    }

    return (
        <main className="min-h-screen bg-[#FAFAF9]">
            <h1>Dashboard</h1>
            <p>Bienvenido, {user.email}</p>
        </main>
    );
}
