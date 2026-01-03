'use client';

import { motion } from 'framer-motion';
import { UserCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function IncompleteProfileState() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Icon Container */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center mb-6 shadow-lg shadow-blue-200/30">
        <UserCircle className="w-12 h-12 text-blue-600" />
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center">
        Completa tu perfil primero
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-center mb-8 max-w-md text-sm md:text-base leading-relaxed">
        Para generar planes de comida personalizados necesitamos conocer un poco más sobre ti.
        Completa tu perfil con información sobre tus objetivos, edad, peso y nivel de actividad.
      </p>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 max-w-2xl w-full">
        <div className="bg-white rounded-xl p-4 border-2 border-gray-100 shadow-sm">
          <div className="text-2xl mb-2">🎯</div>
          <div className="font-semibold text-gray-800 text-sm">Objetivos</div>
          <div className="text-xs text-gray-500 mt-1">Tu meta de salud</div>
        </div>
        <div className="bg-white rounded-xl p-4 border-2 border-gray-100 shadow-sm">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-semibold text-gray-800 text-sm">Datos básicos</div>
          <div className="text-xs text-gray-500 mt-1">Edad, peso, altura</div>
        </div>
        <div className="bg-white rounded-xl p-4 border-2 border-gray-100 shadow-sm">
          <div className="text-2xl mb-2">⚡</div>
          <div className="font-semibold text-gray-800 text-sm">Actividad</div>
          <div className="text-xs text-gray-500 mt-1">Nivel de ejercicio</div>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => router.push('/profile')}
        className="bg-gradient-to-r from-blue-500 to-emerald-600 hover:from-blue-600 hover:to-emerald-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all px-8 py-6 text-lg rounded-xl"
      >
        Completar mi perfil
        <ChevronRight className="w-5 h-5 ml-2" />
      </Button>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 mt-6 text-center max-w-sm">
        Solo toma un par de minutos y nos ayudará a generar planes perfectos para ti
      </p>
    </motion.div>
  );
}
