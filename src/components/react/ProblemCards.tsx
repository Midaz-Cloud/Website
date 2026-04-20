import { MagicCard } from "@/components/ui/magic-card";

const cards = [
  {
    num: "01",
    title: "Los errores no perdonan",
    text: "IGTF, IVA por alícuota, impresora fiscal, tasa BCV que cambia todos los días. Un error es una multa. Midaz calcula todo automáticamente y nunca se equivoca.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004be0" strokeWidth="1.5" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <polyline points="9 15 11 17 15 13" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Sin internet, sin ventas — hasta ahora",
    text: "Midaz funciona completamente offline. Las facturas se imprimen igual. Cuando vuelve la red, el sistema sincroniza todo solo. Sin que el cajero haga nada.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004be0" strokeWidth="1.5" aria-hidden="true">
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
        <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "¿Qué pasa en tu negocio ahora mismo?",
    text: "Sin un backoffice real, el dueño llama a cada sucursal para saber cómo va el día. Midaz da visión en tiempo real de todas las sedes desde una sola pantalla.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004be0" strokeWidth="1.5" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export default function ProblemCards() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
      className="problem-cards-grid"
    >
      {cards.map((card, i) => (
        <MagicCard
          key={i}
          className="rounded-2xl"
          gradientColor="rgba(0,75,224,0.12)"
          gradientFrom="#004be0"
          gradientTo="#a9ccff"
          gradientSize={260}
        >
          <div
            style={{
              background: "#f8f9ff",
              borderRadius: "15px",
              padding: "40px 32px 36px",
              position: "relative",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "16px",
                right: "20px",
                fontFamily: "'Funnel Display', sans-serif",
                fontWeight: 700,
                fontSize: "72px",
                lineHeight: 1,
                color: "rgba(0,75,224,0.06)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {card.num}
            </span>
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(0,75,224,0.07)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "28px",
              }}
            >
              {card.icon}
            </div>
            <h3
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontWeight: 700,
                fontSize: "22px",
                color: "#07143a",
                marginBottom: "14px",
                lineHeight: 1.2,
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "rgba(7,20,58,0.62)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {card.text}
            </p>
          </div>
        </MagicCard>
      ))}
    </div>
  );
}
