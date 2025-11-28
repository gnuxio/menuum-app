import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                        Dashboard
                    </h1>
                    {user && <p className="text-gray-600">Bienvenido, {user.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Card de Perfil */}
                    <Link href="/profile">
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 p-6 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition-all cursor-pointer group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 bg-green-100 rounded-2xl group-hover:bg-green-600 transition-colors">
                                    <svg className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Mi Perfil</h3>
                            </div>
                            <p className="text-gray-600 text-sm">Ver y editar tu información personal</p>
                        </div>
                    </Link>

                    {/* Card de ejemplo */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 bg-orange-100 rounded-2xl">
                                <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Planes de comida</h3>
                        </div>
                        <p className="text-gray-600 text-sm">Próximamente...</p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 bg-emerald-100 rounded-2xl">
                                <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Calorías de hoy</h3>
                        </div>
                        <p className="text-gray-600 text-sm">Próximamente...</p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-gray-200/50 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 bg-green-100 rounded-2xl">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Progreso</h3>
                        </div>
                        <p className="text-gray-600 text-sm">Próximamente...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
