"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat, ShoppingCart, Heart, Sparkles, Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    return (
        <main className="min-h-screen bg-[#FAFAF9]">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background con parallax */}
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50" />
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF9] via-transparent to-transparent" />
                </motion.div>

                {/* Elementos decorativos flotantes */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

                {/* Contenido del Hero */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/80 backdrop-blur-sm rounded-full mb-8 border border-green-200/50">
                            <Sparkles className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Planificación inteligente con IA</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                            Come mejor,
                            <br />
                            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                sin complicarte
              </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            NutriPlanner.ai usa inteligencia artificial para crear tu menú semanal y lista de compras en segundos. Alimentación saludable, sin el estrés de planificar.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-8 py-6 rounded-xl shadow-2xl shadow-green-500/30 hover:shadow-green-500/40 transition-all hover:scale-105"
                            >
                                Genera tu primer plan
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 py-6 rounded-xl border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all"
                            >
                                Ver cómo funciona
                            </Button>
                        </div>

                        <p className="text-sm text-gray-500 mt-6">
                            ✓ Sin tarjeta de crédito &nbsp;&nbsp; ✓ Gratis para siempre
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sección de Beneficios - Bento Grid */}
            <section id="beneficios" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Tu semana <span className="text-green-600">planeada en segundos</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Olvídate del &#34;¿qué cocino hoy?&#34;. Dejamos que la IA haga el trabajo pesado.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 - Planificación IA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-white rounded-3xl p-8 border border-gray-200/50 hover:border-green-200 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Sparkles className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">Planificación inteligente</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Menús personalizados según tus metas, gustos y hábitos. La IA ajusta cada comida para que sea perfecta para ti.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 2 - Lista de compras */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="group relative bg-white rounded-3xl p-8 border border-gray-200/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <ShoppingCart className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">Lista de compras automática</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Todos los ingredientes consolidados y agrupados. Compra una sola vez por semana sin olvidar nada.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 3 - Salud sin complicaciones */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="group relative bg-white rounded-3xl p-8 border border-gray-200/50 hover:border-pink-200 hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Heart className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">Salud sin complicaciones</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Comidas balanceadas con ingredientes reales. Sin tecnicismos ni dietas extremas. Solo comer bien, todos los días.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sección Visual del Producto */}
            <section id="como-funciona" className="py-24 px-6 bg-gradient-to-b from-white to-green-50/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Tu menú semanal, <span className="text-green-600">listo para usar</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Visualiza toda tu semana de un vistazo. Cada comida pensada para ti.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Mockup del Menú Semanal */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-300/20 border border-gray-200/50"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold">Menú Semanal</h3>
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Del 3 al 9 Jun</span>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { day: "Lunes", meals: ["Avena con plátano y almendras", "Pollo al limón con arroz integral", "Ensalada de atún"] },
                                    { day: "Martes", meals: ["Smoothie de berries y yogurt", "Salmón con verduras al vapor", "Wrap de pavo"] },
                                    { day: "Miércoles", meals: ["Huevos revueltos con pan integral", "Pechuga a la plancha con quinoa", "Ensalada verde"] },
                                ].map((item, idx) => (
                                    <div key={idx} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-xl border border-green-100">
                                        <div className="font-semibold text-green-700 mb-2">{item.day}</div>
                                        <div className="space-y-1">
                                            {item.meals.map((meal, mealIdx) => (
                                                <div key={mealIdx} className="flex items-start gap-2 text-sm text-gray-700">
                                                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span>{meal}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Mockup de Lista de Compras */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-300/20 border border-gray-200/50"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold">Lista de Compras</h3>
                                <ShoppingCart className="w-6 h-6 text-orange-600" />
                            </div>

                            <div className="space-y-6">
                                {[
                                    { category: "Proteínas", items: ["Pollo (500g)", "Salmón (300g)", "Atún en lata (2)", "Huevos (12)"] },
                                    { category: "Verduras", items: ["Lechuga", "Tomate (3)", "Pepino (2)", "Espinaca"] },
                                    { category: "Granos", items: ["Arroz integral (1kg)", "Quinoa (500g)", "Avena (500g)"] },
                                    { category: "Frutas", items: ["Plátano (6)", "Berries mixtos", "Limón (4)"] },
                                ].map((section, idx) => (
                                    <div key={idx}>
                                        <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                                            {section.category}
                                        </div>
                                        <div className="space-y-2 ml-4">
                                            {section.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 text-white overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

                        <div className="relative text-center">
                            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                                Por fin sé qué cocinar sin pensarlo. Y mi refri siempre está justo con lo que necesito.
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-bold">M</span>
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">María González</div>
                                    <div className="text-sm text-green-100">Diseñadora en Ciudad de México</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 px-6 bg-gradient-to-b from-green-50/30 to-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Empieza a comer mejor <span className="text-green-600">hoy mismo</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                            Crea tu primer plan semanal gratis. Sin tarjeta de crédito, sin compromisos.
                        </p>
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-10 py-7 rounded-xl shadow-2xl shadow-green-500/30 hover:shadow-green-500/40 transition-all hover:scale-105"
                        >
                            Comienza gratis ahora
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <ChefHat className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  NutriPlanner.ai
                </span>
                            </div>
                            <p className="text-gray-600 max-w-sm">
                                Planificación inteligente para comer bien todos los días. Sin el estrés de decidir qué cocinar.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-gray-900">Producto</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#beneficios" className="hover:text-green-600 transition-colors">Beneficios</a></li>
                                <li><a href="#como-funciona" className="hover:text-green-600 transition-colors">Cómo funciona</a></li>
                                <li><a href="#" className="hover:text-green-600 transition-colors">Precios</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-gray-900">Empresa</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#" className="hover:text-green-600 transition-colors">Sobre el proyecto</a></li>
                                <li><a href="#" className="hover:text-green-600 transition-colors">Privacidad</a></li>
                                <li><a href="#" className="hover:text-green-600 transition-colors">Contacto</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                        <p>© 2025 NutriPlanner.ai - Todos los derechos reservados</p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="hover:text-green-600 transition-colors">Términos</a>
                            <a href="#" className="hover:text-green-600 transition-colors">Privacidad</a>
                            <a href="#" className="hover:text-green-600 transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
