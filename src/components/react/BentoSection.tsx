import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Pointer } from "@/components/ui/pointer";
import { cn } from "@/lib/utils";

/* ── Icons ─────────────────────────────────────── */
function WifiOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
      <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
      <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  );
}
function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

/* ── MidazLogo ──────────────────────────────────── */
function MidazLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 186.22 180.96" fill="none">
      <path fill="#ffb05a" d="M138.74,80.71l-31.86,31.86v40.35l-8.73,8.73v-54.49l28.53-28.53v-45.06L93.1,0l-33.57,33.57v45.06l28.53,28.53v54.48l-8.72-8.72v-40.35l-31.86-31.86H0v47.48l31.86,31.86h40.34l10.32,10.32,10.59,10.59,5.03-5.04,5.55-5.55,10.32-10.32h40.34l31.86-31.86v-47.48h-47.48ZM98.15,19.3l18.44,18.45v36.69l-18.44,18.44V19.3ZM36.03,149.96l-25.94-25.94v-26.09s52.03,52.04,52.03,52.04h-26.08ZM69.25,142.83l-52.04-52.04h26.09s25.94,25.95,25.94,25.95v26.08ZM69.62,74.45v-36.69l18.44-18.45v73.59l-18.44-18.44ZM116.97,116.75l25.94-25.94h26.09s-52.04,52.03-52.04,52.03v-26.08ZM176.13,124.02l-25.94,25.94h-26.08l52.04-52.04v26.09Z" />
    </svg>
  );
}

/* ── BeamNode ───────────────────────────────────── */
function BeamNode({
  label,
  nodeRef,
  color = "#a9ccff",
}: {
  label: string;
  nodeRef: React.RefObject<HTMLDivElement | null>;
  color?: string;
}) {
  return (
    <div
      ref={nodeRef}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "rgba(0,75,224,0.12)",
        border: "1px solid rgba(0,75,224,0.25)",
        borderRadius: "8px",
        padding: "6px 12px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        color,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
}

/* ── IntegrationBeam (background for Integraciones card) ─── */
function IntegrationBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const zelleRef = useRef<HTMLDivElement>(null);
  const cashRef = useRef<HTMLDivElement>(null);
  const bcvRef = useRef<HTMLDivElement>(null);
  const divisasRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const printerRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "160px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 28px",
        gap: "16px",
      }}
    >
      {/* Sources */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <BeamNode label="Zelle" nodeRef={zelleRef} color="#a9ccff" />
        <BeamNode label="Efectivo $" nodeRef={cashRef} color="#a9ccff" />
        <BeamNode label="Tasa BCV" nodeRef={bcvRef} color="#a9ccff" />
        <BeamNode label="Divisas" nodeRef={divisasRef} color="#a9ccff" />
      </div>

      {/* Center — Midaz */}
      <div
        ref={centerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          padding: "12px 16px",
          background: "rgba(0,75,224,0.15)",
          border: "1px solid rgba(0,75,224,0.4)",
          borderRadius: "12px",
        }}
      >
        <MidazLogo size={32} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#a9ccff", fontWeight: 700 }}>
          Midaz
        </span>
      </div>

      {/* Destinations */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <BeamNode label="Impresora fiscal" nodeRef={printerRef} color="#f49a40" />
        <BeamNode label="Backoffice" nodeRef={cloudRef} color="#f49a40" />
      </div>

      {/* Beams — inputs */}
      <AnimatedBeam containerRef={containerRef} fromRef={zelleRef} toRef={centerRef} curvature={-20} duration={3} gradientStartColor="#a9ccff" gradientStopColor="#004be0" pathColor="rgba(169,204,255,0.15)" />
      <AnimatedBeam containerRef={containerRef} fromRef={cashRef} toRef={centerRef} curvature={-5} duration={3.5} delay={0.3} gradientStartColor="#a9ccff" gradientStopColor="#004be0" pathColor="rgba(169,204,255,0.15)" />
      <AnimatedBeam containerRef={containerRef} fromRef={bcvRef} toRef={centerRef} curvature={5} duration={4} delay={0.6} gradientStartColor="#a9ccff" gradientStopColor="#004be0" pathColor="rgba(169,204,255,0.15)" />
      <AnimatedBeam containerRef={containerRef} fromRef={divisasRef} toRef={centerRef} curvature={20} duration={3.2} delay={0.9} gradientStartColor="#a9ccff" gradientStopColor="#004be0" pathColor="rgba(169,204,255,0.15)" />

      {/* Beams — outputs */}
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={printerRef} curvature={-15} duration={3} gradientStartColor="#f49a40" gradientStopColor="#004be0" pathColor="rgba(244,154,64,0.12)" />
      <AnimatedBeam containerRef={containerRef} fromRef={centerRef} toRef={cloudRef} curvature={15} duration={3.5} delay={0.4} gradientStartColor="#f49a40" gradientStopColor="#004be0" pathColor="rgba(244,154,64,0.12)" />
    </div>
  );
}

