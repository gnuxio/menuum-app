import React from "react";
import { motion } from "framer-motion";
import { OnboardingStepProps } from "@/lib/types/onboarding";

const preferencias = [
    { id: "omnivoro", label: "Omnívoro", emoji: "🍖" },
    { id: "vegetariano", label: "Vegetariano", emoji: "🥗" },
    { id: "vegano", label: "Vegano", emoji: "🌱" },
    { id: "mediterraneo", label: "Mediterráneo", emoji: "🫒" },
    { id: "alto_proteina", label: "Alto en proteína", emoji: "🥩" },
    { id: "bajo_carbohidratos", label: "Bajo en carbohidratos", emoji: "🥑" },
    { id: "sin_preferencia", label: "Sin preferencia", emoji: "✨" },
];

export default function Step5Preferencias({ data, updateData }: OnboardingStepProps) {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-3">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                >
                    ¿Tienes un estilo de alimentación preferido?
                </motion.h1>
                <p className="text-slate-600 text-lg">
                    Selecciona uno o continúa sin seleccionar
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
                {preferencias.map((pref, index) => {
                    const isSelected = data.preferencia_alimenticia === pref.id;

                    return (
                        <motion.button
                            key={pref.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => updateData({ preferencia_alimenticia: pref.id })}
                            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                                isSelected
                                    ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20"
                                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                            }`}
                        >
                            <div className="text-center space-y-3">
                                <div className="text-4xl">{pref.emoji}</div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {pref.label}
                                </p>
                            </div>
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                                >
                                    <svg
                                        className="w-3.5 h-3.5 text-white"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={() => updateData({ preferencia_alimenticia: "sin_preferencia" })}
                    className="text-slate-500 hover:text-slate-700 text-sm font-medium underline underline-offset-4"
                >
                    → Continuar sin seleccionar
                </button>
            </div>
        </div>
    );
}