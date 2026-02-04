"use client"

import { ArrowRight, Shield, Building2, CheckCircle } from "lucide-react"

export default function HeroSection() {
    return (
        <section className="min-h-screen hero-gradient relative overflow-hidden flex items-center pt-20">
            {/* Animated background elements */}
            <div className="absolute inset-0 mesh-gradient opacity-30"></div>

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl float"></div>
            <div
                className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-xl float"
                style={{ animationDelay: "2s" }}
            ></div>
            <div
                className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl float"
                style={{ animationDelay: "4s" }}
            ></div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 fade-in">
                        {/* Company heritage badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                                <Building2 className="w-4 h-4 text-blue-400" />
                                <span className="text-white/90 font-medium text-sm">by Disglobal</span>
                            </div>
                        </div>

                        {/* Main heading - Professional messaging */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                El Amanecer de una <span className="text-gradient">Nueva Era</span>
                                <br />
                                para Cada Negocio
                            </h1>
                        </div>

                        {/* Professional description with current availability */}
                        <div className="space-y-4">
                            <p className="text-xl text-white/90 leading-relaxed max-w-2xl font-medium">
                                La solución transformadora que revoluciona negocios de todos los tamaños con una suite integrada que
                                <strong className="text-blue-300"> maximiza eficiencia, optimiza operaciones</strong> e impulsa el
                                crecimiento empresarial.
                            </p>
                            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                                Comienza hoy con <strong className="text-green-300">AGORA</strong>, nuestro POS disponible ahora. Más
                                soluciones especializadas en desarrollo activo.
                            </p>
                        </div>

                        {/* Business size indicator with availability */}
                        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30">
                            <div className="text-center mb-4">
                                <h4 className="text-white font-bold mb-2 text-lg">Para Negocios de Todos los Tamaños</h4>
                                <div className="flex justify-center items-center gap-6 text-white/80 text-sm mb-4">
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                        Pequeños
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                        Medianos
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                                        Grandes
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#productos" className="btn-primary">
                                <span>Explorar Soluciones</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a href="/comenzar" className="btn-secondary">
                                <span>Comenzar Gratis</span>
                            </a>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap gap-6 text-white/60 text-sm">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-blue-400" />
                                <span>Respaldado por Disglobal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-green-400" />
                                <span>Cumplimiento Garantizado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                <span>AGORA Disponible Ahora</span>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced phone mockup showing business transformation with availability */}
                    <div className="phone-container slide-up">
                        <div className="phone-mockup">
                            <div className="phone-screen">
                                {/* App header with transformation theme */}
                                <div className="flex justify-between items-center pb-4 border-b border-gray-300/50 relative z-10">
                                    <div>
                                        <div className="text-2xl font-bold text-gradient">MIDAZ</div>
                                        <div className="text-xs text-gray-500 font-medium">by Disglobal</div>
                                    </div>
                                    <div className="w-3 h-3 bg-emerald-400 rounded-full pulse-glow"></div>
                                </div>

                                {/* Business transformation metrics with availability */}
                                <div className="app-item bg-green-50 border-l-4 border-green-500" style={{ animationDelay: "0.2s" }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">📈</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">AGORA - Crecimiento</span>
                                            <div className="text-xs text-green-600 font-semibold">✓ Disponible Ahora</div>
                                        </div>
                                    </div>
                                    <span className="text-xl font-bold text-emerald-600">+47%</span>
                                </div>

                                <div
                                    className="app-item bg-orange-50 border-l-4 border-orange-500"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">🍽️</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">AMBROSIA - F&B</span>
                                            <div className="text-xs text-orange-600 font-semibold">🚧 Q2 2025</div>
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-orange-600">Próximo</span>
                                </div>

                                <div className="app-item bg-blue-50 border-l-4 border-blue-500" style={{ animationDelay: "0.6s" }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">🖥️</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">ATLAS - Kioscos</span>
                                            <div className="text-xs text-blue-600 font-semibold">⏳ Q3 2025</div>
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-blue-600">Desarrollo</span>
                                </div>

                                <div
                                    className="app-item bg-purple-50 border-l-4 border-purple-500"
                                    style={{ animationDelay: "0.8s" }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">⚡</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">ETER - Custom</span>
                                            <div className="text-xs text-purple-600 font-semibold">💭 Q4 2025</div>
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-purple-600">Concepto</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
