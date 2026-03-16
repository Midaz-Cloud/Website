"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowLeft, Check, ChevronRight, Users, DollarSign, Smartphone, Monitor, BarChart3 } from "lucide-react"

// Types
interface FormData {
    businessName: string
    rif: string
    email: string
    phone: string
    employeeCount: string | null
    monthlyVolume: string | null
    solution: "agora" | "web" | "gestion" | null
    plan: string | null
}

const initialFormData: FormData = {
    businessName: "",
    rif: "",
    email: "",
    phone: "",
    employeeCount: null,
    monthlyVolume: null,
    solution: null,
    plan: null,
}

const plansByProduct = {
    agora: [
        {
            id: "emprendedor",
            name: "Emprendedor",
            price: "$49",
            period: "/mes",
            description: "Ideal para nuevos comienzos",
            features: ["Facturación fiscal", "Inventario básico", "1 usuario", "Asistencia técnica humana 24/7"],
            recommended: false,
        },
        {
            id: "empresarial",
            name: "Empresarial",
            price: "$99",
            period: "/mes",
            description: "Potencia tu expansión",
            features: ["Todo en Emprendedor", "Multi-almacén", "5 usuarios", "Reportes avanzados", "Asistencia técnica humana 24/7"],
            recommended: true,
        },
    ],
    web: [
        {
            id: "mensual",
            name: "Mensual",
            price: "$29",
            period: "/mes",
            description: "Pago flexible",
            features: ["Software completo", "Conexión HKA/Bixolon", "Actualizaciones", "Asistencia técnica humana 24/7"],
            recommended: false,
        },
        {
            id: "anual",
            name: "Anual",
            price: "$290",
            period: "/año",
            description: "Ahorra 2 meses",
            features: ["Todo en Mensual", "Ahorro de $58", "Asistencia técnica humana 24/7"],
            recommended: true,
        },
    ],
    gestion: [
        {
            id: "gratuito",
            name: "Gratuito",
            price: "$0",
            period: "",
            description: "Para empezar",
            features: ["Control de inventario", "1 ubicación", "Reportes básicos"],
            recommended: false,
        },
        {
            id: "pro",
            name: "Pro",
            price: "$19",
            period: "/mes",
            description: "Control total",
            features: ["Todo en Gratuito", "Multi-ubicación", "Multi-usuario", "Asistencia técnica humana 24/7"],
            recommended: true,
        },
    ],
}

// Animation styles
const styles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse-ring {
        0% {
            transform: scale(0.8);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.2);
            opacity: 0.4;
        }
        100% {
            transform: scale(0.8);
            opacity: 0.8;
        }
    }
    
    .step-enter {
        animation: fadeInUp 0.5s ease-out forwards;
    }
    
    .step-exit {
        animation: fadeOutUp 0.3s ease-in forwards;
    }
    
    .card-enter {
        animation: scaleIn 0.4s ease-out forwards;
    }
    
    .slide-in {
        animation: slideInRight 0.5s ease-out forwards;
    }
    
    .stagger-1 { animation-delay: 0.1s; opacity: 0; }
    .stagger-2 { animation-delay: 0.2s; opacity: 0; }
    .stagger-3 { animation-delay: 0.3s; opacity: 0; }
    .stagger-4 { animation-delay: 0.4s; opacity: 0; }
