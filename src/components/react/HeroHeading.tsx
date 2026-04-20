import { BlurFade } from "@/components/ui/blur-fade";
import { LineShadowText } from "../ui/line-shadow-text";

export default function HeroHeading() {
  return (
    <BlurFade delay={0.12} duration={0.7}>
      <h1
        style={{
          fontFamily: "'Funnel Display', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(48px, 7vw, 96px)",
          lineHeight: 1.05,
          color: "#ffffff",
          marginBottom: "28px",
          letterSpacing: "-0.01em",
        }}
      >
        Tu cerebro
        <br />
        operativo y{" "}
        <LineShadowText className="italic" shadowColor="#f49a40">
          fiscal.
        </LineShadowText>
      </h1>
    </BlurFade>
  );
}
