import { Particles } from "@/components/ui/particles";

interface ParticlesBgProps {
  color?: string;
  quantity?: number;
  staticity?: number;
  size?: number;
}

export default function ParticlesBg({
  color = "#ffffff",
  quantity = 40,
  staticity = 60,
  size = 0.5,
}: ParticlesBgProps) {
  return (
    <Particles
      className="absolute inset-0 z-0 pointer-events-none"
      color={color}
      quantity={quantity}
      staticity={staticity}
      size={size}
      ease={80}
    />
  );
}
