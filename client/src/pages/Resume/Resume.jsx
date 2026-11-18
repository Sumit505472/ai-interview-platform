import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  MoreHorizontal,
  Plus,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../services/api";
import {
  EmptyState,
  ErrorState,
  Loading,
} from "../../components/common/States";
export function Resume() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const inputRef = useRef();
  const load = () =>
    api
      .get("/api/resume")
      .then(({ data }) => setResumes(data.resumes || data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  useEffect(load, []);
  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("resume", file);
    try {
      await api.post("/api/resume/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Resume uploaded");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to upload resume");
    }
  };
  const remove = async (id) => {
    try {
      await api.delete(`/api/resume/${id}`);
      setResumes((items) => items.filter((item) => item._id !== id));
      toast.success("Resume removed");
    } catch {
      toast.error("Unable to delete resume");
    }
  };
  return (
    <>
      <div className="mb-9 flex flex-col items-start justify-between gap-5 min-[521px]:flex-row min-[521px]:items-end">
        <div>
          <span className="inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.04em] text-muted uppercase">Your documents</span>
          <h1 className="my-[10px] font-display text-[28px] tracking-[-0.05em] sm:text-[32px]">Resume workspace</h1>
          <p className="text-sm text-muted">Keep your story sharp and ready for the next conversation.</p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-coral px-4 py-3 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#dc5c42]"
          onClick={() => inputRef.current?.click()}
        >
          <Plus size={17} /> Upload resume
        </button>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="application/pdf"
          onChange={upload}
        />
      </div>
      <div className="flex min-h-[115px] cursor-pointer flex-wrap items-start justify-center gap-[15px] border border-dashed border-[#b7beb7] bg-[#edece5] p-5 min-[521px]:items-center" onClick={() => inputRef.current?.click()}>
        <UploadCloud className="text-coral" size={25} />
        <div>
          <strong className="block text-sm">Drop your resume here</strong>
          <span className="mt-1 block text-xs text-muted">PDF only · up to 5 MB</span>
        </div>
        <button className="ml-0 inline-flex w-full items-center justify-center gap-2 rounded-[7px] bg-[#ecebe5] px-4 py-3 text-[13px] font-bold text-ink transition hover:bg-[#e2e1db] sm:ml-5 sm:w-auto">Browse files</button>
      </div>
      <div className="my-[38px] mb-[14px] flex items-center justify-between">
        <h2 className="font-display text-lg">
          Uploaded resumes <span className="ml-1.5 font-mono text-xs text-muted">{resumes.length || ""}</span>
        </h2>
        <button className="relative inline-flex cursor-pointer items-center justify-center bg-transparent p-[7px] text-muted hover:text-ink">
          <MoreHorizontal size={19} />
        </button>
      </div>
      {loading ? (
        <Loading label="Loading resumes" />
      ) : error ? (
        <ErrorState />
      ) : resumes.length === 0 ? (
        <EmptyState
          title="No resumes uploaded yet."
          description="Add your latest resume to start building your preparation plan."
        />
      ) : (
        <div className="grid gap-2">
          {resumes.map((resume) => (
            <article className="flex flex-wrap items-center gap-[15px] border border-line bg-surface p-4 sm:flex-nowrap" key={resume._id}>
              <div className="flex size-10 shrink-0 items-center justify-center bg-[#f8dcd4] text-coral">
                <FileText size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px]">{resume.fileName}</strong>
                <span className="mt-[5px] block overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-muted">
                  {resume.fileSize
                    ? `${Math.round(resume.fileSize / 1024)} KB`
                    : "PDF"}{" "}
                  ·{" "}
                  {resume.createdAt
                    ? new Date(resume.createdAt).toLocaleDateString()
                    : "Recently uploaded"}
                </span>
              </div>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-[7px] bg-[#ecebe5] px-4 py-3 text-[13px] font-bold text-ink transition hover:bg-[#e2e1db]"
                to={`/resume/${resume._id}/analysis`}
              >
                <Sparkles size={15} /> View analysis
              </Link>
              <button
                className="relative inline-flex cursor-pointer items-center justify-center bg-transparent p-[7px] text-muted hover:text-[#c24d3a]"
                onClick={() => remove(resume._id)}
                title="Delete resume"
              >
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
