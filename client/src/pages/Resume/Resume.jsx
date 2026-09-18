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
      <div className="page-heading">
        <div>
          <span className="eyebrow">Your documents</span>
          <h1>Resume workspace</h1>
          <p>Keep your story sharp and ready for the next conversation.</p>
        </div>
        <button
          className="button button-coral"
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
      <div className="upload-zone" onClick={() => inputRef.current?.click()}>
        <UploadCloud size={25} />
        <div>
          <strong>Drop your resume here</strong>
          <span>PDF only · up to 5 MB</span>
        </div>
        <button className="button button-light">Browse files</button>
      </div>
      <div className="section-bar">
        <h2>
          Uploaded resumes <span>{resumes.length || ""}</span>
        </h2>
        <button className="icon-button">
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
        <div className="resume-list">
          {resumes.map((resume) => (
            <article className="resume-card" key={resume._id}>
              <div className="resume-file-icon">
                <FileText size={22} />
              </div>
              <div className="resume-info">
                <strong>{resume.fileName}</strong>
                <span>
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
                className="button button-light"
                to={`/resume/${resume._id}/analysis`}
              >
                <Sparkles size={15} /> View analysis
              </Link>
              <button
                className="icon-button danger"
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
