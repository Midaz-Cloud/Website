"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, ArrowLeft, Check, Building2, FileText, Phone, Mail, User, Store, Monitor, Zap, Sparkles } from "lucide-react"

// Types
interface FormData {
    // Step 1: Identity
    businessName: string
    rif: string
    email: string
    phone: string
    // Step 2: Diagnosis
    hasMultipleEmployees: boolean | null
    highVolume: boolean | null
    multipleLocations: boolean | null
    // Step 3: Solution
    solution: "agora" | "web" | "gestion" | null
    // Step 4: Plan
    plan: string | null
}

const initialFormData: FormData = {
    businessName: "",
    rif: "",
    email: "",
    phone: "",
    hasMultipleEmployees: null,
    highVolume: null,
    multipleLocations: null,
    solution: null,
    plan: null,
}

// Plans by solution type
const plansByProduct = {
    agora: [
        {
            id: "emprendedor",
            name: "Emprendedor Ágora",
            price: "$49",
            period: "/mes",
            description: "Perfecto para iniciar",
            features: ["Facturación fiscal", "Inventario básico", "1 usuario", "Soporte por email"],
            recommended: false,
        },
        {
            id: "empresarial",
            name: "Empresarial Ágora",
            price: "$99",
            period: "/mes",
            description: "Para negocios en crecimiento",
            features: ["Facturación fiscal", "Multi-almacén", "5 usuarios", "Reportes avanzados", "Soporte prioritario"],
            recommended: true,
        },
    ],
    web: [
        {
            id: "mensual",
            name: "Licencia Mensual",
            price: "$29",
            period: "/mes",
            description: "Pago flexible",
            features: ["Software completo", "Conexión HKA/Bixolon", "Actualizaciones", "Soporte técnico"],
            recommended: false,
        },
        {
            id: "anual",
            name: "Licencia Anual",
            price: "$290",
            period: "/año",
            description: "Ahorra 2 meses",
            features: ["Software completo", "Conexión HKA/Bixolon", "Actualizaciones", "Soporte prioritario", "Setup gratuito"],
            recommended: true,
        },
    ],
    gestion: [
        {
            id: "gratuito",
            name: "Plan Gratuito",
            price: "$0",
            period: "",
            description: "Para empezar",
            features: ["Control de inventario", "1 ubicación", "Reportes básicos"],
            recommended: false,
        },
        {
            id: "pro",
            name: "Plan Pro",
            price: "$19",
            period: "/mes",
            description: "Control total",
            features: ["Inventario ilimitado", "Multi-ubicación", "Cuentas por cobrar", "Multi-usuario", "Soporte"],
            recommended: true,
        },
    ],
}

