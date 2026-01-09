'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ChevronLeft, Info, Shield, Heart, Scale, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function DisclaimerPage() {
  const router = useRouter();

  const sections = [
    {
      icon: AlertTriangle,
      iconColor: 'from-red-500 to-orange-600',
      title: 'No es Asesoramiento Médico',
      content: 'Los planes de comida y recomendaciones nutricionales proporcionados por Menuum son únicamente con fines informativos y educativos. NO constituyen asesoramiento médico, diagnóstico o tratamiento. Siempre consulte con un profesional de la salud calificado antes de iniciar cualquier programa de dieta, ejercicio o cambio en su estilo de vida.'
    },
    {
      icon: Shield,
      iconColor: 'from-blue-500 to-indigo-600',
      title: 'Uso Bajo su Propio Riesgo',
      content: 'Al utilizar Menuum, usted acepta que lo hace bajo su propio riesgo. No nos hacemos responsables de ningún daño, lesión, pérdida de peso no deseada, aumento de peso, reacciones alérgicas, problemas de salud o cualquier otro efecto adverso que pueda resultar del uso de nuestros planes de comida o recomendaciones.'
    },
    {
      icon: Heart,
      iconColor: 'from-pink-500 to-rose-600',
      title: 'Condiciones Médicas Preexistentes',
      content: 'Si tiene alguna condición médica preexistente (diabetes, hipertensión, enfermedad cardíaca, trastornos alimentarios, alergias alimentarias, etc.), está embarazada, amamantando, o toma medicamentos, es FUNDAMENTAL que consulte con su médico antes de seguir cualquier plan nutricional generado por Menuum.'
    },
    {
      icon: Scale,
      iconColor: 'from-green-500 to-emerald-600',
      title: 'Cálculos y Estimaciones',
      content: 'Los cálculos de calorías, macronutrientes y requerimientos nutricionales proporcionados por Menuum son estimaciones basadas en fórmulas generales. Cada persona es única y sus necesidades nutricionales reales pueden variar significativamente. Estos cálculos no reemplazan una evaluación nutricional profesional personalizada.'
    },
    {
      icon: Info,
      iconColor: 'from-yellow-500 to-amber-600',
      title: 'Alergias e Intolerancias',
      content: 'Aunque Menuum le permite especificar alimentos que desea evitar, NO garantizamos que todos los planes estén completamente libres de alérgenos o ingredientes específicos. Es su responsabilidad verificar todos los ingredientes de las recetas generadas antes de consumirlas, especialmente si tiene alergias o intolerancias alimentarias graves.'
    },
    {
      icon: FileText,
      iconColor: 'from-purple-500 to-violet-600',
      title: 'Limitación de Responsabilidad',
      content: 'Menuum y sus desarrolladores no se hacen responsables de: (1) la precisión o idoneidad de los planes de comida generados, (2) cualquier efecto adverso en su salud o bienestar, (3) pérdida o daños resultantes del uso de la aplicación, (4) interrupciones del servicio o errores en los cálculos. El uso de este servicio es completamente voluntario y bajo su propia discreción.'
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 -ml-2 hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold
            bg-gradient-to-r from-green-600 to-emerald-600
            bg-clip-text text-transparent">
            Descargo de Responsabilidad
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Información importante sobre el uso de Menuum
          </p>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-red-50 to-orange-50
            backdrop-blur-xl rounded-3xl border-2 border-red-200/50
            p-6 md:p-8 mb-8 shadow-lg"
        >
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl
              bg-gradient-to-br from-red-500 to-orange-600
              flex items-center justify-center flex-shrink-0
              shadow-lg shadow-red-500/20"
            >
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Importante: Lea Antes de Continuar
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Menuum es una herramienta de planificación de comidas que utiliza inteligencia artificial
                para generar sugerencias nutricionales personalizadas. <strong>No somos profesionales de la salud</strong> y
                los planes generados <strong>no reemplazan el consejo médico o nutricional profesional</strong>.
                Al usar esta aplicación, usted acepta los términos descritos a continuación.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <Card className="bg-white/70 backdrop-blur-xl
                border-2 border-gray-200/50 hover:shadow-xl
                transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl
                      bg-gradient-to-br ${section.iconColor}
                      flex items-center justify-center
                      shadow-lg shadow-${section.iconColor.split('-')[1]}-500/20`}
                    >
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-800">
                      {section.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white/70 backdrop-blur-xl rounded-3xl
            border-2 border-gray-200/50 p-6 md:p-8 shadow-lg"
        >
          <h3 className="font-bold text-gray-800 text-lg mb-4">
            Recomendaciones Generales
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span>Consulte siempre con un médico o nutricionista certificado antes de comenzar cualquier programa de dieta.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span>Verifique todos los ingredientes si tiene alergias o intolerancias alimentarias.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span>Escuche a su cuerpo. Si experimenta síntomas adversos, detenga el plan y consulte a un profesional.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span>Los resultados pueden variar. Cada persona es única y responde de manera diferente a los cambios dietéticos.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600 font-bold">•</span>
              <span>Combine una alimentación saludable con ejercicio regular y hábitos de vida saludables.</span>
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 mb-4">
            Al continuar usando Menuum, usted reconoce haber leído y comprendido este descargo de responsabilidad
          </p>
          <Button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-green-500 to-emerald-600
              hover:from-green-600 hover:to-emerald-700
              text-white shadow-lg shadow-green-500/20
              hover:shadow-green-500/40 hover:scale-[1.02] transition-all"
          >
            Entendido, Volver al Dashboard
            <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
          </Button>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-400">
            Última actualización: Enero 2026
          </p>
        </motion.div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
