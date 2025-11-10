'use client'

import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabaseClient";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface AvatarProps {
    isMobile?: boolean;
    onNavigate?: () => void;
}

export default function Avatar({ isMobile = false, onNavigate }: AvatarProps) {
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            if (data.session) setUserEmail(data.session.user.email || null);
        });

        const {data: listener} = supabase.auth.onAuthStateChange((_event, session) => {
            setUserEmail(session?.user?.email ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login";
    };

    if (isMobile) {
        return (
            <div className="flex flex-col gap-3">
                {
                    userEmail
                        ? (
                            <>
                                <span className="text-gray-700 text-sm font-medium py-2 border-b border-gray-200">
                                    Hola, {userEmail}
                                </span>
                                <Button asChild className="w-full" onClick={onNavigate}>
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-900 py-2 block"
                                    onClick={onNavigate}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-gray-600 hover:text-gray-900 py-2 block"
                                    onClick={onNavigate}
                                >
                                    Register
                                </Link>
                            </>
                        )
                }
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            {
                userEmail
                    ? (
                        <>
                            <Button asChild className="hidden lg:flex">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <span className="text-gray-700 text-sm font-medium hidden lg:inline">
                                Hola, {userEmail}
                            </span>
                            <span className="text-gray-700 text-sm font-medium lg:hidden truncate max-w-[120px]">
                                {userEmail.split('@')[0]}
                            </span>
                            <Button
                                variant="secondary"
                                onClick={handleLogout}
                                className="text-sm"
                            >
                                <span className="hidden sm:inline">Log Out</span>
                                <span className="sm:hidden">Salir</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                                Login
                            </Link>
                            <Link href="/register" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                                Register
                            </Link>
                        </>
                    )
            }
        </div>
    )
}
