import { Mountain } from "lucide-react";

interface Props {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
}

export function Logo({ size = "md", variant = "default" }: Props) {
  const sizes = {
    sm: { icon: 20, title: "text-base", sub: "text-[10px]" },
    md: { icon: 28, title: "text-xl", sub: "text-xs" },
    lg: { icon: 36, title: "text-2xl", sub: "text-sm" },
  }[size];

  const isLight = variant === "light";
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`grid place-items-center rounded-2xl ${
          isLight ? "bg-white/15 backdrop-blur-sm" : "bg-gradient-hero"
        } shadow-soft`}
        style={{ width: sizes.icon + 16, height: sizes.icon + 16 }}
      >
        <Mountain size={sizes.icon} className={isLight ? "text-white" : "text-primary-foreground"} strokeWidth={2.2} />
      </div>
      <div className="leading-tight">
        <div className={`font-display font-extrabold ${sizes.title} ${isLight ? "text-white" : "text-foreground"}`}>
          Circula Chapada
        </div>
        <div className={`${sizes.sub} font-semibold uppercase tracking-wider ${isLight ? "text-white/80" : "text-muted-foreground"}`}>
          Transporte Fácil
        </div>
      </div>
    </div>
  );
}
