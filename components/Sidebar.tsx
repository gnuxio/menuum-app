'use client';

import { useState } from "react";
import { Home, Calendar, User, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/' },
        { icon: Calendar, label: 'Planes', href: '/plans' },
        { icon: User, label: 'Perfil', href: '/profile' },
    ];

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md transition-all z-10"
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
                {isCollapsed ? (
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-center">
                        N
                    </div>
                ) : (
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        NutriPlanner.ai
                    </h1>
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
                                    onClick={() => router.push(item.href)}
                                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all ${
                                        isActive
                                            ? 'bg-green-50 text-green-600 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    {!isCollapsed && <span>{item.label}</span>}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleSignOut}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all`}
                    title={isCollapsed ? 'Cerrar sesión' : undefined}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>Cerrar sesión</span>}
                </button>
            </div>
        </aside>
    );
}
