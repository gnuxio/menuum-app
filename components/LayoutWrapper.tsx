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

                {/* Main Content Area
                    * min-w-0: Allows flex item to shrink below its content size, preventing overflow
                    * This fixes the issue where flex items with wide content push beyond viewport
                */}
                <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                    {/* Mobile Header */}
                    <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

                    {/* Main Content
                        * overflow-x-hidden: Prevents horizontal scroll within content area only
                        * More targeted than global overflow-x: hidden on body
                    */}
                    <main className="flex-1 bg-gray-50 overflow-y-auto overflow-x-hidden pt-16 md:pt-0">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarContext.Provider>
    );
}
