'use client'

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type SectionId = "beneficios" | "como-funciona";

export default function Navbar() {
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
    const [lastScrollY, setLastScrollY] = useState<number>(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = (): void => {
            const currentScrollY: number = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const scrollToSection = (id: SectionId): void => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    const handleMobileMenuToggle = (): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ y: isHeaderVisible ? 0 : -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                        <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        <Link href="/">NutriPlanner.ai</Link>
                    </span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <button onClick={() => scrollToSection("beneficios")} className="text-gray-600 hover:text-green-600 transition-colors">
                        Beneficios
                    </button>
                    <button onClick={() => scrollToSection("como-funciona")} className="text-gray-600 hover:text-green-600 transition-colors">
                        Cómo funciona
                    </button>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20">
                        <Link href="/login">Iniciar sesión</Link>
                    </Button>
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20">
                        <Link href="/register">Comienza gratis</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={handleMobileMenuToggle}
                    className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 overflow-hidden"
                    >
                        <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
                            <button
                                onClick={() => scrollToSection("beneficios")}
                                className="text-left text-gray-600 hover:text-green-600 transition-colors py-2"
                            >
                                Beneficios
                            </button>
                            <button
                                onClick={() => scrollToSection("como-funciona")}
                                className="text-left text-gray-600 hover:text-green-600 transition-colors py-2"
                            >
                                Cómo funciona
                            </button>
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20">
                                    Iniciar sesión
                                </Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20">
                                    Comienza gratis
                                </Button>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
