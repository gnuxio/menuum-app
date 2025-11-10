'use client'

import {supabase} from "@/lib/supabaseClient";
import {useEffect} from "react";
import {redirect} from "next/navigation";

export default function Dashboard() {

    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            if (!data.session) redirect("/");
        });
    }, [])

    return (
        <div>
            <main className="flex justify-center items-center w-full h-screen">
                <h1 className="text-7xl">Dashboard!</h1>
            </main>
        </div>
    );
}
