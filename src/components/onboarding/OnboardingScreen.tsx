"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowLeft, Check, Smartphone, Monitor, HelpCircle, Shield, Clock, Headphones } from "lucide-react"

// ─── ASSETS ─────────────────────────────────────────
// @ts-ignore
import logoWhite from "../../assets/images/midaz_Mesa de trabajo 1.svg?url"

// ─── TYPES ──────────────────────────────────────────
interface FormData {
    businessName: string
    rif: string
    email: string
    phone: string
    sector: string | null
    employeeCount: string | null
    monthlyVolume: string | null
    solution: "agora" | "web" | "asesor" | null
    plan: string | null
}

const initial: FormData = {
    businessName: "", rif: "", email: "", phone: "",
    sector: null, employeeCount: null, monthlyVolume: null,
    solution: null, plan: null,
}

// ─── PLAN DATA ───────────────────────────────────────
const plansByProduct = {
    agora: [
        {
            id: "emprendedor", name: "Emprendedor", price: "$49", period: "/mes",
            description: "Para un local, una caja",
            features: [
                "Terminal fiscal incluido",
                "App Android + backoffice web",
                "Impresora fiscal integrada",
                "Inventario hasta 500 SKU",
                "1 cajero, 1 sede",
                "Soporte técnico 24/7",
            ],
            recommended: false,
        },
        {
            id: "empresarial", name: "Empresarial", price: "$99", period: "/mes",
            description: "Multi-caja, multi-sede",
            features: [
                "Todo en Emprendedor",
                "Hasta 5 cajeros",
                "Inventario ilimitado",
                "Multi-sede con dashboard unificado",
                "Conciliación bancaria automática",
                "Auditoría fiscal completa",
                "Reportes Z y gerenciales",
                "Soporte técnico 24/7",
            ],
            recommended: true,
        },
    ],
    web: [
        {
            id: "mensual", name: "Mensual", price: "$29", period: "/mes",
            description: "Pago flexible, sin compromiso",
            features: [
                "Sistema web desde cualquier PC/tablet",
                "Conexión a impresoras fiscales",
                "Inventario básico y usuarios",
                "Auditoría fiscal incluida",
                "Tasa BCV automática",
                "Soporte técnico 24/7",
            ],
            recommended: false,
        },
        {
            id: "anual", name: "Anual", price: "$290", period: "/año",
            description: "Ahorra el equivalente a 2 meses",
            features: [
                "Todo en Mensual",
                "Multi-usuario y multi-sede",
                "94 permisos granulares por usuario",
                "Notas de crédito fiscales",
                "Reportes avanzados exportables",
                "Ahorro de $58 vs. mensual",
                "Soporte técnico 24/7",
            ],
            recommended: true,
        },
    ],
}

// ─── BRAND TOKENS ────────────────────────────────────
const C = {
    navy: "#07143a",
    navyCard: "#0d1f4a",
    blue: "#004be0",
    blueGlow: "rgba(0,75,224,0.12)",
    blueBorder: "rgba(0,75,224,0.2)",
    blueLight: "#a9ccff",
    gold: "#f49a40",
    goldBg: "rgba(244,154,64,0.12)",
    white: "#ffffff",
}

// ─── GLOBAL STYLES ───────────────────────────────────
const globalStyles = `
    @keyframes obIn {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes obOut {
        from { opacity: 1; transform: translateY(0); }
        to   { opacity: 0; transform: translateY(-16px); }
    }
    @keyframes pulse-ring {
        0%   { transform: scale(0.85); opacity: 0.6; }
        50%  { transform: scale(1.15); opacity: 0.3; }
        100% { transform: scale(0.85); opacity: 0.6; }
    }
    .ob-enter { animation: obIn  0.4s ease-out both; }
    .ob-exit  { animation: obOut 0.22s ease-in  both; }
    .s1 { animation-delay: 0.07s; }
    .s2 { animation-delay: 0.14s; }
    .s3 { animation-delay: 0.21s; }

    .ob-card {
        position: relative;
        background: ${C.navyCard};
        border: 1px solid ${C.blueBorder};
        border-radius: 12px;
        cursor: pointer;
        transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        text-align: left;
        width: 100%;
    }
    .ob-card:hover {
        border-color: rgba(0,75,224,0.55);
        box-shadow: 0 0 24px ${C.blueGlow};
        transform: translateY(-2px);
    }
    .ob-card.selected {
        border-color: ${C.blue};
        background: rgba(0,75,224,0.08);
        box-shadow: 0 0 32px ${C.blueGlow};
    }
    .ob-input {
        width: 100%;
        background: ${C.navyCard};
        border: 1px solid ${C.blueBorder};
        border-radius: 8px;
        padding: 14px 18px;
        color: ${C.white};
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .ob-input::placeholder { color: rgba(169,204,255,0.35); }
    .ob-input:focus {
        border-color: ${C.blue};
        box-shadow: 0 0 0 3px rgba(0,75,224,0.15);
    }
    .ob-label {
        display: block;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: ${C.blueLight};
        margin-bottom: 8px;
        letter-spacing: 0.02em;
    }
`

