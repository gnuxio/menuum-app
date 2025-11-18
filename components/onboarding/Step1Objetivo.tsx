import React from "react";
import { motion } from "framer-motion";
import { Scale, TrendingDown, TrendingUp } from "lucide-react";
import { OnboardingStepProps } from "@/lib/types/onboarding";

const objetivos = [
    {
        id: "perder_peso",
        titulo: "Perder peso",
        emoji: "🔵",
        icon: TrendingDown,
        color: "from-green-400 to-emerald-600",
        bgColor: "bg-green-50 hover:bg-green-100 border-green-200",
    },
    {
        id: "mantener_peso",
        titulo: "Mantener peso",
        emoji: "🟢",
        icon: Scale,
        color: "from-emerald-400 to-emerald-600",
        bgColor: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
    },
    {
        id: "ganar_musculo",
        titulo: "Ganar músculo",
        emoji: "🔴",
        icon: TrendingUp,
        color: "from-orange-400 to-orange-600",
        bgColor: "bg-orange-50 hover:bg-orange-100 border-orange-200",
    },
];

export default function Step1Objetivo({ data, updateData }: OnboardingStepProps) {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-3">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                >
                    ¿Cuál es tu objetivo?
                </motion.h1>
                <p className="text-gray-600 text-lg">
                    Selecciona tu meta principal para personalizar tu plan
                </p>
            </div>

            <div className="grid gap-5 mt-12">
                {objetivos.map((objetivo, index) => {
                    const Icon = objetivo.icon;
                    const isSelected = data.objetivo === objetivo.id;

                    return (
                        <motion.button
                            key={objetivo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => updateData({ objetivo: objetivo.id })}
                            className={`relative p-8 rounded-3xl border-2 transition-all duration-300 backdrop-blur-xl ${
                                isSelected
                                    ? "border-green-500 bg-white/70 shadow-2xl shadow-green-500/30 scale-[1.02]"
                                    : `${objetivo.bgColor} bg-white/50 border-gray-200/50`
                            }`}
                        >
                            <div className="flex items-center gap-6">
                                <div
                                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${objetivo.color} flex items-center justify-center shadow-lg`}
                                >
                                    <Icon className="w-10 h-10 text-white" />
                                </div>
                                <div className="flex-1 text-left">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {objetivo.titulo}
                                    </h3>
                                </div>
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                                    >
                                        <svg
                                            className="w-5 h-5 text-white"
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
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}