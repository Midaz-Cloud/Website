import { NumberTicker } from "@/components/ui/number-ticker";

const stats = [
  {
    prefix: "+",
    value: 120,
    label: "Negocios activos",
    desc: "Comercios que ya operan con Midaz en Venezuela",
  },
  {
    prefix: "+",
    value: 50000,
    label: "Facturas emitidas",
    desc: "Comprobantes fiscales legales generados por la plataforma",
  },
  {
    prefix: "+",
    value: 8,
    label: "Ciudades",
    desc: "Presencia activa en las principales ciudades del país",
  },
];

export default function StatsSection() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "2px",
        background: "rgba(169,204,255,0.06)",
        borderRadius: "20px",
        overflow: "hidden",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            background: "#07143a",
            padding: "48px 36px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(52px, 5vw, 80px)",
              lineHeight: 1,
              color: "#ffffff",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            <span style={{ color: "#f49a40" }}>{stat.prefix}</span>
            <NumberTicker
              value={stat.value}
              delay={i * 0.2}
              className="text-white"
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontWeight: 800,
                fontSize: "inherit",
                color: "inherit",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#ffffff",
              marginBottom: "8px",
            }}
          >
            {stat.label}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "rgba(169,204,255,0.7)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {stat.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
