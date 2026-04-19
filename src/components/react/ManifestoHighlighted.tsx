import { BlurFade } from "@/components/ui/blur-fade";
import { Highlighter } from "@/components/ui/highlighter";

export default function ManifestoHighlighted() {
  return (
    <div style={{ width: "100%" }}>
      <BlurFade delay={0.1} duration={0.7}>
        <p
          style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(26px, 3.8vw, 50px)",
            lineHeight: 1.18,
            color: "#07143a",
            margin: 0,
          }}
        >
          Midaz es la herramienta que convierte el trabajo diario de un negocio
          en una conversación{" "}
          <Highlighter
            action="underline"
            color="#f49a40"
            strokeWidth={2.5}
            animationDuration={700}
            isView
          >
            ordenada
          </Highlighter>
          ,{" "}
          <Highlighter
            action="underline"
            color="#004be0"
            strokeWidth={2.5}
            animationDuration={700}
            isView
          >
            clara
          </Highlighter>{" "}
          y{" "}
          <Highlighter
            action="underline"
            color="#f49a40"
            strokeWidth={2.5}
            animationDuration={900}
            isView
          >
            en calma
          </Highlighter>{" "}
          con el mundo.
        </p>
      </BlurFade>
    </div>
  );
}
