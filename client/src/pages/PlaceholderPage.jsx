import { Sparkles } from "lucide-react";
export function PlaceholderPage({ eyebrow, title, description }) {
  return (
    <div className="placeholder-page">
      <span className="eyebrow">
        <Sparkles size={14} /> {eyebrow}
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