export default function OnboardingModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [isAnimating, setIsAnimating] = useState(false)

    // Listen for open event
    useEffect(() => {
        const handleOpen = () => setIsOpen(true)
        window.addEventListener("open-onboarding", handleOpen)
        return () => window.removeEventListener("open-onboarding", handleOpen)
    }, [])

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("midaz-onboarding")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setFormData(parsed.formData || initialFormData)
                setCurrentStep(parsed.currentStep || 1)
            } catch (e) {
                console.error("Error loading onboarding state", e)
            }
        }
    }, [])

    // Save to localStorage
    useEffect(() => {
        if (isOpen) {
            localStorage.setItem("midaz-onboarding", JSON.stringify({ formData, currentStep }))
        }
    }, [formData, currentStep, isOpen])

    const handleClose = () => {
        setIsOpen(false)
    }

    const goToStep = (step: number) => {
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentStep(step)
            setIsAnimating(false)
        }, 200)
    }

    const nextStep = () => {
        if (currentStep < 5) goToStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) goToStep(currentStep - 1)
    }

    const updateFormData = (updates: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...updates }))
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return formData.businessName && formData.rif && formData.email
            case 2:
                return formData.hasMultipleEmployees !== null && formData.highVolume !== null && formData.multipleLocations !== null
            case 3:
                return formData.solution !== null
            case 4:
                return formData.plan !== null
            default:
                return true
        }
    }

    const resetOnboarding = () => {
        setFormData(initialFormData)
        setCurrentStep(1)
        localStorage.removeItem("midaz-onboarding")
        setIsOpen(false)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Progress bar */}
                <div className="h-1 bg-gray-100">
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                        style={{ width: `${(currentStep / 5) * 100}%` }}
                    />
                </div>

                {/* Step indicators */}
                <div className="flex justify-center gap-2 py-4 bg-gray-50/50">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div
                            key={step}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${step === currentStep
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110"
                                : step < currentStep
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            {step < currentStep ? <Check className="w-4 h-4" /> : step}
                        </div>
                    ))}
                </div>

                {/* Content area */}
                <div className={`p-8 overflow-y-auto max-h-[60vh] transition-opacity duration-200 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
                    {/* Step 1: Identity */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">¡Bienvenido a Midaz!</h2>
                                <p className="text-gray-600 mt-2">Cuéntanos sobre tu negocio</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <Store className="w-4 h-4" />
                                        Nombre del Negocio *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => updateFormData({ businessName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        placeholder="Mi Negocio C.A."
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <FileText className="w-4 h-4" />
                                        RIF *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.rif}
                                        onChange={(e) => updateFormData({ rif: e.target.value.toUpperCase() })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        placeholder="J-12345678-9"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="w-4 h-4" />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => updateFormData({ email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                            placeholder="correo@empresa.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="w-4 h-4" />
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => updateFormData({ phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                            placeholder="+58 424-123-4567"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Diagnosis */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Diagnóstico Rápido</h2>
                                <p className="text-gray-600 mt-2">3 preguntas para recomendarte la mejor solución</p>
                            </div>

                            <div className="space-y-4">
                                {/* Question 1 */}
                                <div className="p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all">
                                    <p className="font-medium text-gray-900 mb-3">¿Tu negocio tiene más de 5 empleados?</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => updateFormData({ hasMultipleEmployees: true })}
                                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${formData.hasMultipleEmployees === true
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            Sí
                                        </button>
                                        <button
                                            onClick={() => updateFormData({ hasMultipleEmployees: false })}
                                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${formData.hasMultipleEmployees === false
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {/* Question 2 */}
                                <div className="p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all">
                                    <p className="font-medium text-gray-900 mb-3">¿Facturas más de 1500 UT mensuales?</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => updateFormData({ highVolume: true })}
                                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${formData.highVolume === true
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            Sí
                                        </button>
                                        <button
                                            onClick={() => updateFormData({ highVolume: false })}
                                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${formData.highVolume === false
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {/* Question 3 */}
                                <div className="p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all">
                                    <p className="font-medium text-gray-900 mb-3">¿Tienes múltiples sucursales o almacenes?</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => updateFormData({ multipleLocations: true })}
                                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${formData.multipleLocations === true
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            Sí
                                        </button>
                                        <button
                                            onClick={() => updateFormData({ multipleLocations: false })}
                                            className={`flex-1 py-3 rounded-xl font-medium transition-all ${formData.multipleLocations === false
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Solution Selection */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Elige tu Solución</h2>
                                <p className="text-gray-600 mt-2">Selecciona la opción que mejor se adapte a ti</p>
                            </div>

                            <div className="grid gap-4">
                                {/* Agora */}
                                <button
                                    onClick={() => updateFormData({ solution: "agora", plan: null })}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.solution === "agora"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Store className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900">Midaz Ágora (N82)</h3>
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Disponible</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">POS todo-en-uno con impresora fiscal integrada. Ideal para comercios y tiendas.</p>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.solution === "agora" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                                            }`}>
                                            {formData.solution === "agora" && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    </div>
                                </button>

                                {/* Web */}
                                <button
                                    onClick={() => updateFormData({ solution: "web", plan: null })}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.solution === "web"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Monitor className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900">Midaz Web (PC)</h3>
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">Disponible</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">Software para tu PC con tu impresora fiscal existente (HKA/Bixolon).</p>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.solution === "web" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                                            }`}>
                                            {formData.solution === "web" && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    </div>
                                </button>

                                {/* Gestion */}
                                <button
                                    onClick={() => updateFormData({ solution: "gestion", plan: null })}
                                    className={`p-6 rounded-2xl border-2 text-left transition-all ${formData.solution === "gestion"
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Zap className="w-7 h-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900">Gestión (No Fiscal)</h3>
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Freemium</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">Control de inventario y gestión sin facturación fiscal.</p>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.solution === "gestion" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                                            }`}>
                                            {formData.solution === "gestion" && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Plan Selection */}
                    {currentStep === 4 && formData.solution && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Elige tu Plan</h2>

                                {/* Recommendation banner */}
                                <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                                    <p className="text-sm text-blue-800">
                                        <strong>Recomendación:</strong> Basado en tu diagnóstico, vemos que
                                        {formData.hasMultipleEmployees && " tienes varios empleados"}
                                        {formData.highVolume && " y alto volumen de facturación"}
                                        {formData.multipleLocations && " con múltiples ubicaciones"}.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {plansByProduct[formData.solution].map((plan) => (
                                    <button
                                        key={plan.id}
                                        onClick={() => updateFormData({ plan: plan.id })}
                                        className={`p-6 rounded-2xl border-2 text-left transition-all relative ${formData.plan === plan.id
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:border-blue-300"
                                            }`}
                                    >
                                        {plan.recommended && (
                                            <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full">
                                                ⭐ Recomendado
                                            </div>
                                        )}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
                                                <p className="text-gray-600 text-sm mb-3">{plan.description}</p>
                                                <ul className="space-y-1">
                                                    {plan.features.map((feature, i) => (
                                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Check className="w-4 h-4 text-green-500" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-black text-gray-900">{plan.price}</div>
                                                <div className="text-sm text-gray-500">{plan.period}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Activation */}
                    {currentStep === 5 && (
                        <div className="space-y-6 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <Check className="w-10 h-10 text-white" />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900">¡Registro Exitoso!</h2>

                            <div className="bg-gray-50 rounded-2xl p-6 text-left">
                                <h3 className="font-bold text-gray-900 mb-4">Resumen de tu registro:</h3>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Negocio:</strong> {formData.businessName}</p>
                                    <p><strong>RIF:</strong> {formData.rif}</p>
                                    <p><strong>Solución:</strong> {formData.solution === "agora" ? "Midaz Ágora (N82)" : formData.solution === "web" ? "Midaz Web" : "Gestión"}</p>
                                    <p><strong>Plan:</strong> {formData.plan}</p>
                                </div>
                            </div>

                            {formData.solution === "agora" ? (
                                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                                    <p className="text-blue-800">
                                        <strong>🚀 Próximos pasos:</strong> Nuestro equipo está preparando tu dispositivo N82 con tu RIF.
                                        Te contactaremos en las próximas 24 horas para coordinar la entrega.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                                    <p className="text-green-800">
                                        <strong>✅ ¡Licencia Activada!</strong> Revisa tu correo electrónico para acceder a tu cuenta
                                        y comenzar a usar Midaz.
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={resetOnboarding}
                                className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                                Cerrar
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer with navigation */}
                {currentStep < 5 && (
                    <div className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-100">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${currentStep === 1
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Atrás
                        </button>

                        <button
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${canProceed()
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {currentStep === 4 ? "Finalizar" : "Continuar"}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
