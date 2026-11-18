import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, FileText, HardDrive, RefreshCw } from "lucide-react";
import { Button } from "../../components/common/Button";
import { PageHeader } from "../../components/common/PageHeader";
import { Loading } from "../../components/common/States";
import { getResumeById } from "../../services/resumes";

export function ResumeDetails() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadResume = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setResume(await getResumeById(id));
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to load this resume.",
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Resume details"
        description="Review the file information and text extracted from this PDF."
        action={
          <Link
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[7px] border border-[#dce2de] px-[15px] text-[13px] font-bold text-ink transition-colors hover:bg-[#f1f4f1]"
            to="/resume"
          >
            <ArrowLeft size={16} /> All resumes
          </Link>
        }
      />

      {loading ? (
        <Loading label="Loading resume details" />
      ) : error ? (
        <section className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-xl border border-[#ead8d3] bg-surface p-6 text-center">
          <p className="max-w-lg text-sm text-[#a94438]" role="alert">
            {error}
          </p>
          <Button type="button" variant="secondary" className="gap-2" onClick={loadResume}>
            <RefreshCw size={15} /> Try again
          </Button>
        </section>
      ) : resume ? (
        <>
          <section className="rounded-xl border border-line bg-surface p-5 shadow-[0_7px_20px_rgba(23,33,38,0.025)] sm:p-7">
            <div className="flex min-w-0 items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#fbe5de] text-coral">
                <FileText size={24} />
              </span>
              <div className="min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6e8179]">
                  Resume file
                </span>
                <h2 className="mt-1 break-all font-display text-xl leading-snug sm:text-2xl">
                  {resume.fileName}
                </h2>
              </div>
            </div>

            <dl className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-3">
              <DetailItem
                icon={HardDrive}
                label="File size"
                value={formatFileSize(resume.fileSize)}
              />
              <DetailItem
                icon={CalendarDays}
                label="Uploaded"
                value={formatDate(resume.uploadedAt || resume.createdAt)}
              />
              <DetailItem
                icon={FileText}
                label="File type"
                value={resume.mimeType || "PDF"}
              />
            </dl>
          </section>

          <section className="overflow-hidden rounded-xl border border-line bg-surface">
            <div className="border-b border-line px-5 py-4 sm:px-6">
              <h2 className="font-display text-lg">Extracted text</h2>
              <p className="mt-1 text-xs text-muted">
                Text extracted from the uploaded document.
              </p>
            </div>
            {resume.extractedText?.trim() ? (
              <pre className="max-h-[65vh] overflow-auto whitespace-pre-wrap break-words p-5 font-sans text-[13px] leading-7 text-[#536167] sm:p-6">
                {resume.extractedText}
              </pre>
            ) : (
              <p className="px-5 py-8 text-sm text-muted sm:px-6">
                No extracted text is available for this resume.
              </p>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 shrink-0 text-[#648171]" size={16} />
      <div>
        <dt className="text-[11px] text-muted">{label}</dt>
        <dd className="mt-1 break-words text-xs font-semibold text-ink">{value}</dd>
      </div>
    </div>
  );
}

function formatFileSize(bytes) {
  if (typeof bytes !== "number") return "Size unavailable";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : date.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
}
