"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowLeft, Check, ChevronRight } from "lucide-react"

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
            description: "Para negocios que inician",
            features: ["Facturación fiscal", "Inventario básico", "1 usuario", "Soporte email"],
            recommended: false,
        },
        {
            id: "empresarial",
            name: "Empresarial",
            price: "$99",
            period: "/mes",
            description: "Para negocios en crecimiento",
            features: ["Todo en Emprendedor", "Multi-almacén", "5 usuarios", "Reportes avanzados", "Soporte prioritario"],
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
            features: ["Software completo", "Conexión HKA/Bixolon", "Actualizaciones", "Soporte técnico"],
            recommended: false,
        },
        {
            id: "anual",
            name: "Anual",
            price: "$290",
            period: "/año",
            description: "Ahorra 2 meses",
            features: ["Todo en Mensual", "Soporte prioritario", "Ahorro de $58"],
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
            features: ["Todo en Gratuito", "Multi-ubicación", "Multi-usuario", "Soporte dedicado"],
            recommended: true,
        },
    ],
}

export default function OnboardingScreen() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("midaz-onboarding-v3")
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
        localStorage.setItem("midaz-onboarding-v3", JSON.stringify({ formData, currentStep }))
    }, [formData, currentStep])

    const goToStep = (step: number) => {
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentStep(step)
            setIsAnimating(false)
        }, 200)
    }

    const nextStep = () => goToStep(currentStep + 1)
    const prevStep = () => goToStep(currentStep - 1)

    const updateFormData = (updates: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...updates }))
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1: return formData.businessName && formData.email
            case 2: return formData.employeeCount !== null && formData.monthlyVolume !== null
            case 3: return formData.solution !== null
            case 4: return formData.plan !== null
            default: return true
        }
    }

    const finishOnboarding = () => {
        localStorage.removeItem("midaz-onboarding-v3")
        window.location.href = "/"
    }

    const totalSteps = 5

    // Midaz brand colors
    const brandNavy = "#0a0a1a"
    const brandGold = "#d4a853"

    return (
        <div className="min-h-screen bg-white">
            {/* Header with logo and progress */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-3">
                        <img
                            src="/images/midaz-logo.png"
                            alt="Midaz"
                            className="h-10 w-auto"
                        />
                    </a>

                    {currentStep > 0 && currentStep < totalSteps && (
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`h-1 rounded-full transition-all duration-300 ${step <= currentStep
                                            ? "w-8"
                                            : "w-4 bg-gray-200"
                                        }`}
                                    style={{
                                        backgroundColor: step <= currentStep ? brandGold : undefined
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <a href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        Salir
                    </a>
                </div>
            </header>

            {/* Main content */}
            <main className={`pt-20 transition-opacity duration-200 ${isAnimating ? "opacity-0" : "opacity-100"}`}>

                {/* Step 0: Welcome */}
                {currentStep === 0 && (
                    <div className="min-h-[calc(100vh-80px)] flex flex-col">
                        <div className="flex-1 flex items-center justify-center px-6">
                            <div className="max-w-xl text-center">
                                {/* Logo */}
                                <div className="mb-8">
                                    <img
                                        src="/images/midaz-logo.png"
                                        alt="Midaz"
                                        className="h-20 w-auto mx-auto"
                                    />
                                </div>

                                <h1
                                    className="text-5xl md:text-6xl font-semibold tracking-tight mb-6"
                                    style={{ color: brandNavy }}
                                >
                                    Comienza con Midaz
                                </h1>
                                <p className="text-xl text-gray-500 mb-12 leading-relaxed">
                                    Configura tu negocio en minutos. Sin compromisos, sin tarjeta de crédito.
                                </p>
                                <button
                                    onClick={nextStep}
                                    className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-full font-medium text-lg transition-all hover:opacity-90"
                                    style={{ backgroundColor: brandGold }}
                                >
                                    Empezar
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="text-center pb-8 text-sm text-gray-400">
                            4 pasos • Menos de 3 minutos
                        </div>
                    </div>
                )}

                {/* Step 1: Business Info */}
                {currentStep === 1 && (
                    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
                        <div className="w-full max-w-md">
                            <div className="mb-10">
                                <p className="text-sm font-medium mb-2" style={{ color: brandGold }}>Paso 1 de 4</p>
                                <h2 className="text-3xl font-semibold mb-2" style={{ color: brandNavy }}>
                                    Cuéntanos sobre tu negocio
                                </h2>
                                <p className="text-gray-500">
                                    Necesitamos algunos datos para crear tu cuenta.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre del negocio
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => updateFormData({ businessName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all"
                                        style={{
                                            borderColor: formData.businessName ? brandGold : undefined,
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = brandGold}
                                        onBlur={(e) => e.target.style.borderColor = formData.businessName ? brandGold : '#e5e7eb'}
                                        placeholder="Mi Negocio C.A."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        RIF <span className="text-gray-400 font-normal">(opcional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.rif}
                                        onChange={(e) => updateFormData({ rif: e.target.value.toUpperCase() })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500"
                                        placeholder="J-12345678-9"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateFormData({ email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500"
                                        placeholder="correo@empresa.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateFormData({ phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-500"
                                        placeholder="+58 424 123 4567"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-10">
                                <button
                                    onClick={prevStep}
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Atrás
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!canProceed()}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${canProceed()
                                            ? "text-white hover:opacity-90"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                    style={{
                                        backgroundColor: canProceed() ? brandGold : undefined
                                    }}
                                >
                                    Continuar
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Business Profile */}
                {currentStep === 2 && (
                    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
                        <div className="w-full max-w-lg">
                            <div className="mb-10">
                                <p className="text-sm font-medium mb-2" style={{ color: brandGold }}>Paso 2 de 4</p>
                                <h2 className="text-3xl font-semibold mb-2" style={{ color: brandNavy }}>
                                    ¿Cómo es tu negocio?
                                </h2>
                                <p className="text-gray-500">
                                    Esto nos ayuda a recomendarte la mejor solución.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {/* Employee count */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-4">
                                        ¿Cuántos empleados tienes?
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: "solo", label: "Solo yo" },
                                            { value: "small", label: "2-5" },
                                            { value: "medium", label: "6-20" },
                                            { value: "large", label: "Más de 20" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => updateFormData({ employeeCount: option.value })}
                                                className={`py-4 px-4 rounded-lg border-2 font-medium transition-all ${formData.employeeCount === option.value
                                                        ? "bg-amber-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                style={{
                                                    borderColor: formData.employeeCount === option.value ? brandGold : undefined,
                                                    color: formData.employeeCount === option.value ? brandNavy : undefined
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Monthly volume */}
                                <div>
                                    <p className="text-sm font-medium text-gray-700 mb-4">
                                        ¿Cuál es tu volumen mensual aproximado?
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { value: "low", label: "Menos de $5,000" },
                                            { value: "medium", label: "$5,000 - $20,000" },
                                            { value: "high", label: "$20,000 - $100,000" },
                                            { value: "enterprise", label: "Más de $100,000" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => updateFormData({ monthlyVolume: option.value })}
                                                className={`py-4 px-4 rounded-lg border-2 font-medium transition-all text-sm ${formData.monthlyVolume === option.value
                                                        ? "bg-amber-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                style={{
                                                    borderColor: formData.monthlyVolume === option.value ? brandGold : undefined,
                                                    color: formData.monthlyVolume === option.value ? brandNavy : undefined
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-10">
                                <button
                                    onClick={prevStep}
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Atrás
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!canProceed()}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${canProceed()
                                            ? "text-white hover:opacity-90"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                    style={{
                                        backgroundColor: canProceed() ? brandGold : undefined
                                    }}
                                >
                                    Continuar
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Choose Solution */}
                {currentStep === 3 && (
                    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
                        <div className="w-full max-w-4xl">
                            <div className="text-center mb-12">
                                <p className="text-sm font-medium mb-2" style={{ color: brandGold }}>Paso 3 de 4</p>
                                <h2 className="text-3xl md:text-4xl font-semibold mb-2" style={{ color: brandNavy }}>
                                    Elige tu solución
                                </h2>
                                <p className="text-gray-500">
                                    Selecciona la que mejor se adapte a tu negocio.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Agora */}
                                <button
                                    onClick={() => updateFormData({ solution: "agora", plan: null })}
                                    className={`relative p-8 rounded-2xl text-left transition-all border-2 ${formData.solution === "agora"
                                            ? "bg-amber-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    style={{
                                        borderColor: formData.solution === "agora" ? brandGold : undefined
                                    }}
                                >
                                    <div className="absolute top-4 right-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                            Disponible
                                        </span>
                                    </div>
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: brandNavy }}
                                    >
                                        <span className="text-white text-lg">📱</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: brandNavy }}>Midaz Ágora</h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Dispositivo N82 todo-en-uno con impresora fiscal integrada.
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Ideal para tiendas y comercios
                                    </p>
                                </button>

                                {/* Web */}
                                <button
                                    onClick={() => updateFormData({ solution: "web", plan: null })}
                                    className={`relative p-8 rounded-2xl text-left transition-all border-2 ${formData.solution === "web"
                                            ? "bg-amber-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    style={{
                                        borderColor: formData.solution === "web" ? brandGold : undefined
                                    }}
                                >
                                    <div className="absolute top-4 right-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                            Disponible
                                        </span>
                                    </div>
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: brandNavy }}
                                    >
                                        <span className="text-white text-lg">💻</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: brandNavy }}>Midaz Web</h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Software para PC con tu impresora fiscal existente.
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Ideal para oficinas y servicios
                                    </p>
                                </button>

                                {/* Gestion */}
                                <button
                                    onClick={() => updateFormData({ solution: "gestion", plan: null })}
                                    className={`relative p-8 rounded-2xl text-left transition-all border-2 ${formData.solution === "gestion"
                                            ? "bg-amber-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    style={{
                                        borderColor: formData.solution === "gestion" ? brandGold : undefined
                                    }}
                                >
                                    <div className="absolute top-4 right-4">
                                        <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: `${brandGold}20`, color: brandGold }}>
                                            Gratis
                                        </span>
                                    </div>
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                                        style={{ backgroundColor: brandNavy }}
                                    >
                                        <span className="text-white text-lg">📊</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: brandNavy }}>Gestión</h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Control de inventario sin facturación fiscal.
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Ideal para emprendedores
                                    </p>
                                </button>
                            </div>

                            <div className="flex items-center justify-between mt-12">
                                <button
                                    onClick={prevStep}
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Atrás
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!canProceed()}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${canProceed()
                                            ? "text-white hover:opacity-90"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                    style={{
                                        backgroundColor: canProceed() ? brandGold : undefined
                                    }}
                                >
                                    Continuar
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Choose Plan */}
                {currentStep === 4 && formData.solution && (
                    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
                        <div className="w-full max-w-3xl">
                            <div className="text-center mb-12">
                                <p className="text-sm font-medium mb-2" style={{ color: brandGold }}>Paso 4 de 4</p>
                                <h2 className="text-3xl md:text-4xl font-semibold mb-2" style={{ color: brandNavy }}>
                                    Selecciona tu plan
                                </h2>
                                <p className="text-gray-500">
                                    Puedes cambiar de plan en cualquier momento.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {plansByProduct[formData.solution].map((plan) => (
                                    <button
                                        key={plan.id}
                                        onClick={() => updateFormData({ plan: plan.id })}
                                        className={`relative p-8 rounded-2xl text-left transition-all border-2 ${formData.plan === plan.id
                                                ? "bg-amber-50"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        style={{
                                            borderColor: formData.plan === plan.id ? brandGold : undefined
                                        }}
                                    >
                                        {plan.recommended && (
                                            <div className="absolute -top-3 left-6">
                                                <span
                                                    className="px-3 py-1 text-white text-xs font-medium rounded-full"
                                                    style={{ backgroundColor: brandGold }}
                                                >
                                                    Recomendado
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-xl font-semibold" style={{ color: brandNavy }}>{plan.name}</h3>
                                                <p className="text-gray-500 text-sm">{plan.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-semibold" style={{ color: brandNavy }}>{plan.price}</div>
                                                <div className="text-gray-400 text-sm">{plan.period}</div>
                                            </div>
                                        </div>

                                        <ul className="space-y-3">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                    <Check className="w-4 h-4" style={{ color: brandGold }} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <span
                                                className="text-sm font-medium"
                                                style={{ color: formData.plan === plan.id ? brandGold : '#9ca3af' }}
                                            >
                                                {formData.plan === plan.id ? "✓ Seleccionado" : "Seleccionar plan"}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-12">
                                <button
                                    onClick={prevStep}
                                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Atrás
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={!canProceed()}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${canProceed()
                                            ? "text-white hover:opacity-90"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                    style={{
                                        backgroundColor: canProceed() ? brandGold : undefined
                                    }}
                                >
                                    Finalizar
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Success */}
                {currentStep === 5 && (
                    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
                        <div className="max-w-lg text-center">
                            {/* Success icon */}
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                                style={{ backgroundColor: brandGold }}
                            >
                                <Check className="w-10 h-10 text-white" />
                            </div>

                            <h1 className="text-4xl font-semibold mb-4" style={{ color: brandNavy }}>
                                ¡Todo listo!
                            </h1>
                            <p className="text-lg text-gray-500 mb-8">
                                Tu cuenta ha sido creada. Estás listo para comenzar.
                            </p>

                            {/* Summary */}
                            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                                <h3 className="text-sm font-medium text-gray-400 mb-4">Resumen</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Negocio</span>
                                        <span className="font-medium" style={{ color: brandNavy }}>{formData.businessName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Solución</span>
                                        <span className="font-medium" style={{ color: brandNavy }}>
                                            {formData.solution === "agora" ? "Midaz Ágora" :
                                                formData.solution === "web" ? "Midaz Web" : "Gestión"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Plan</span>
                                        <span className="font-medium capitalize" style={{ color: brandNavy }}>{formData.plan}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Next steps */}
                            <div
                                className="rounded-2xl p-6 mb-8 text-left"
                                style={{ backgroundColor: `${brandGold}15` }}
                            >
                                <p style={{ color: brandNavy }}>
                                    <strong>Próximo paso:</strong> {formData.solution === "agora"
                                        ? "Te contactaremos en 24 horas para coordinar la entrega de tu dispositivo."
                                        : "Revisa tu correo para acceder a tu cuenta."}
                                </p>
                            </div>

                            <button
                                onClick={finishOnboarding}
                                className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-full font-medium text-lg transition-all hover:opacity-90"
                                style={{ backgroundColor: brandGold }}
                            >
                                Ir al inicio
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
