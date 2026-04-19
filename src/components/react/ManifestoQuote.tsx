import { TextAnimate } from "@/components/ui/text-animate";

export default function ManifestoQuote() {
  return (
    <div style={{ maxWidth: "760px" }}>
      <TextAnimate
        as="p"
        by="word"
        animation="blurInUp"
        startOnView
        once
        duration={0.6}
        delay={0.1}
        style={{
          fontFamily: "'Funnel Display', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 52px)",
          lineHeight: 1.15,
          color: "#07143a",
          margin: 0,
        }}
      >
        {"Midaz es la herramienta que convierte el trabajo diario de un negocio en una conversación ordenada, clara y en calma con el mundo."}
      </TextAnimate>
    </div>
  );
}
