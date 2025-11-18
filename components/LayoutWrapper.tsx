'use client';

import { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

interface SidebarContextType {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
    isCollapsed: false,
    setIsCollapsed: () => {},
});

export const useSidebarContext = () => useContext(SidebarContext);

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Rutas que no deberían mostrar el sidebar
    const noSidebarRoutes = ['/login', '/register', '/onboarding'];
    const shouldShowSidebar = !noSidebarRoutes.some(route => pathname.startsWith(route));

    if (!shouldShowSidebar) {
        return <>{children}</>;
    }

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            <div className="h-screen flex overflow-hidden">
                {/* Sidebar */}
                <Sidebar
                    isMobileOpen={isMobileMenuOpen}
                    onMobileClose={() => setIsMobileMenuOpen(false)}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Mobile Header */}
                    <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

                    {/* Main Content */}
                    <main className="flex-1 bg-gray-50 overflow-auto pt-16 md:pt-0">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarContext.Provider>
    );
}