// ─── MODULE-LEVEL COMPONENTS (no recrea en cada render) ──
// IMPORTANTE: definido FUERA del componente principal para que React
// no destruya/recree los inputs al escribir.

function Wrap({ children, exiting }: { children: React.ReactNode; exiting: boolean }) {
    return (
        <div
            className={exiting ? "ob-exit" : "ob-enter"}
            style={{
                minHeight: "calc(100vh - 72px)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                padding: "48px 24px",
            }}
        >
            {children}
        </div>
    )
}

function CheckMark() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f49a40" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

function BackBtn({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "none", border: "none", cursor: "pointer",
                color: C.blueLight, fontFamily: "'Inter', sans-serif", fontSize: 14, padding: "8px 0",
                transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = C.white)}
            onMouseLeave={e => (e.currentTarget.style.color = C.blueLight)}
        >
            <ArrowLeft size={16} /> Atrás
        </button>
    )
}

function NextBtn({ onClick, disabled, children }: {
    onClick: () => void; disabled?: boolean; children: React.ReactNode
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: disabled ? "rgba(0,75,224,0.2)" : C.blue,
                color: disabled ? "rgba(169,204,255,0.5)" : C.white,
                border: "none", borderRadius: 8,
                cursor: disabled ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15,
                padding: "13px 28px", transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "#0040c0" }}
            onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = disabled ? "rgba(0,75,224,0.2)" : C.blue }}
        >
            {children}
        </button>
    )
}

function EyebrowStep({ n }: { n: number }) {
    return (
        <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12,
            color: C.gold, letterSpacing: "0.15em", textTransform: "uppercase" as const,
            display: "block", marginBottom: 12,
        }}>
            {n < 6 ? `Paso ${n} de 5` : "Último paso"}
        </span>
    )
}

function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h2 style={{
            fontFamily: "'Funnel Display', sans-serif", fontWeight: 700,
            fontSize: "clamp(26px, 4vw, 36px)", color: C.white,
            lineHeight: 1.15, marginBottom: 10,
        }}>{children}</h2>
    )
}

function Sub({ children }: { children: React.ReactNode }) {
    return (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.blueLight, lineHeight: 1.6 }}>
            {children}
        </p>
    )
}