/* ── BentoSection ───────────────────────────────── */
export default function BentoSection() {
  return (
    <BentoGrid className="lg:grid-rows-2 max-w-5xl mx-auto">
      {/* INTEGRACIONES — grande */}
      <BentoCard
        name="Integraciones"
        className="col-span-3 lg:col-span-2 dark"
        background={
          <div className="relative h-full overflow-hidden">
            <Pointer>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "#004be0",
                  boxShadow: "0 0 12px #004be0",
                }}
              />
            </Pointer>
            <IntegrationBeam />
          </div>
        }
        Icon={ZapIcon}
        description="Métodos de pago venezolanos, tasa BCV automática e impresora fiscal, todo conectado en tiempo real."
        href="/comenzar"
        cta="Ver integraciones"
      />

      {/* OFFLINE */}
      <BentoCard
        name="Offline-first"
        className="col-span-3 lg:col-span-1 dark"
        background={
          <div className="relative h-full overflow-hidden flex items-center justify-center p-6">
            <Pointer>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "#f49a40",
                  boxShadow: "0 0 12px #f49a40",
                }}
              />
            </Pointer>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: "rgba(244,154,64,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  border: "1px solid rgba(244,154,64,0.25)",
                }}
              >
                <WifiOffIcon className="h-6 w-6 text-[#f49a40]" />
              </div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#22c55e",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: "rgba(34,197,94,0.12)",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                Sync automática
              </span>
            </div>
          </div>
        }
        Icon={WifiOffIcon}
        description="Opera sin internet. La factura sale igual. Todo sube solo cuando vuelve la señal."
        href="/comenzar"
        cta="Más sobre offline"
      />

      {/* VISTA EN TIEMPO REAL */}
      <BentoCard
        name="Vista en tiempo real"
        className="col-span-3 lg:col-span-1 dark"
        background={
          <div className="relative h-full overflow-hidden flex items-center justify-center p-6">
            <Pointer>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "#004be0",
                  boxShadow: "0 0 12px #004be0",
                }}
              />
            </Pointer>
            <div style={{ width: "100%", maxWidth: "180px" }}>
              {["Sede Caracas", "Sede Maracaibo", "Sede Valencia"].map(
                (sede, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "7px 12px",
                      marginBottom: "4px",
                      background: "rgba(0,75,224,0.1)",
                      borderRadius: "8px",
                      border: "1px solid rgba(0,75,224,0.2)",
                    }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#a9ccff", fontWeight: 600 }}>
                      {sede}
                    </span>
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 6px #22c55e",
                      }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        }
        Icon={MonitorIcon}
        description="Dashboard multi-sede en vivo. Monitor POS con cada caja y transacción al instante."
        href="/comenzar"
        cta="Ver dashboard"
      />

      {/* DOCUMENTACIÓN FISCAL */}
      <BentoCard
        name="Documentación fiscal"
        className="col-span-3 lg:col-span-2 dark"
        background={
          <div className="relative h-full overflow-hidden flex items-end p-6">
            <Pointer>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow: "0 0 10px rgba(255,255,255,0.6)",
                }}
              />
            </Pointer>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                "Factura SHA-256",
                "Notas de crédito",
                "Reporte Z",
                "Auditoría SENIAT",
                "IGTF 3%",
                "IVA automático",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    background: "rgba(169,204,255,0.1)",
                    border: "1px solid rgba(169,204,255,0.2)",
                    color: "#a9ccff",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        }
        Icon={FileTextIcon}
        description="Cumplimiento fiscal completo. Facturas legales, notas de crédito, Reporte Z y auditoría SENIAT listos desde el primer día."
        href="/comenzar"
        cta="Ver documentación"
      />
    </BentoGrid>
  );
}
