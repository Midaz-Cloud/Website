import { ShinyButton } from "@/components/ui/shiny-button";

interface ShinyCtaBtnProps {
  href?: string;
  children?: React.ReactNode;
}

export default function ShinyCtaBtn({ href = "/comenzar", children = "Solicitar acceso anticipado →" }: ShinyCtaBtnProps) {
  return (
    <a href={href} style={{ display: "inline-block", textDecoration: "none" }}>
      <ShinyButton
        className="px-10 py-4 text-base rounded-xl"
        style={
          {
            background: "#07143a",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.15)",
            "--primary": "#004be0",
          } as React.CSSProperties
        }
      >
        {children}
      </ShinyButton>
    </a>
  );
}
