const toneClasses = {
  sage: "bg-[#e4f0e7] text-[#397055]",
  coral: "bg-[#fbe5de] text-[#c15945]",
  blue: "bg-[#e4edf2] text-[#487286]",
  slate: "bg-[#ececf0] text-[#686c7c]",
};

export function StatCard({ icon: Icon, label, value, hint, tone = "sage" }) {
  return (
    <article className="grid min-h-[158px] gap-[9px] rounded-[10px] border border-[#e3e8e4] bg-surface p-[18px] shadow-[0_7px_20px_rgba(23,33,38,0.035)] max-[460px]:min-h-[145px] max-[460px]:p-[14px]">
      <div className={`flex size-[34px] items-center justify-center rounded-[7px] ${toneClasses[tone] || toneClasses.sage}`}>
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <span className="text-xs text-muted">{label}</span>
      <strong className="break-words font-display text-[clamp(15px,2vw,25px)] leading-tight tracking-[-0.03em] text-ink">{value}</strong>
      <span className="text-[11px] text-muted">{hint}</span>
    </article>
  );
}

export function StatSkeleton() {
  return (
    <article className="grid min-h-[158px] gap-[9px] rounded-[10px] border border-[#e3e8e4] bg-surface p-[18px] shadow-[0_7px_20px_rgba(23,33,38,0.035)] max-[460px]:min-h-[145px] max-[460px]:p-[14px]">
      <span className="block h-[34px] w-[34px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
      <span className="mt-[3px] block h-3 w-[95px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
      <span className="mt-0.5 block h-[25px] w-[62px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
      <span className="block h-2.5 w-[115px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
    </article>
  );
}
