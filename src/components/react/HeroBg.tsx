import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function HeroBg() {
  return (
    <AnimatedGridPattern
      numSquares={45}
      maxOpacity={0.07}
      duration={3.5}
      repeatDelay={0.8}
      width={56}
      height={56}
      className={cn(
        "absolute inset-0 h-full w-full",
        "fill-[#004be0] stroke-[#004be0]",
        "[mask-image:radial-gradient(900px_circle_at_50%_40%,white,transparent)]",
      )}
    />
  );
}
