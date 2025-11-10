'use client';

import {useEffect} from "react";
import {supabase} from "@/lib/supabaseClient";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                router.push("/login");
            }
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                router.push("/login");
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    return (
        <main className="min-h-screen bg-[#FAFAF9]">
            <h1>Dashboard</h1>
        </main>
    );
}
