import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { OnboardingStepProps } from "@/lib/types/onboarding";

const opciones = [
    { id: "masculino", label: "Masculino", emoji: "👨" },
    { id: "femenino", label: "Femenino", emoji: "👩" },
];

export default function Step3Sexo({ data, updateData }: OnboardingStepProps) {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-3">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                >
                    ¿Con qué sexo biológico te identificas?
                </motion.h1>
                <p className="text-gray-600 text-lg">
                    Necesario para cálculos nutricionales precisos
                </p>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-12">
                {opciones.map((opcion, index) => {
                    const isSelected = data.sexo === opcion.id;

                    return (
                        <motion.button
                            key={opcion.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => updateData({ sexo: opcion.id })}
                            className={`relative p-10 rounded-3xl border-2 transition-all duration-300 backdrop-blur-xl ${
                                isSelected
                                    ? "border-green-500 bg-white/70 shadow-2xl shadow-green-500/30 scale-[1.02]"
                                    : "border-gray-200/50 bg-white/50 hover:border-gray-300 hover:shadow-lg"
                            }`}
                        >
                            <div className="text-center space-y-4">
                                <div className="text-6xl">{opcion.emoji}</div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {opcion.label}
                                </h3>
                            </div>
                            {isSelected && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-4 right-4 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                                >
                                    <svg
                                        className="w-4 h-4 text-white"
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
        </div>
    );
}