import { Code2, MessagesSquare, Wrench } from "lucide-react";

const interviewTypes = [
  {
    label: "HR interview",
    description: "Build clear, confident stories for the human side of hiring.",
    icon: MessagesSquare,
  },
  {
    label: "Technical interview",
    description: "Prepare to explain your decisions, systems, and tradeoffs.",
    icon: Wrench,
  },
  {
    label: "Coding interview",
    description: "Sharpen problem solving with focused coding practice.",
    icon: Code2,
  },
];

export function InterviewPreview() {
  return (
    <section className="rounded-[10px] border border-[#dfe9e0] bg-[#eff4ef] p-[18px] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] text-[#6e8179] uppercase">Interview preparation</span>
          <h2 className="mt-2 font-display text-xl leading-[1.2] tracking-[-0.03em]">Practice for the conversation ahead</h2>
        </div>
        <span className="rounded-full border border-[#dfe7e1] bg-surface px-2.5 py-[7px] font-mono text-[10px] text-[#648171] uppercase">Coming soon</span>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 min-[701px]:grid-cols-3">
        {interviewTypes.map(({ label, description, icon: Icon }) => (
          <article className="rounded-lg border border-[#e0e9e1] bg-surface p-[17px]" key={label}>
            <div className="flex size-9 items-center justify-center rounded-[7px] bg-[#eaf1ec] text-[#397055]">
              <Icon size={20} />
            </div>
            <h3 className="mt-[18px] font-display text-[15px]">{label}</h3>
            <p className="mt-[7px] text-xs leading-[1.55] text-muted">{description}</p>
            <span className="mt-4 block font-mono text-[10px] text-[#81978a] uppercase">Coming soon</span>
          </article>
        ))}
      </div>
    </section>
  );
}