// ─── MAIN COMPONENT ──────────────────────────────────
export default function OnboardingScreen() {
    const [step, setStep] = useState(0)
    const [form, setForm] = useState<FormData>(initial)
    const [exiting, setEx] = useState(false)

    useEffect(() => {
        try {
            const saved = localStorage.getItem("midaz-ob-v6")
            if (saved) {
                const p = JSON.parse(saved)
                setForm(p.form || initial)
                setStep(p.step || 0)
            }
        } catch { }
    }, [])

    useEffect(() => {
        localStorage.setItem("midaz-ob-v6", JSON.stringify({ form, step }))
    }, [form, step])

    const go = (n: number) => {
        setEx(true)
        setTimeout(() => { setStep(n); setEx(false) }, 220)
    }
    const next = () => go(step + 1)
    const prev = () => go(step - 1)
    const set = (u: Partial<FormData>) => setForm(f => ({ ...f, ...u }))

    const canNext = () => {
        if (step === 1) return form.businessName.length >= 2 && !!form.email && !!form.phone
        if (step === 2) return !!form.sector
        if (step === 3) return !!form.employeeCount
        if (step === 4) return !!form.monthlyVolume
        if (step === 5) return !!form.solution
        if (step === 6) return form.solution !== "asesor" ? !!form.plan : true
        return true
    }

    const finish = () => {
        localStorage.removeItem("midaz-ob-v6")
        window.location.href = "/"
    }

    const showProgress = step > 0 && step < 7

    return (
        <>
            <style>{globalStyles}</style>
            <div style={{ minHeight: "100vh", background: C.navy, position: "relative" }}>

                {/* Pattern */}
                <div style={{
                    position: "fixed", inset: 0, pointerEvents: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 20V40L30 55L5 40V20L30 5Z' fill='%23004be0' fill-opacity='0.03'/%3E%3C/svg%3E")`,
                    backgroundSize: "60px 60px",
                }} />

                {/* ── HEADER ─────────────────────────────── */}
                <header style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                    background: "rgba(7,20,58,0.92)", backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(0,75,224,0.15)",
                }}>
                    <div style={{
                        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
                        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                            <img src={logoWhite} alt="Midaz" style={{ height: 32, width: "auto" }} />
                        </a>

                        {showProgress && (
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                {Array.from({ length: 6 }, (_, i) => {
                                    const done = (i + 1) < step
                                    const curr = (i + 1) === step
                                    return (
                                        <div key={i} style={{
                                            height: 6, borderRadius: 3,
                                            width: done || curr ? 24 : 6,
                                            background: done || curr ? C.gold : "rgba(169,204,255,0.2)",
                                            transition: "all 0.4s ease",
                                        }} />
                                    )
                                })}
                            </div>
                        )}

                        <a href="/" style={{
                            fontFamily: "'Inter', sans-serif", fontSize: 14,
                            color: "rgba(169,204,255,0.5)", textDecoration: "none", transition: "color 0.2s",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = C.blueLight)}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(169,204,255,0.5)")}
                        >Salir</a>
                    </div>
                </header>

                <main style={{ paddingTop: 64 }}>

                    {/* ── STEP 0: BIENVENIDA ─────────────── */}
                    {step === 0 && (
                        <Wrap exiting={exiting}>
                            <div style={{ textAlign: "center", maxWidth: 600 }}>
                                <div className="ob-enter" style={{ marginBottom: 32 }}>
                                    <a href="/" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                        <img src={logoWhite} alt="Midaz" style={{ height: 56, width: "auto" }} />
                                    </a>
                                </div>

                                <h1 className="ob-enter s1" style={{
                                    fontFamily: "'Funnel Display', sans-serif", fontWeight: 700,
                                    fontSize: "clamp(32px, 5vw, 52px)", color: C.white,
                                    lineHeight: 1.1, marginBottom: 16,
                                }}>
                                    Sin errores fiscales.<br />
                                    <span style={{ color: C.gold }}>Así es Midaz.</span>
                                </h1>

                                <p className="ob-enter s2" style={{
                                    fontFamily: "'Inter', sans-serif", fontSize: 18,
                                    color: C.blueLight, lineHeight: 1.6,
                                    marginBottom: 40, maxWidth: 480, margin: "0 auto 40px",
                                }}>
                                    Solicita acceso anticipado. Cuéntanos sobre tu negocio y el equipo de Midaz te contacta en menos de 24 horas.
                                </p>

                                {/* Badges */}


                                <div className="ob-enter s3">
                                    <button
                                        onClick={next}
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: 10,
                                            background: C.blue, color: C.white,
                                            border: "none", borderRadius: 8, cursor: "pointer",
                                            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16,
                                            padding: "16px 36px", transition: "background 0.2s, transform 0.2s",
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "#0040c0"; e.currentTarget.style.transform = "translateY(-2px)" }}
                                        onMouseLeave={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.transform = "translateY(0)" }}
                                    >
                                        Solicitar acceso anticipado
                                        <ArrowRight size={18} />
                                    </button>
                                    <p style={{
                                        fontFamily: "'Inter', sans-serif", fontSize: 13,
                                        color: "rgba(169,204,255,0.45)", marginTop: 16,
                                    }}>
                                        5 pasos · Sin compromiso · Sin costos ocultos
                                    </p>
                                </div>
                            </div>
                        </Wrap>
                    )}

                    {/* ── STEP 1: DATOS DEL NEGOCIO ──────── */}
                    {step === 1 && (
                        <Wrap exiting={exiting}>
                            <div style={{ width: "100%", maxWidth: 480 }}>
                                <div className="ob-enter" style={{ marginBottom: 32 }}>
                                    <EyebrowStep n={1} />
                                    <Heading>Datos de tu negocio</Heading>
                                    <Sub>Con esta información, el equipo de Midaz preparará el acceso ajustado a tu operación.</Sub>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    <div>
                                        <label className="ob-label">Nombre del negocio *</label>
                                        <input
                                            className="ob-input"
                                            type="text"
                                            placeholder="Mi Negocio C.A."
                                            value={form.businessName}
                                            onChange={e => {
                                                const v = e.target.value
                                                set({ businessName: v.charAt(0).toUpperCase() + v.slice(1) })
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="ob-label">Correo electrónico *</label>
                                        <input
                                            className="ob-input"
                                            type="email"
                                            placeholder="correo@empresa.com"
                                            value={form.email}
                                            onChange={e => set({ email: e.target.value.replace(/\s/g, "") })}
                                        />
                                    </div>

                                    <div>
                                        <label className="ob-label">WhatsApp / Teléfono *</label>
                                        <input
                                            className="ob-input"
                                            type="tel"
                                            placeholder="+58 412 000 0000"
                                            value={form.phone}
                                            onChange={e => set({ phone: e.target.value })}
                                        />
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(169,204,255,0.45)", marginTop: 6 }}>
                                            El equipo te contactará por aquí para coordinar el acceso.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="ob-label">RIF <span style={{ color: "rgba(169,204,255,0.35)" }}>(opcional)</span></label>
                                        <input
                                            className="ob-input"
                                            type="text"
                                            placeholder="J-12345678-9"
                                            maxLength={13}
                                            value={form.rif}
                                            onChange={e => {
                                                let v = e.target.value.toUpperCase().replace(/[^JVEG0-9-]/g, "")
                                                const clean = v.replace(/[^JVEG0-9]/g, "")
                                                if (clean.length > 0) {
                                                    const letter = clean[0]
                                                    const nums = clean.slice(1)
                                                    const main = nums.slice(0, 8)
                                                    const last = nums.slice(8, 9)
                                                    v = `${letter}${main ? "-" + main : ""}${last ? "-" + last : ""}`
                                                }
                                                set({ rif: v })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36 }}>
                                    <BackBtn onClick={prev} />
                                    <NextBtn onClick={next} disabled={!canNext()}>
                                        Siguiente <ArrowRight size={16} />
                                    </NextBtn>
                                </div>
                            </div>
                        </Wrap>
                    )}

                    {/* ── STEP 2: SECTOR ─────────────────── */}
                    {step === 2 && (
                        <Wrap exiting={exiting}>
                            <div style={{ width: "100%", maxWidth: 600 }}>
                                <div className="ob-enter" style={{ marginBottom: 32 }}>
                                    <EyebrowStep n={2} />
                                    <Heading>¿En qué sector opera tu negocio?</Heading>
                                    <Sub>Cada sector tiene requerimientos fiscales distintos. Esto nos permite prepararte la solución correcta.</Sub>
                                </div>

                                <div className="ob-enter s1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    {[
                                        { v: "tienda", label: "Tienda / Abasto", icon: "🛒" },
                                        { v: "restaurante", label: "Restaurante / Cafetería", icon: "☕" },
                                        { v: "panaderia", label: "Panadería / Frutería", icon: "🥖" },
                                        { v: "farmacia", label: "Farmacia / Ferretería", icon: "💊" },
                                        { v: "multisede", label: "Multi-sede / Franquicia", icon: "🏬" },
                                        { v: "otro", label: "Otro tipo de negocio", icon: "📦" },
                                    ].map(opt => (
                                        <button
                                            key={opt.v}
                                            className={`ob-card ${form.sector === opt.v ? "selected" : ""}`}
                                            onClick={() => { set({ sector: opt.v }); setTimeout(next, 360) }}
                                            style={{ padding: "20px 24px" }}
                                        >
                                            <span style={{ fontSize: 28, display: "block", marginBottom: 10 }}>{opt.icon}</span>
                                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: C.white }}>
                                                {opt.label}
                                            </span>
                                            {form.sector === opt.v && (
                                                <div style={{
                                                    position: "absolute", top: 10, right: 10,
                                                    width: 22, height: 22, borderRadius: "50%", background: C.blue,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                }}>
                                                    <Check size={13} color={C.white} strokeWidth={3} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="ob-enter s2" style={{ marginTop: 28 }}>
                                    <BackBtn onClick={prev} />
                                </div>
                            </div>
                        </Wrap>
                    )}

                    {/* ── STEP 3: EQUIPO ─────────────────── */}
                    {step === 3 && (
                        <Wrap exiting={exiting}>
                            <div style={{ width: "100%", maxWidth: 540 }}>
                                <div className="ob-enter" style={{ marginBottom: 32 }}>
                                    <EyebrowStep n={3} />
                                    <Heading>¿Cuántas personas usan el sistema?</Heading>
                                    <Sub>Esto determina cuántos usuarios y cajas necesitas activar.</Sub>
                                </div>

                                <div className="ob-enter s1" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {[
                                        { v: "solo", label: "Solo yo (dueño/cajero único)", sub: "1 usuario · 1 caja" },
                                        { v: "small", label: "2 a 5 personas", sub: "Equipo pequeño · hasta 2 sedes" },
                                        { v: "medium", label: "6 a 20 personas", sub: "Equipo mediano · multi-sede" },
                                        { v: "large", label: "Más de 20 personas", sub: "Empresa con múltiples sucursales" },
                                    ].map(opt => (
                                        <button
                                            key={opt.v}
                                            className={`ob-card ${form.employeeCount === opt.v ? "selected" : ""}`}
                                            onClick={() => { set({ employeeCount: opt.v }); setTimeout(next, 360) }}
                                            style={{ padding: "18px 24px" }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div>
                                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: C.white, marginBottom: 4 }}>{opt.label}</p>
                                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight }}>{opt.sub}</p>
                                                </div>
                                                {form.employeeCount === opt.v && (
                                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.blue, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <Check size={14} color={C.white} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="ob-enter s2" style={{ marginTop: 28 }}>
                                    <BackBtn onClick={prev} />
                                </div>
                            </div>
                        </Wrap>
                    )}

                    {/* ── STEP 4: VOLUMEN ────────────────── */}
                    {step === 4 && (
                        <Wrap exiting={exiting}>
                            <div style={{ width: "100%", maxWidth: 540 }}>
                                <div className="ob-enter" style={{ marginBottom: 32 }}>
                                    <EyebrowStep n={4} />
                                    <Heading>¿Cuánto factura tu negocio al mes?</Heading>
                                    <Sub>Usa un estimado en dólares. Nos ayuda a ajustar el plan correcto para tu operación.</Sub>
                                </div>

                                <div className="ob-enter s1" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {[
                                        { v: "low", label: "Hasta $5,000", sub: "Negocio en crecimiento o nuevo" },
                                        { v: "medium", label: "$5,000 — $20,000", sub: "Comercio establecido" },
                                        { v: "high", label: "$20,000 — $100,000", sub: "Negocio consolidado" },
                                        { v: "enterprise", label: "Más de $100,000", sub: "Alto volumen o multi-sede" },
                                    ].map(opt => (
                                        <button
                                            key={opt.v}
                                            className={`ob-card ${form.monthlyVolume === opt.v ? "selected" : ""}`}
                                            onClick={() => { set({ monthlyVolume: opt.v }); setTimeout(next, 360) }}
                                            style={{ padding: "18px 24px" }}
                                        >
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div>
                                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: C.white, marginBottom: 4 }}>{opt.label}</p>
                                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight }}>{opt.sub}</p>
                                                </div>
                                                {form.monthlyVolume === opt.v && (
                                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.blue, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <Check size={14} color={C.white} strokeWidth={3} />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="ob-enter s2" style={{ marginTop: 28 }}>
                                    <BackBtn onClick={prev} />
                                </div>
                            </div>
                        </Wrap>
                    )}

                    {/* ── STEP 5: SOLUCIÓN ───────────────── */}
                    {step === 5 && (
                        <Wrap exiting={exiting}>
                            <div style={{ width: "100%", maxWidth: 900 }}>
                                <div className="ob-enter" style={{ marginBottom: 32, textAlign: "center" }}>
                                    <EyebrowStep n={5} />
                                    <Heading>¿Cuál es tu setup actual?</Heading>
                                    <Sub>Elige el sistema que mejor se adapta a tu operación.</Sub>
                                </div>

                                <div className="ob-enter s1" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                                    {/* Agora */}
                                    <button
                                        className={`ob-card ${form.solution === "agora" ? "selected" : ""}`}
                                        onClick={() => { set({ solution: "agora", plan: null }); setTimeout(next, 380) }}
                                        style={{ padding: 28 }}
                                    >
                                        <div style={{ display: "inline-block", background: C.goldBg, border: "1px solid rgba(244,154,64,0.3)", borderRadius: 20, padding: "3px 12px", fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.gold, marginBottom: 16 }}>Hardware incluido</div>
                                        <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(0,75,224,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                                            <Smartphone size={24} color={C.blueLight} />
                                        </div>
                                        <h3 style={{ fontFamily: "'Funnel Display', sans-serif", fontWeight: 700, fontSize: 20, color: C.white, marginBottom: 8 }}>Midaz Agora</h3>
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight, lineHeight: 1.5, marginBottom: 20 }}>
                                            Terminal fiscal + App Android + Backoffice web. Opera offline. Impresora fiscal integrada.
                                        </p>
                                        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                                            {["Todo-en-uno con hardware incluido", "Multi-sede con dashboard unificado", "Factura y cobra sin internet"].map(f => (
                                                <li key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                                    <CheckMark />
                                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight, lineHeight: 1.4 }}>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {form.solution === "agora" && (
                                            <div style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Check size={14} color={C.white} strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>

                                    {/* Web */}
                                    <button
                                        className={`ob-card ${form.solution === "web" ? "selected" : ""}`}
                                        onClick={() => { set({ solution: "web", plan: null }); setTimeout(next, 380) }}
                                        style={{ padding: 28 }}
                                    >
                                        <div style={{ display: "inline-block", background: "rgba(0,75,224,0.12)", border: "1px solid rgba(0,75,224,0.3)", borderRadius: 20, padding: "3px 12px", fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.blueLight, marginBottom: 16 }}>PC / Tablet</div>
                                        <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(0,75,224,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                                            <Monitor size={24} color={C.blueLight} />
                                        </div>
                                        <h3 style={{ fontFamily: "'Funnel Display', sans-serif", fontWeight: 700, fontSize: 20, color: C.white, marginBottom: 8 }}>Midaz Web</h3>
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight, lineHeight: 1.5, marginBottom: 20 }}>
                                            Sistema web desde el navegador. Conecta impresoras fiscales. Sin instalar nada.
                                        </p>
                                        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                                            {["Ya tienes computadoras o tablets", "Impresora fiscal propia", "Multi-usuario con 94 permisos"].map(f => (
                                                <li key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                                    <CheckMark />
                                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight, lineHeight: 1.4 }}>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {form.solution === "web" && (
                                            <div style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Check size={14} color={C.white} strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>

                                    {/* Asesor */}
                                    <button
                                        className={`ob-card ${form.solution === "asesor" ? "selected" : ""}`}
                                        onClick={() => { set({ solution: "asesor", plan: null }); setTimeout(next, 380) }}
                                        style={{ padding: 28 }}
                                    >
                                        <div style={{ display: "inline-block", background: C.goldBg, border: "1px solid rgba(244,154,64,0.3)", borderRadius: 20, padding: "3px 12px", fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.gold, marginBottom: 16 }}>Sin costo</div>
                                        <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(0,75,224,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                                            <HelpCircle size={24} color={C.blueLight} />
                                        </div>
                                        <h3 style={{ fontFamily: "'Funnel Display', sans-serif", fontWeight: 700, fontSize: 20, color: C.white, marginBottom: 8 }}>No sé cuál elegir</h3>
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight, lineHeight: 1.5, marginBottom: 20 }}>
                                            Cuéntanos tu caso y el equipo de Midaz te recomienda la solución correcta sin compromiso.
                                        </p>
                                        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                                            {["Asesoría personalizada gratis", "Demo presencial o virtual", "Respuesta en menos de 24h"].map(f => (
                                                <li key={f} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                                    <CheckMark />
                                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight, lineHeight: 1.4 }}>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {form.solution === "asesor" && (
                                            <div style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Check size={14} color={C.white} strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                </div>

                                <div className="ob-enter s2" style={{ marginTop: 28 }}>
                                    <BackBtn onClick={prev} />
                                </div>
                            </div>
                        </Wrap>
                    )}

                    {/* ── STEP 6: PLAN ───────────────────── */}
                    {step === 6 && form.solution && form.solution !== "asesor" && (
                        <Wrap exiting={exiting}>
                            <div style={{ width: "100%", maxWidth: 720 }}>
                                <div className="ob-enter" style={{ marginBottom: 32, textAlign: "center" }}>
                                    <EyebrowStep n={6} />
                                    <Heading>Elige el motor de tu crecimiento</Heading>
                                    <Sub>Sin compromisos — cambia o cancela cuando quieras.</Sub>
                                </div>

                                <div className="ob-enter s1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                                    {plansByProduct[form.solution as "agora" | "web"].map(plan => (
                                        <button
                                            key={plan.id}
                                            className={`ob-card ${form.plan === plan.id ? "selected" : ""}`}
                                            onClick={() => { set({ plan: plan.id }); setTimeout(next, 380) }}
                                            style={{ padding: "28px 28px 24px" }}
                                        >
                                            {plan.recommended && (
                                                <div style={{ position: "absolute", top: -12, left: 24, background: C.gold, color: C.white, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "4px 14px" }}>
                                                    Recomendado
                                                </div>
                                            )}
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                                                <div>
                                                    <h3 style={{ fontFamily: "'Funnel Display', sans-serif", fontWeight: 700, fontSize: 22, color: C.white, marginBottom: 4 }}>{plan.name}</h3>
                                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight }}>{plan.description}</p>
                                                </div>
                                                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                                                    <div style={{ fontFamily: "'Funnel Display', sans-serif", fontWeight: 700, fontSize: 28, color: C.white }}>{plan.price}</div>
                                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight }}>{plan.period}</div>
                                                </div>
                                            </div>
                                            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                                                {plan.features.map(f => (
                                                    <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                                        <CheckMark />
                                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.blueLight, lineHeight: 1.4 }}>{f}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {form.plan === plan.id && (
                                                <div style={{ position: "absolute", bottom: 16, right: 16, width: 26, height: 26, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Check size={15} color={C.white} strokeWidth={3} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="ob-enter s2" style={{ marginTop: 28 }}>
                                    <BackBtn onClick={prev} />
                                </div>
                            </div>
                        </Wrap>
                    )}

                    {/* ── STEP 6: ASESOR ─────────────────── */}
                    {step === 6 && form.solution === "asesor" && (
                        <Wrap exiting={exiting}>
                            <div style={{ width: "100%", maxWidth: 520, textAlign: "center" }}>
                                <div className="ob-enter">
                                    <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px", background: C.navyCard, border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                        <Headphones size={36} color={C.gold} />
                                        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${C.gold}`, animation: "pulse-ring 2.5s ease-in-out infinite", opacity: 0.35 }} />
                                    </div>
                                    <h2 style={{ fontFamily: "'Funnel Display', sans-serif", fontWeight: 700, fontSize: "clamp(26px, 4vw, 40px)", color: C.white, lineHeight: 1.1, marginBottom: 12 }}>
                                        ¡Solicitud recibida!
                                    </h2>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: C.blueLight, lineHeight: 1.6, marginBottom: 28 }}>
                                        Un asesor de Midaz te contactará al <strong style={{ color: C.white }}>{form.phone || "número que indicaste"}</strong> para recomendarte la solución correcta.
                                    </p>
                                </div>

                                <div className="ob-enter s1" style={{ background: C.navyCard, border: `1px solid ${C.blueBorder}`, borderRadius: 12, padding: 24, textAlign: "left", marginBottom: 24 }}>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.blueLight, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 16 }}>Qué pasa ahora</p>
                                    {["El equipo revisa tu solicitud (menos de 2h hábiles)", "Un asesor te escribe por WhatsApp para agendar", "Demo presencial o virtual según tu preferencia", "Activación del sistema en 24h una vez decidido"].map((s, i) => (
                                        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 3 ? 14 : 0 }}>
                                            <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: C.white }}>{i + 1}</div>
                                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.blueLight, lineHeight: 1.5 }}>{s}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="ob-enter s2">
                                    <button onClick={finish} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: C.blue, color: C.white, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, padding: "14px 32px", transition: "background 0.2s, transform 0.2s" }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "#0040c0"; e.currentTarget.style.transform = "translateY(-2px)" }}
                                        onMouseLeave={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.transform = "translateY(0)" }}>
                                        Volver al inicio <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </Wrap>
                    )}

                    {/* ── STEP 7: ÉXITO ──────────────────── */}
                    {step === 7 && (
                        <Wrap exiting={exiting}>
                            <div style={{ width: "100%", maxWidth: 560, textAlign: "center" }}>
                                <div className="ob-enter">
                                    <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                        <Check size={40} color={C.white} strokeWidth={2.5} />
                                        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: C.blue, animation: "pulse-ring 2.5s ease-in-out infinite", opacity: 0.35 }} />
                                    </div>
                                    <h2 style={{ fontFamily: "'Funnel Display', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: C.white, lineHeight: 1.1, marginBottom: 12 }}>
                                        ¡Acceso anticipado solicitado!
                                    </h2>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: C.blueLight, lineHeight: 1.6, marginBottom: 28 }}>
                                        El equipo de Midaz te contactará al <strong style={{ color: C.white }}>{form.phone || "número indicado"}</strong> para confirmar los detalles y coordinar la activación.
                                    </p>
                                </div>

                                <div className="ob-enter s1" style={{ background: C.navyCard, border: `1px solid ${C.blueBorder}`, borderRadius: 12, padding: "20px 24px", textAlign: "left", marginBottom: 20 }}>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.blueLight, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 14 }}>Resumen de tu solicitud</p>
                                    {[
                                        { label: "Negocio", value: form.businessName || "—" },
                                        { label: "Contacto", value: form.email || "—" },
                                        { label: "Sistema", value: form.solution === "agora" ? "Midaz Agora" : "Midaz Web" },
                                        { label: "Plan", value: form.plan ? form.plan.charAt(0).toUpperCase() + form.plan.slice(1) : "—" },
                                    ].map((r, i, arr) => (
                                        <div key={r.label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, marginBottom: 10, borderBottom: i < arr.length - 1 ? "1px solid rgba(0,75,224,0.1)" : "none" }}>
                                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.blueLight }}>{r.label}</span>
                                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: C.white }}>{r.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="ob-enter s2" style={{ background: "rgba(244,154,64,0.08)", border: "1px solid rgba(244,154,64,0.25)", borderRadius: 12, padding: "16px 20px", textAlign: "left", marginBottom: 28 }}>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.gold, fontWeight: 600, marginBottom: 4 }}>¿Qué sigue?</p>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.blueLight, lineHeight: 1.5 }}>
                                        Recibirás confirmación por correo y nuestro equipo te escribirá por WhatsApp en menos de 24 horas para coordinar la activación de tu sistema Midaz.
                                    </p>
                                </div>

                                <div className="ob-enter s3">
                                    <button onClick={finish} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: C.blue, color: C.white, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, padding: "14px 32px", transition: "background 0.2s, transform 0.2s" }}
                                        onMouseEnter={e => { e.currentTarget.style.background = "#0040c0"; e.currentTarget.style.transform = "translateY(-2px)" }}
                                        onMouseLeave={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.transform = "translateY(0)" }}>
                                        Volver al inicio <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </Wrap>
                    )}

                </main>
            </div>
        </>
    )
}
