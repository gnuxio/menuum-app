'use client';

import { Home, Calendar, User, LogOut, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { useSidebarContext } from "./LayoutWrapper";
import { useSubscription } from "@/hooks/useSubscription";
import { PremiumBadge } from "./ui/premium-badge";

interface SidebarProps {
    isMobileOpen: boolean;
    onMobileClose: () => void;
}

export default function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { isCollapsed, setIsCollapsed } = useSidebarContext();
    const { isPremium, loading: subscriptionLoading } = useSubscription();

    const handleSignOut = async () => {
        await authClient.logout();
        router.push('/login');
    };

    const handleNavigation = (href: string) => {
        router.push(href);
        onMobileClose();
    };

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/' },
        { icon: Calendar, label: 'Planes', href: '/plans' },
        { icon: User, label: 'Perfil', href: '/profile' },
    ];

    return (
        <>
            {/* Overlay para mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onMobileClose}
                    aria-label="Cerrar menú"
                />
            )}
{/* Sidebar */}
<aside
    className={`
        bg-white border-r border-gray-200 flex flex-col transition-all duration-300
        fixed inset-y-0 left-0 z-50 h-screen
        
        /* Mobile: drawer overlay con ancho fijo */
        w-64
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        
        /* Desktop: siempre visible, ancho variable */
        md:translate-x-0
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}
    `}
>
                {/* Toggle Button - Solo en desktop */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden md:block absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md transition-all z-10 cursor-pointer"
                    aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    ) : (
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                    )}
                </button>

                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <button
                        onClick={() => handleNavigation('/')}
                        className={`text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer ${isCollapsed ? 'hidden md:block md:text-center' : ''}`}
                        aria-label="Ir al dashboard"
                    >
                        {isCollapsed ? 'M' : 'Menuum'}
                    </button>
                    {/* En mobile siempre mostrar el nombre completo */}
                    <button
                        onClick={() => handleNavigation('/')}
                        className="md:hidden text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer"
                        aria-label="Ir al dashboard"
                    >
                        Menuum
                    </button>

                    {/* Premium Badge */}
                    {isPremium && !subscriptionLoading && (
                        <div className="mt-3 flex justify-center">
                            {/* Desktop collapsed: icon-only */}
                            <div className="hidden md:block">
                                {isCollapsed ? (
                                    <PremiumBadge
                                        variant="icon-only"
                                        prominence="prominent"
                                    />
                                ) : (
                                    <PremiumBadge
                                        variant="full"
                                        prominence="prominent"
                                    />
                                )}
                            </div>
                            {/* Mobile: always full */}
                            <div className="md:hidden">
                                <PremiumBadge
                                    variant="full"
                                    prominence="prominent"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <button
                                        onClick={() => handleNavigation(item.href)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${isCollapsed ? 'md:justify-center' : ''} ${
                                            isActive
                                                ? 'bg-green-50 text-green-600 font-semibold'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span className={isCollapsed ? 'md:hidden' : ''}>{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 space-y-2">
                    <button
                        onClick={() => handleNavigation('/disclaimer')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all cursor-pointer ${isCollapsed ? 'md:justify-center' : ''}`}
                        title={isCollapsed ? 'Descargo de responsabilidad' : undefined}
                    >
                        <FileText className="w-5 h-5 flex-shrink-0" />
                        <span className={isCollapsed ? 'md:hidden' : ''}>Descargo</span>
                    </button>
                    <button
                        onClick={handleSignOut}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all cursor-pointer ${isCollapsed ? 'md:justify-center' : ''}`}
                        title={isCollapsed ? 'Cerrar sesión' : undefined}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <span className={isCollapsed ? 'md:hidden' : ''}>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
