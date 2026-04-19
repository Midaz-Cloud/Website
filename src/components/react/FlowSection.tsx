import { MagicCard } from "@/components/ui/magic-card";

const steps = [
  { n: "01", title: "Abre turno", desc: "PIN del cajero. Impresora verificada. Listo en segundos." },
  { n: "02", title: "Agrega productos", desc: "Por nombre, SKU o código de barras. Stock en tiempo real." },
  { n: "03", title: "Selecciona el pago", desc: "Efectivo, transferencia, punto, dólares, Zelle, Binance." },
  { n: "04", title: "IGTF automático", desc: "Si paga en divisas, el 3% se aplica sin calcular nada." },
  { n: "05", title: "Factura impresa", desc: "Comprobante legal directo de la impresora fiscal. 100% válido." },
  { n: "06", title: "Backoffice actualizado", desc: "La venta aparece al instante en el panel del dueño." },
  { n: "07", title: "Cierre de turno", desc: "Reporte Z con un toque. Cuadre enviado al backoffice." },
];

export default function FlowSection() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Row 1 — 4 cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "12px",
        }}
        className="flow-row"
      >
        {steps.slice(0, 4).map((step) => (
          <FlowCard key={step.n} step={step} />
        ))}
      </div>
      {/* Row 2 — 3 cards centradas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          maxWidth: "825px",
          margin: "0 auto",
        }}
        className="flow-row"
      >
        {steps.slice(4).map((step) => (
          <FlowCard key={step.n} step={step} />
        ))}
      </div>
    </div>
  );
}

function FlowCard({ step }: { step: (typeof steps)[0] }) {
  return (
    <MagicCard
      className="rounded-2xl"
      gradientColor="rgba(244,154,64,0.1)"
      gradientFrom="#f49a40"
      gradientTo="#004be0"
      gradientSize={220}
    >
      <div
        style={{
          background: "#0d1f4a",
          borderRadius: "15px",
          padding: "28px 24px 24px",
          height: "100%",
          minHeight: "160px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontWeight: 800,
            fontSize: "44px",
            lineHeight: 1,
            color: "#f49a40",
            opacity: 0.9,
          }}
        >
          {step.n}
        </span>
        <h4
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontWeight: 700,
            fontSize: "17px",
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {step.title}
        </h4>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: "rgba(169,204,255,0.72)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {step.desc}
        </p>
      </div>
    </MagicCard>
  );
}
