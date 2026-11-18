import { CheckCircle2, FileUp, Sparkles } from "lucide-react";

export function RecentActivity({ resumes, analysis }) {
  const activities = resumes
    .flatMap((resume) => {
      const items = [
        {
          key: `${resume._id}-uploaded`,
          icon: FileUp,
          title: "Resume uploaded",
          detail: resume.fileName,
          date: resume.uploadedAt || resume.createdAt,
        },
      ];
      if (analysis && resume._id === analysis.resume) {
        items.push({
          key: `${resume._id}-analyzed`,
          icon: Sparkles,
          title: "Resume analyzed",
          detail: `${analysis.overallScore}/100 overall score`,
          date: analysis.updatedAt || analysis.createdAt,
        });
      }
      return items;
    })
    .sort(
      (first, second) => new Date(second.date || 0) - new Date(first.date || 0),
    )
    .slice(0, 4);

  return (
    <section className="min-w-0 rounded-[10px] border border-[#e3e8e4] bg-surface p-[18px] shadow-[0_7px_20px_rgba(23,33,38,0.035)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] text-[#6e8179] uppercase">Recent activity</span>
          <h2 className="mt-2 font-display text-xl leading-[1.2] tracking-[-0.03em]">Your preparation timeline</h2>
        </div>
      </div>
      {activities.length ? (
        <div className="mt-[17px] grid">
          {activities.map(({ key, icon: Icon, title, detail, date }) => (
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 border-b border-[#edf0ed] py-3 last:border-0" key={key}>
              <span className="flex size-[29px] items-center justify-center rounded-full bg-[#fbe5de] text-coral">
                <Icon size={16} />
              </span>
              <div className="grid min-w-0 gap-[3px]">
                <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">{title}</strong>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-muted">{detail}</span>
              </div>
              <time className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-muted">{formatActivityDate(date)}</time>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[190px] flex-col items-center justify-center gap-[14px] text-center text-muted">
          <CheckCircle2 size={20} />
          <span>No recent activity</span>
        </div>
      )}
    </section>
  );
}

function formatActivityDate(date) {
  if (!date) return "Recently";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
