import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function AnalysisOverview({
  resume,
  analysis,
  onAnalyze,
  analyzing = false,
  analysisError = "",
}) {
  return (
    <section className="min-w-0 rounded-[10px] border border-[#e3e8e4] bg-surface p-[18px] shadow-[0_7px_20px_rgba(23,33,38,0.035)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] text-[#6e8179] uppercase">AI resume analysis</span>
          <h2 className="mt-2 font-display text-xl leading-[1.2] tracking-[-0.03em]">Know what your resume is saying</h2>
        </div>
        <Sparkles className="shrink-0 text-coral" size={22} />
      </div>
      {analysis ? (
        <div className="mt-[25px] flex flex-col items-start gap-6 min-[701px]:flex-row min-[701px]:items-center">
          <div
            className="relative flex size-[132px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(var(--color-coral)_calc(var(--score)*1%),#f2e4df_0)] before:absolute before:inset-[9px] before:rounded-full before:bg-surface"
            style={{ "--score": analysis.overallScore }}
          >
            <div className="relative z-[1] flex items-baseline">
              <strong className="font-display text-[31px] font-bold">{analysis.overallScore}</strong>
              <span className="text-[11px] text-muted">/100</span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] leading-[1.6] text-[#536167]">{analysis.summary}</p>
            <div className="mt-[15px] flex flex-wrap gap-x-[14px] gap-y-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#397055]">
                <CheckCircle2 size={15} /> {analysis.strengths?.length || 0}{" "}
                strengths
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted">{analysis.weaknesses?.length || 0} weaknesses</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted">{analysis.missingSkills?.length || 0} missing skills</span>
            </div>
            <Link
              className="mt-[18px] inline-flex items-center gap-[5px] text-[13px] font-bold hover:text-coral"
              to={`/resume/${resume._id}/analysis`}
            >
              View full analysis <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[190px] flex-col items-center justify-center gap-[14px] text-center text-muted">
          <div className="flex size-[42px] items-center justify-center rounded-full bg-[#fbe5de] text-coral">
            <Sparkles size={20} />
          </div>
          <p className="max-w-[260px] text-[13px] leading-[1.5]">
            {resume
              ? "Not analyzed yet. Analyze your latest resume to get personalized AI feedback."
              : "Upload a resume to get personalized AI feedback."}
          </p>
          {resume && (
            <button
              className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-coral px-4 py-3 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#dc5c42] disabled:cursor-wait disabled:opacity-70"
              type="button"
              onClick={onAnalyze}
              disabled={analyzing}
            >
              {analyzing ? "Analyzing…" : "Analyze resume"}
            </button>
          )}
          {analysisError && (
            <p className="max-w-[300px] text-xs text-[#bd5040]" role="alert">
              {analysisError}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
