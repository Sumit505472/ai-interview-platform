import { Sparkles } from "lucide-react";
export function PlaceholderPage({ eyebrow, title, description }) {
  return (
    <div className="pt-[90px]">
      <span className="inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.04em] text-muted uppercase">
        <Sparkles size={14} /> {eyebrow}
      </span>
      <h1 className="my-[15px] font-display text-[40px] tracking-[-0.06em]">{title}</h1>
      <p className="text-[15px] text-muted">{description}</p>
    </div>
  );
}
