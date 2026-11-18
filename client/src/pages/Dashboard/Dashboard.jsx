import { useCallback, useEffect, useState } from "react";
import { FileText, Gauge, Mic2, Target } from "lucide-react";
import api from "../../services/api";
import { AnalysisOverview } from "../../components/dashboard/AnalysisOverview";
import { InterviewPreview } from "../../components/dashboard/InterviewPreview";
import { QuickActions } from "../../components/dashboard/QuickActions";
import { RecentActivity } from "../../components/dashboard/RecentActivity";
import {
  ResumeOverview,
  ResumeOverviewSkeleton,
} from "../../components/dashboard/ResumeOverview";
import { StatCard, StatSkeleton } from "../../components/dashboard/StatCard";

export function Dashboard() {
  const [dashboard, setDashboard] = useState({
    user: null,
    resumes: [],
    analysis: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [{ data: userData }, { data: resumeData }] = await Promise.all([
        api.get("/api/auth/me"),
        api.get("/api/resume"),
      ]);
      const resumes = [...(resumeData.resumes || resumeData || [])].sort(
        (first, second) => getResumeTime(second) - getResumeTime(first),
      );
      const latestResume = resumes[0];
      let analysis = null;
      if (latestResume?._id) {
        try {
          const { data: analysisData } = await api.get(
            `/api/resume/${latestResume._id}/analysis`,
          );
          analysis = analysisData.analysis || null;
        } catch (analysisError) {
          if (analysisError.response?.status !== 404) throw analysisError;
        }
      }
      setDashboard({
        user: userData.user || userData,
        resumes,
        analysis,
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const analyzeLatestResume = async () => {
    const resume = dashboard.resumes[0];
    if (!resume?._id || analyzing) return;

    setAnalyzing(true);
    setAnalysisError("");
    try {
      const { data } = await api.post(`/api/resume/${resume._id}/analyze`);
      setDashboard((current) => ({
        ...current,
        analysis: data.analysis || null,
      }));
    } catch (analysisRequestError) {
      setAnalysisError(
        analysisRequestError.response?.data?.message ||
          "Unable to analyze this resume. Please try again.",
      );
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) return <DashboardSkeleton />;
  if (error) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 rounded-[10px] border border-[#ead8d3] bg-surface p-[30px] text-center">
        <strong className="text-[17px] text-[#9d493d]">Unable to load dashboard data.</strong>
        <p className="text-[13px] text-muted">We could not retrieve your preparation workspace.</p>
        <button className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-navy px-4 py-3 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#234954]" onClick={loadDashboard}>
          Try again
        </button>
      </div>
    );
  }

  const { user, resumes, analysis } = dashboard;
  const latestResume = resumes[0];
  const firstName = getFirstName(user);

  return (
    <div className="grid gap-6">
      <header className="flex flex-col items-start justify-between gap-6 min-[701px]:flex-row min-[701px]:items-end">
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] text-[#6e8179] uppercase">
            Your preparation space
          </span>
          <h1 className="mt-2 font-display text-[28px] leading-[1.12] tracking-[-0.04em] sm:text-[32px]">Good to see you, {firstName}.</h1>
          <p className="mt-2 text-sm leading-[1.6] text-muted">Turn your experience into a stronger interview conversation.</p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-[10px] min-[961px]:grid-cols-4 min-[961px]:gap-[14px]" aria-label="Overview statistics">
        <StatCard
          icon={FileText}
          label="Resumes"
          value={resumes.length}
          hint="Uploaded documents"
          tone="sage"
        />
        <StatCard
          icon={Target}
          label="Latest resume score"
          value={analysis ? analysis.overallScore : "Not analyzed yet"}
          hint={analysis ? "Overall score" : "Analyze your latest resume"}
          tone="coral"
        />
        <StatCard
          icon={Mic2}
          label="Interviews completed"
          value="Coming Soon"
          hint="Interview modules are in progress"
          tone="blue"
        />
        <StatCard
          icon={Gauge}
          label="Average interview score"
          value="Coming Soon"
          hint="Interview modules are in progress"
          tone="slate"
        />
      </section>

      <div className="grid gap-[18px] min-[961px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <ResumeOverview
          resume={latestResume}
          analysis={analysis}
          onAnalyze={analyzeLatestResume}
          analyzing={analyzing}
          analysisError={analysisError}
        />
        <AnalysisOverview
          resume={latestResume}
          analysis={analysis}
          onAnalyze={analyzeLatestResume}
          analyzing={analyzing}
          analysisError={analysisError}
        />
      </div>

      <div className="grid gap-[18px] min-[961px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <QuickActions />
        <RecentActivity resumes={resumes} analysis={analysis} />
      </div>

      <InterviewPreview />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="grid min-h-[90px] gap-[18px] min-[701px]:flex min-[701px]:items-end min-[701px]:justify-between">
        <div>
          <span className="block h-2.5 w-[130px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
          <span className="mt-3 block h-[31px] w-[270px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
          <span className="mt-2.5 block h-[13px] w-[290px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
        </div>
      </div>
      <section className="grid grid-cols-2 gap-[10px] min-[961px]:grid-cols-4 min-[961px]:gap-[14px]">
        {[1, 2, 3, 4].map((item) => (
          <StatSkeleton key={item} />
        ))}
      </section>
      <div className="grid gap-[18px] min-[961px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <ResumeOverviewSkeleton />
        <section className="grid min-h-[270px] gap-[19px] rounded-[10px] border border-[#e3e8e4] bg-surface p-[18px] shadow-[0_7px_20px_rgba(23,33,38,0.035)] sm:p-6">
          <span className="block h-[22px] w-[210px] animate-pulse rounded-[5px] bg-[#e9eeea]" />
          <span className="mx-auto mt-[18px] block size-[132px] animate-pulse rounded-full bg-[#e9eeea]" />
        </section>
      </div>
    </div>
  );
}

function getFirstName(user) {
  const name = user?.fullname || user?.fullName || user?.name;
  return name?.trim()?.split(/\s+/)[0] || "there";
}

function getResumeTime(resume) {
  return new Date(resume.uploadedAt || resume.createdAt || 0).getTime();
}
