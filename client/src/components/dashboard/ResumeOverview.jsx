import { ArrowUpRight, FileText, Sparkles, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export function ResumeOverview({
  resume,
  analysis,
  onAnalyze,
  analyzing = false,
  analysisError = "",
}) {
  if (!resume) {
    return (
      <section className="grid min-w-0 grid-cols-[auto_1fr] items-start gap-4 rounded-[10px] border border-[#e3e8e4] bg-surface p-[18px] shadow-[0_7px_20px_rgba(23,33,38,0.035)] sm:p-6 min-[701px]:grid-cols-[auto_1fr_auto]">
        <div className="flex size-[46px] items-center justify-center rounded-lg bg-[#f9ddd4] text-coral">
          <FileText size={22} />
        </div>
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] text-[#6e8179] uppercase">Resume workspace</span>
          <h2 className="mt-[6px] font-display text-xl leading-[1.2] tracking-[-0.03em]">No resume uploaded yet</h2>
          <p className="mt-[6px] max-w-[480px] text-[13px] leading-[1.55] text-muted">
            Upload your resume to get AI-powered feedback and start preparing
            for interviews.
          </p>
        </div>
        <Link className="col-span-full inline-flex items-center justify-center gap-2 rounded-[7px] bg-coral px-4 py-3 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#dc5c42] min-[701px]:col-auto" to="/resume">
          <Upload size={16} /> Upload resume
        </Link>
      </section>
    );
  }

  return (
    <section className="min-w-0 rounded-[10px] border border-[#e3e8e4] bg-surface p-[18px] shadow-[0_7px_20px_rgba(23,33,38,0.035)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] text-[#6e8179] uppercase">Latest resume</span>
          <h2 className="mt-2 font-display text-xl leading-[1.2] tracking-[-0.03em]">Keep your story sharp</h2>
        </div>
        <Link className="inline-flex size-[34px] items-center justify-center rounded-full border border-[#dfe7e1] text-[#628070] hover:bg-[#eaf1ec] hover:text-ink" to={`/resume/${resume._id}`}>
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="mt-6 flex min-w-0 items-center gap-3 rounded-lg border border-[#e5ebe6] bg-[#f5f8f5] p-3.5">
        <div className="flex size-[39px] shrink-0 items-center justify-center bg-[#f9ddd4] text-coral">
          <FileText size={21} />
        </div>
        <div className="min-w-0">
          <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px]">{resume.fileName}</strong>
          <span className="mt-[5px] block overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-muted">
            {formatFileSize(resume.fileSize)} · Uploaded {formatDate(resume)}
          </span>
        </div>
      </div>
      <div className="mt-[19px] flex items-end justify-between">
        <div className="grid gap-1.5">
          <span className="font-mono text-[10px] text-[#899592] uppercase">Analysis status</span>
          <strong className={`text-[13px] ${analysis ? "text-[#397055]" : "text-[#899592]"}`}>
            {analysis ? "Ready to review" : "Not analyzed yet"}
          </strong>
        </div>
        {analysis ? (
          <div className="flex items-baseline gap-1">
            <strong className="font-display text-2xl font-bold text-coral">{analysis.overallScore}</strong>
            <span className="text-[11px] text-muted">/100 score</span>
          </div>
        ) : null}
      </div>
      <div className="mt-[22px] flex flex-wrap gap-[9px] [&>*]:max-[460px]:flex-[1_1_100%]">
        <Link className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#ecebe5] px-4 py-3 text-[13px] font-bold text-ink transition hover:-translate-y-0.5 hover:bg-[#e2e1db]" to={`/resume/${resume._id}`}>
          View resume
        </Link>
        {analysis ? (
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-navy px-4 py-3 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#234954]"
            to={`/resume/${resume._id}/analysis`}
          >
            <Sparkles size={15} /> View analysis
          </Link>
        ) : (
          <button
            className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-coral px-4 py-3 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#dc5c42] disabled:cursor-wait disabled:opacity-70"
            type="button"
            onClick={onAnalyze}
            disabled={analyzing}
          >
            <Sparkles size={15} /> {analyzing ? "Analyzing…" : "Analyze resume"}
          </button>
        )}
      </div>
      {analysisError && (
        <p className="mt-3 text-xs text-[#bd5040]" role="alert">
          {analysisError}
        </p>
      )}
    </section>
  );
}

export function ResumeOverviewSkeleton() {
  return (
    <section className="grid min-h-[270px] gap-[19px] rounded-[10px] border border-[#e3e8e4] bg-surface p-[18px] shadow-[0_7px_20px_rgba(23,33,38,0.035)] sm:p-6">
      <span className="block h-[22px] w-[210px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
      <span className="block h-[68px] w-full animate-pulse rounded-[5px] bg-[#e9eeea]" />
      <span className="block h-[26px] w-[55%] animate-pulse rounded-[5px] bg-[#e9eeea]" />
      <span className="block h-10 w-[150px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
    </section>
  );
}

function formatDate(resume) {
  const date = resume.uploadedAt || resume.createdAt;
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "recently";
}

function formatFileSize(bytes) {
  if (!bytes) return "PDF";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
