"use client";

import React, { useEffect, useState } from "react";
import { signUp, getCurrentUser, autoSignIn } from "aws-amplify/auth";
import '@/lib/cognito/client'; // Configurar Amplify
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ChefHat, Sparkles } from "lucide-react";

export default function Register() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                await getCurrentUser();
                // Si llega aquí, el usuario está autenticado
                router.replace("/");
            } catch {
                // Usuario no autenticado, permanece en register
            }
        };
        checkSession();
    }, [router]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: email,
                password,
                options: {
                    userAttributes: {
                        email,
                    },
                    autoSignIn: true, // Habilita auto sign-in después del registro
                },
            });

            // Si el User Pool está configurado sin confirmación de email
            // el usuario será creado inmediatamente
            if (isSignUpComplete) {
                setLoading(false);
                setMessage("Cuenta creada correctamente. Redirigiendo...");

                // Auto sign-in después de registro exitoso
                try {
                    await autoSignIn();
                    setTimeout(() => {
                        router.push("/onboarding");
                    }, 1000);
                } catch (autoSignInError) {
                    // Si auto sign-in falla, redirigir a login
                    setTimeout(() => {
                        router.push("/login");
                    }, 1000);
                }
            } else if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
                // Si requiere confirmación (configuración futura)
                setLoading(false);
                setMessage("Cuenta creada. Por favor, revisa tu correo para confirmar tu registro.");
            } else {
                setLoading(false);
                setMessage("Cuenta creada correctamente.");
            }
        } catch (err: any) {
            setLoading(false);

            // Manejo de errores específicos de Cognito
            let errorMessage = "Ha ocurrido un error inesperado. Por favor, intenta nuevamente.";

            if (err.name === 'UsernameExistsException') {
                errorMessage = "Ya existe una cuenta con este correo.";
            } else if (err.name === 'InvalidPasswordException') {
                errorMessage = "La contraseña no cumple con los requisitos de seguridad.";
            } else if (err.name === 'InvalidParameterException') {
                errorMessage = "El correo electrónico no es válido.";
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        }
    }

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50">
            {/* Fondos decorativos */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Tarjeta principal */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 w-[380px]"
            >
                <Card className="backdrop-blur-xl bg-white/70 border border-gray-200/50 rounded-3xl shadow-2xl shadow-green-200/30">
                    <CardHeader className="text-center space-y-3">
                        <div className="flex justify-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                                <ChefHat className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Crear cuenta
                        </CardTitle>
                        <p className="text-gray-500 text-sm">Únete y empieza a planificar mejor tus comidas 🍽️</p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleRegister} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-gray-700 font-medium">
                                    Correo electrónico
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tucorreo@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password" className="text-gray-700 font-medium">
                                    Contraseña
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all"
                                />
                            </div>

                            {/* Mensajes */}
                            {error && (
                                <p className="text-sm text-red-500 text-center bg-red-50 py-2 rounded-lg border border-red-100">
                                    {error}
                                </p>
                            )}

                            {message && (
                                <p className="text-sm text-green-600 text-center bg-green-50 py-2 rounded-lg border border-green-100">
                                    {message}
                                </p>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-xl shadow-green-500/20 hover:shadow-green-500/40 transition-all hover:scale-[1.02]"
                            >
                                {loading ? "Creando cuenta..." : "Registrarme"}
                            </Button>

                            <p className="text-sm text-center text-gray-500 mt-3">
                                ¿Ya tienes cuenta?{" "}
                                <a
                                    href="/login"
                                    className="text-green-600 hover:text-emerald-700 font-medium hover:underline"
                                >
                                    Inicia sesión
                                </a>
                            </p>
                        </form>
                    </CardContent>
                </Card>

                {/* Mensaje decorativo inferior */}
                <div className="mt-6 flex justify-center items-center text-gray-500 text-sm gap-2">
                    <Sparkles className="w-4 h-4 text-green-500" />
                    <span>Planificación inteligente con IA</span>
                </div>
            </motion.div>
        </main>
    );
}