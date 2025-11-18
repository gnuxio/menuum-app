'use client';

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Rutas que no deberían mostrar el sidebar
    const noSidebarRoutes = ['/login', '/register', '/onboarding'];
    const shouldShowSidebar = !noSidebarRoutes.some(route => pathname.startsWith(route));

    if (!shouldShowSidebar) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
