'use client';

import { Menu } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { PremiumBadge } from "./ui/premium-badge";

interface MobileHeaderProps {
    onMenuClick: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    const { isPremium, loading: subscriptionLoading } = useSubscription();

    return (
        <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center px-4">
            <button
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Abrir menú"
            >
                <Menu className="w-6 h-6 text-gray-600" />
            </button>

            <h1 className="ml-3 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Menuum
            </h1>

            {/* Premium Badge - subtle, right side */}
            {isPremium && !subscriptionLoading && (
                <div className="ml-auto">
                    <PremiumBadge
                        variant="icon-only"
                        prominence="subtle"
                    />
                </div>
            )}
        </header>
    );
}