`

export default function OnboardingScreen() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next')

    useEffect(() => {
        const saved = localStorage.getItem("midaz-onboarding-v4")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setFormData(parsed.formData || initialFormData)
                setCurrentStep(parsed.currentStep || 0)
            } catch (e) {
                console.error("Error loading onboarding state", e)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("midaz-onboarding-v4", JSON.stringify({ formData, currentStep }))
    }, [formData, currentStep])

    const goToStep = (step: number, direction: 'next' | 'prev' = 'next') => {
        setTransitionDirection(direction)
        setIsTransitioning(true)

        setTimeout(() => {
            setCurrentStep(step)
            setIsTransitioning(false)
        }, 300)
    }

    const nextStep = () => goToStep(currentStep + 1, 'next')
    const prevStep = () => goToStep(currentStep - 1, 'prev')

    const updateFormData = (updates: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...updates }))
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1: return formData.businessName.length >= 3 && formData.email
            case 2: return formData.employeeCount !== null
            case 3: return formData.monthlyVolume !== null
            case 4: return formData.solution !== null
            case 5: return formData.plan !== null
            default: return true
        }
    }

    const finishOnboarding = () => {
        localStorage.removeItem("midaz-onboarding-v4")
        window.location.href = "/"
    }

    // Midaz brand colors
    const brandNavy = "#0a0a1a"
    const brandGold = "#d4a853"

    const totalSteps = 6

    return (
        <>
            <style>{styles}</style>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
                {/* Animated background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/20 rounded-full blur-3xl" />
                </div>

                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                        <a href="/" className="flex items-center gap-2">
                            <img src="/images/midaz-logo.png" alt="Midaz" className="h-8 w-auto" />
                        </a>

                        {currentStep > 0 && currentStep < totalSteps && (
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((step) => (
                                    <div
                                        key={step}
                                        className={`h-2 rounded-full transition-all duration-500 ${step <= currentStep ? "w-8" : "w-2"
                                            }`}
                                        style={{
                                            backgroundColor: step <= currentStep ? brandGold : '#e5e7eb'
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        <a href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                            Salir
                        </a>
                    </div>
                </header>

                {/* Main content with transitions */}
                <main className={`pt-24 min-h-screen ${isTransitioning ? 'step-exit' : 'step-enter'}`}>

                    {/* Step 0: Welcome */}
                    {currentStep === 0 && (
                        <div className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center px-6">
                            <div className="text-center max-w-lg">
                                <div className="mb-8 card-enter">
                                    <div
                                        className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center shadow-2xl relative"
                                        style={{ background: `linear-gradient(135deg, ${brandGold}, #b8963f)` }}
                                    >
                                        <span className="text-4xl">✨</span>
                                        <div
                                            className="absolute inset-0 rounded-3xl"
                                            style={{
                                                background: `linear-gradient(135deg, ${brandGold}, #b8963f)`,
                                                animation: 'pulse-ring 2s ease-in-out infinite',
                                                opacity: 0.3
                                            }}
                                        />
                                    </div>
                                </div>

                                <h1
                                    className="text-4xl md:text-5xl font-bold mb-4 slide-in"
                                    style={{ color: brandNavy }}
                                >
                                    ¡Todo listo para impulsar tu negocio!
                                </h1>

                                <p className="text-xl text-gray-500 mb-12 slide-in stagger-1">
                                    Configura tu tienda en pocos pasos y haz tu primera venta hoy.
                                </p>

                                <button
                                    onClick={nextStep}
                                    className="group inline-flex items-center gap-3 px-10 py-5 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl slide-in stagger-2"
                                    style={{ backgroundColor: brandGold }}
                                >
                                    ¡Empezar ahora!
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="mt-8 text-sm text-gray-400 slide-in stagger-3">
                                    ⏱️ Configuración rápida • Sin costos ocultos
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Business Info */}
                    {currentStep === 1 && (
                        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12">
                            <div className="w-full max-w-md">
                                <div className="text-center mb-10">
                                    <div
                                        className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter"
                                        style={{ backgroundColor: `${brandGold}20` }}
                                    >
                                        <span className="text-3xl">🏪</span>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2 slide-in" style={{ color: brandNavy }}>
                                        Cuéntanos sobre tu negocio
                                    </h2>
                                    <p className="text-gray-500 slide-in stagger-1">
                                        Ingresa los datos básicos para comenzar.
                                    </p>
                                </div>

                                <div className="space-y-5 slide-in stagger-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nombre del negocio *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.businessName}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const formatted = val.charAt(0).toUpperCase() + val.slice(1);
                                                updateFormData({ businessName: formatted })
                                            }}
                                            className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:shadow-lg"
                                            placeholder="Mi Negocio C.A."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Correo electrónico *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => updateFormData({ email: e.target.value.replace(/\s/g, '') })}
                                            className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:shadow-lg"
                                            placeholder="correo@empresa.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Identificación Fiscal / RIF <span className="text-gray-400">(opcional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.rif}
                                            onChange={(e) => {
                                                let val = e.target.value.toUpperCase().replace(/[^JVEG0-9-]/g, '');

                                                // Logic for Default "J" and masking
                                                if (val && /^[0-9]/.test(val)) {
                                                    val = "J-" + val;
                                                }

                                                // Simple mask implementation for X-00000000-0
                                                // If it starts with letter and we need to handle numbers
                                                let clean = val.replace(/[^JVEG0-9]/g, '');
                                                if (clean.length > 0) {
                                                    let letter = clean.charAt(0);
                                                    let numbers = clean.slice(1);
                                                    if (numbers.length > 0) {
                                                        let main = numbers.slice(0, 8);
                                                        let last = numbers.slice(8, 9);
                                                        val = `${letter}-${main}${last ? '-' + last : ''}`;
                                                    } else {
                                                        val = letter;
                                                    }
                                                }

                                                updateFormData({ rif: val })
                                            }}
                                            className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:shadow-lg"
                                            placeholder="J-12345678-9"
                                            maxLength={13}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-10 slide-in stagger-3">
                                    <button
                                        onClick={prevStep}
                                        className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Atrás
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        disabled={!canProceed()}
                                        className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${canProceed()
                                            ? "text-white hover:scale-105 hover:shadow-xl"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                        style={{ backgroundColor: canProceed() ? brandGold : undefined }}
                                    >
                                        Siguiente paso
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Team Size */}
                    {currentStep === 2 && (
                        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12">
                            <div className="w-full max-w-lg">
                                <div className="text-center mb-10">
                                    <div
                                        className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter"
                                        style={{ backgroundColor: `${brandGold}20` }}
                                    >
                                        <Users className="w-8 h-8" style={{ color: brandGold }} />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2 slide-in" style={{ color: brandNavy }}>
                                        ¿Qué tan grande es tu equipo?
                                    </h2>
                                    <p className="text-gray-500 slide-in stagger-1">
                                        Selecciona una opción para personalizar tu experiencia.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 slide-in stagger-2">
                                    {[
                                        { value: "solo", label: "Propietario único", emoji: "🧑" },
                                        { value: "small", label: "2-5 personas", emoji: "👥" },
                                        { value: "medium", label: "6-20 personas", emoji: "👨‍👩‍👧‍👦" },
                                        { value: "large", label: "Empresa corporativa (20+)", emoji: "🏢" },
                                    ].map((option, index) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                updateFormData({ employeeCount: option.value })
                                                setTimeout(nextStep, 400)
                                            }}
                                            className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl ${formData.employeeCount === option.value
                                                    ? "bg-amber-50 shadow-lg"
                                                    : "bg-white border-gray-100 hover:border-amber-200"
                                                }`}
                                            style={{
                                                borderColor: formData.employeeCount === option.value ? brandGold : undefined,
                                                animationDelay: `${index * 0.1}s`
                                            }}
                                        >
                                            <span className="text-3xl mb-3 block">{option.emoji}</span>
                                            <span className="font-semibold text-gray-900">{option.label}</span>
                                            {formData.employeeCount === option.value && (
                                                <div
                                                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: brandGold }}
                                                >
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center justify-start mt-10 slide-in stagger-3">
                                    <button
                                        onClick={prevStep}
                                        className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Atrás
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Monthly Volume */}
                    {currentStep === 3 && (
                        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12">
                            <div className="w-full max-w-lg">
                                <div className="text-center mb-10">
                                    <div
                                        className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter"
                                        style={{ backgroundColor: `${brandGold}20` }}
                                    >
                                        <DollarSign className="w-8 h-8" style={{ color: brandGold }} />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2 slide-in" style={{ color: brandNavy }}>
                                        ¿Cuál es tu volumen de ventas mensual?
                                    </h2>
                                    <p className="text-gray-500 slide-in stagger-1">
                                        Usa un estimado, esto nos ayuda a ajustar tus límites de facturación.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 slide-in stagger-2">
                                    {[
                                        { value: "low", label: "Emprendedor (Hasta $5k)", emoji: "💵" },
                                        { value: "medium", label: "$5,000 - $20,000", emoji: "💰" },
                                        { value: "high", label: "$20,000 - $100,000", emoji: "💎" },
                                        { value: "enterprise", label: "Alto Volumen (100k+)", emoji: "🚀" },
                                    ].map((option, index) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                updateFormData({ monthlyVolume: option.value })
                                                setTimeout(nextStep, 400)
                                            }}
                                            className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl ${formData.monthlyVolume === option.value
                                                    ? "bg-amber-50 shadow-lg"
                                                    : "bg-white border-gray-100 hover:border-amber-200"
                                                }`}
                                            style={{
                                                borderColor: formData.monthlyVolume === option.value ? brandGold : undefined,
                                                animationDelay: `${index * 0.1}s`
                                            }}
                                        >
                                            <span className="text-3xl mb-3 block">{option.emoji}</span>
                                            <span className="font-semibold text-gray-900 text-sm">{option.label}</span>
                                            {formData.monthlyVolume === option.value && (
                                                <div
                                                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: brandGold }}
                                                >
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center justify-start mt-10 slide-in stagger-3">
                                    <button
                                        onClick={prevStep}
                                        className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Atrás
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Choose Solution */}
                    {currentStep === 4 && (
                        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12">
                            <div className="w-full max-w-4xl">
                                <div className="text-center mb-12">
                                    <div
                                        className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter"
                                        style={{ backgroundColor: `${brandGold}20` }}
                                    >
                                        <span className="text-3xl">🎯</span>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2 slide-in" style={{ color: brandNavy }}>
                                        Selecciona tu herramienta de trabajo
                                    </h2>
                                    <p className="text-gray-500 slide-in stagger-1">
                                        ¿Cómo planeas gestionar tus ventas?
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 slide-in stagger-2">
                                    {[
                                        {
                                            id: "agora",
                                            icon: Smartphone,
                                            name: "Midaz Ágora",
                                            description: "Terminal POS N82 (Todo en uno)",
                                            tag: "Más popular",
                                            tagColor: "bg-green-100 text-green-700",
                                            ideal: "Tiendas y comercios",
                                        },
                                        {
                                            id: "web",
                                            icon: Monitor,
                                            name: "Midaz Web",
                                            description: "Sistema Web (Para PC) + Impresa Fiscal",
                                            tag: "Disponible",
                                            tagColor: "bg-blue-100 text-blue-700",
                                            ideal: "Oficinas y servicios",
                                        },
                                        {
                                            id: "gestion",
                                            icon: BarChart3,
                                            name: "Gestión",
                                            description: "Control de inventario + Panel de Gestión",
                                            tag: "Gratis",
                                            tagColor: "bg-amber-100 text-amber-700",
                                            ideal: "Emprendedores",
                                        },
                                    ].map((solution, index) => {
                                        const Icon = solution.icon
                                        return (
                                            <button
                                                key={solution.id}
                                                onClick={() => {
                                                    updateFormData({ solution: solution.id as any, plan: null })
                                                    setTimeout(nextStep, 400)
                                                }}
                                                className={`group relative p-8 rounded-3xl border-2 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl ${formData.solution === solution.id
                                                        ? "bg-amber-50 shadow-xl"
                                                        : "bg-white border-gray-100 hover:border-amber-200"
                                                    }`}
                                                style={{
                                                    borderColor: formData.solution === solution.id ? brandGold : undefined,
                                                    animationDelay: `${index * 0.15}s`
                                                }}
                                            >
                                                <div className="absolute top-4 right-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${solution.tagColor}`}>
                                                        {solution.tag}
                                                    </span>
                                                </div>

                                                <div
                                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                                                    style={{ backgroundColor: brandNavy }}
                                                >
                                                    <Icon className="w-7 h-7 text-white" />
                                                </div>

                                                <h3 className="text-xl font-bold mb-2" style={{ color: brandNavy }}>
                                                    {solution.name}
                                                </h3>
                                                <p className="text-gray-500 text-sm mb-4">
                                                    {solution.description}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Ideal para: {solution.ideal}
                                                </p>

                                                {formData.solution === solution.id && (
                                                    <div
                                                        className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                                                        style={{ backgroundColor: brandGold }}
                                                    >
                                                        <Check className="w-5 h-5 text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="flex items-center justify-start mt-10 slide-in stagger-3">
                                    <button
                                        onClick={prevStep}
                                        className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Atrás
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Choose Plan */}
                    {currentStep === 5 && formData.solution && (
                        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12">
                            <div className="w-full max-w-3xl">
                                <div className="text-center mb-12">
                                    <div
                                        className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter"
                                        style={{ backgroundColor: `${brandGold}20` }}
                                    >
                                        <span className="text-3xl">💎</span>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2 slide-in" style={{ color: brandNavy }}>
                                        Elige el motor de tu crecimiento
                                    </h2>
                                    <p className="text-gray-500 slide-in stagger-1">
                                        Sin compromisos: escala o cambia tu plan cuando lo necesites.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 slide-in stagger-2">
                                    {plansByProduct[formData.solution].map((plan, index) => (
                                        <button
                                            key={plan.id}
                                            onClick={() => {
                                                updateFormData({ plan: plan.id })
                                                setTimeout(nextStep, 400)
                                            }}
                                            className={`group relative p-8 rounded-3xl border-2 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl ${formData.plan === plan.id
                                                    ? "bg-amber-50 shadow-xl"
                                                    : "bg-white border-gray-100 hover:border-amber-200"
                                                }`}
                                            style={{
                                                borderColor: formData.plan === plan.id ? brandGold : undefined,
                                                animationDelay: `${index * 0.15}s`
                                            }}
                                        >
                                            {plan.recommended && (
                                                <div
                                                    className="absolute -top-3 left-6 px-4 py-1 rounded-full text-white text-xs font-semibold"
                                                    style={{ backgroundColor: brandGold }}
                                                >
                                                    Recomendado
                                                </div>
                                            )}

                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="text-2xl font-bold" style={{ color: brandNavy }}>
                                                        {plan.name}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm">{plan.description}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-3xl font-bold" style={{ color: brandNavy }}>
                                                        {plan.price}
                                                    </div>
                                                    <div className="text-gray-400 text-sm">{plan.period}</div>
                                                </div>
                                            </div>

                                            <ul className="space-y-3">
                                                {plan.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: brandGold }} />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            {formData.plan === plan.id && (
                                                <div
                                                    className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: brandGold }}
                                                >
                                                    <Check className="w-5 h-5 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center justify-start mt-10 slide-in stagger-3">
                                    <button
                                        onClick={prevStep}
                                        className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Atrás
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 6: Success */}
                    {currentStep === 6 && (
                        <div className="min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12">
                            <div className="max-w-lg text-center">
                                <div className="mb-8 card-enter">
                                    <div
                                        className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-2xl relative"
                                        style={{ backgroundColor: brandGold }}
                                    >
                                        <Check className="w-12 h-12 text-white" />
                                        <div
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                backgroundColor: brandGold,
                                                animation: 'pulse-ring 2s ease-in-out infinite',
                                                opacity: 0.3
                                            }}
                                        />
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold mb-4 slide-in" style={{ color: brandNavy }}>
                                    ¡Bienvenido a la familia Midaz!
                                </h1>
                                <p className="text-xl text-gray-500 mb-8 slide-in stagger-1">
                                    Tu entorno de gestión ya está activo.
                                </p>

                                <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-left slide-in stagger-2">
                                    <h3 className="text-sm font-medium text-gray-400 mb-4">Detalles de tu suscripción</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Negocio</span>
                                            <span className="font-semibold" style={{ color: brandNavy }}>{formData.businessName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Solución</span>
                                            <span className="font-semibold" style={{ color: brandNavy }}>
                                                {formData.solution === "agora" ? "Midaz Ágora" :
                                                    formData.solution === "web" ? "Midaz Web" : "Gestión"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Plan</span>
                                            <span className="font-semibold capitalize" style={{ color: brandNavy }}>{formData.plan}</span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="rounded-2xl p-6 mb-8 text-left slide-in stagger-3"
                                    style={{ backgroundColor: `${brandGold}15` }}
                                >
                                    <p style={{ color: brandNavy }}>
                                        <strong>📧 ¡Te enviamos una guía a tu correo!</strong>
                                    </p>
                                </div>

                                <button
                                    onClick={finishOnboarding}
                                    className="group inline-flex items-center gap-3 px-10 py-5 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl slide-in stagger-4"
                                    style={{ backgroundColor: brandGold }}
                                >
                                    Ir al inicio
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}
