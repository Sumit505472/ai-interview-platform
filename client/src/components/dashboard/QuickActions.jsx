import { ArrowUpRight, FileUp, MessagesSquare } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    label: "Upload Resume",
    description: "Add your latest experience to Prepwise.",
    to: "/resume",
    icon: FileUp,
  },
  {
    label: "Start HR Interview",
    description: "Open the interview area. Practice is coming soon.",
    to: "/interviews",
    icon: MessagesSquare,
  },
];

export function QuickActions() {
  return (
    <section className="min-w-0 rounded-[10px] border border-[#e3e8e4] bg-surface p-[18px] shadow-[0_7px_20px_rgba(23,33,38,0.035)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] text-[#6e8179] uppercase">Quick actions</span>
          <h2 className="mt-2 font-display text-xl leading-[1.2] tracking-[-0.03em]">Move preparation forward</h2>
        </div>
      </div>
      <div className="mt-[22px] grid gap-3 sm:grid-cols-2">
        {actions.map(({ label, description, to, icon: Icon }) => (
          <Link className="group flex min-h-[112px] items-start gap-[11px] rounded-[7px] border border-[#e4e9e5] p-3 text-[13px] text-ink transition-colors hover:border-[#cbdccf] hover:bg-[#f5f8f5]" to={to} key={label}>
            <span className="flex size-[34px] shrink-0 items-center justify-center rounded-md bg-[#eaf1ec] text-[#397055]">
              <Icon size={18} />
            </span>
            <span className="min-w-0">
              <strong className="block">{label}</strong>
              <span className="mt-1 block text-[11px] leading-[1.5] text-muted">{description}</span>
            </span>
            <ArrowUpRight className="ml-auto shrink-0 text-[#899592] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={16} />
          </Link>
        ))}
      </div>
    </section>
  );
}
