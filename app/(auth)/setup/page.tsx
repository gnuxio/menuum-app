'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {supabase} from "@/lib/supabaseClient";

export default function SetupPage() {
    const router = useRouter();

    const [displayName, setDisplayName] = useState('');
    const [goal, setGoal] = useState('mantener');
    const [calories, setCalories] = useState(2100);
    const [country, setCountry] = useState('México');
    const [dislikeInput, setDislikeInput] = useState('');
    const [dislikes, setDislikes] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAddDislike = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && dislikeInput.trim() !== '') {
            e.preventDefault();
            const newItem = dislikeInput.trim().toLowerCase();
            if (!dislikes.includes(newItem)) {
                setDislikes([...dislikes, newItem]);
            }
            setDislikeInput('');
        }
    };

    const handleRemoveDislike = (item: string) => {
        setDislikes(dislikes.filter((d) => d !== item));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const {
            data: {user},
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            setError('No se encontró sesión activa');
            setLoading(false);
            return;
        }

        const {error: insertError} = await supabase.from('profiles').insert({
            id: user.id,
            name: displayName,
            goal,
            calories,
            dislikes,
            country,
        });

        if (insertError) {
            console.error(insertError);
            setError('Error al guardar tu perfil.');
            setLoading(false);
            return;
        }

        router.push('/dashboard');
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Configura tu perfil</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    {/* Objetivo */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Objetivo</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="mantener">Mantener peso</option>
                            <option value="bajar">Bajar peso</option>
                            <option value="subir">Subir masa</option>
                        </select>
                    </div>

                    {/* Calorías */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Calorías diarias</label>
                        <input
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(parseInt(e.target.value))}
                            min={1000}
                            max={5000}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    {/* Alimentos no gustados */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Alimentos que no te gustan</label>
                        <input
                            type="text"
                            placeholder="Ejemplo: atún"
                            value={dislikeInput}
                            onChange={(e) => setDislikeInput(e.target.value)}
                            onKeyDown={handleAddDislike}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {dislikes.map((item) => (
                                <span
                                    key={item}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                >
                  {item}
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleRemoveDislike(item)}
                                    >
                    ✕
                  </button>
                </span>
                            ))}
                        </div>
                    </div>

                    {/* País */}
                    <div>
                        <label className="block text-sm font-medium mb-1">País</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    {/* Error */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {loading ? 'Guardando...' : 'Guardar y continuar'}
                    </button>
                </form>
            </div>
        </main>
    );
}