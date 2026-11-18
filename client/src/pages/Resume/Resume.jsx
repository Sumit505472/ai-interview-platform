import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  FileText,
  FileUp,
  LoaderCircle,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/States";
import { PageHeader } from "../../components/common/PageHeader";
import { deleteResume, getResumes, uploadResume } from "../../services/resumes";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function Resume() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [selectedForDeletion, setSelectedForDeletion] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const inputRef = useRef(null);

  const loadResumes = useCallback(async () => {
    setLoading(true);
    setListError("");
    try {
      setResumes(await getResumes());
    } catch (error) {
      setListError(getErrorMessage(error, "Unable to load your resumes."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  const handleFileSelection = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      (!file.type && file.name.toLowerCase().endsWith(".pdf"));
    if (!isPdf) {
      setUploadError("Choose a PDF file to upload.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError("The PDF must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    setUploadError("");
    try {
      await uploadResume(file);
      await loadResumes();
    } catch (error) {
      setUploadError(getErrorMessage(error, "Unable to upload this resume."));
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedForDeletion || deleting) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await deleteResume(selectedForDeletion._id);
      setSelectedForDeletion(null);
      await loadResumes();
    } catch (error) {
      setDeleteError(getErrorMessage(error, "Unable to delete this resume."));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="grid gap-6">
      <PageHeader
        title="Resume workspace"
        description="Manage your uploaded resumes and keep your experience up to date."
        action={
          <Button
            type="button"
            className="gap-2 bg-coral text-white hover:bg-[#dc5c42]"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <LoaderCircle className="animate-spin" size={17} />
            ) : (
              <Plus size={17} />
            )}
            {uploading ? "Uploading…" : "Upload resume"}
          </Button>
        }
      />

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        onChange={handleFileSelection}
        aria-label="Choose a PDF resume"
      />

      <section className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#b7c4ba] bg-[#f2f6f2] px-5 py-7 text-center sm:py-9">
        <span className="flex size-11 items-center justify-center rounded-full bg-white text-[#397055] shadow-sm">
          <UploadCloud size={22} />
        </span>
        <div>
          <h2 className="font-display text-lg">Add a resume</h2>
          <p className="mt-1 text-xs text-muted">PDF format · Maximum file size 5 MB</p>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="gap-2"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <FileUp size={16} /> Browse files
        </Button>
        {uploading && (
          <p className="flex items-center gap-2 text-xs text-muted" role="status">
            <LoaderCircle className="animate-spin" size={15} /> Uploading your PDF…
          </p>
        )}
        {uploadError && <InlineError message={uploadError} />}
      </section>

      <section aria-labelledby="resume-list-heading">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 id="resume-list-heading" className="font-display text-lg">
            Uploaded resumes
          </h2>
          {!loading && !listError && (
            <span className="rounded-full bg-[#eaf1ec] px-2.5 py-1 font-mono text-[11px] text-[#397055]">
              {resumes.length}
            </span>
          )}
        </div>

        {loading ? (
          <ResumeListSkeleton />
        ) : listError ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-[#ead8d3] bg-white p-6 text-center">
            <InlineError message={listError} />
            <Button type="button" variant="secondary" onClick={loadResumes}>
              Try again
            </Button>
          </div>
        ) : resumes.length === 0 ? (
          <div className="rounded-xl border border-line bg-surface px-4">
            <EmptyState
              title="No resumes uploaded yet"
              description="Upload a PDF resume to keep your documents together in one place."
              action={
                <Button
                  type="button"
                  className="mt-2 gap-2 bg-coral text-white hover:bg-[#dc5c42]"
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                >
                  <Plus size={16} /> Upload your first resume
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid gap-3">
            {resumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onDelete={() => {
                  setDeleteError("");
                  setSelectedForDeletion(resume);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {selectedForDeletion && (
        <DeleteDialog
          resume={selectedForDeletion}
          deleting={deleting}
          error={deleteError}
          onCancel={() => {
            if (!deleting) setSelectedForDeletion(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

function ResumeCard({ resume, onDelete }) {
  return (
    <article className="flex min-w-0 flex-col gap-4 rounded-xl border border-line bg-surface p-4 shadow-[0_7px_20px_rgba(23,33,38,0.025)] sm:flex-row sm:items-center sm:p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#fbe5de] text-coral">
        <FileText size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-ink" title={resume.fileName}>
          {resume.fileName}
        </h3>
        <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-muted">
          <span>{formatFileSize(resume.fileSize)}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={resume.uploadedAt || resume.createdAt}>
            Uploaded {formatDate(resume.uploadedAt || resume.createdAt)}
          </time>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <Link
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[7px] bg-[#eaf1ec] px-3.5 text-xs font-bold text-[#2b604e] transition hover:bg-[#dce9df]"
          to={`/resume/${resume._id}`}
        >
          View details <ArrowRight size={15} />
        </Link>
        <Button
          type="button"
          variant="danger"
          className="gap-2"
          onClick={onDelete}
          aria-label={`Delete ${resume.fileName}`}
        >
          <Trash2 size={15} /> Delete
        </Button>
      </div>
    </article>
  );
}

function DeleteDialog({ resume, deleting, error, onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#17212680] p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        aria-labelledby="delete-resume-title"
        aria-modal="true"
        className="w-full max-w-md rounded-xl border border-line bg-surface p-5 shadow-[0_20px_60px_rgba(23,33,38,0.2)] sm:p-6"
        role="dialog"
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-[#fbe8e4] text-[#a94438]">
          <Trash2 size={19} />
        </div>
        <h2 id="delete-resume-title" className="mt-4 font-display text-xl">
          Delete this resume?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          <strong className="break-all text-ink">{resume.fileName}</strong> will be removed from your account. This action cannot be undone.
        </p>
        {error && <div className="mt-3"><InlineError message={error} /></div>}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={deleting}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            className="gap-2"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting && <LoaderCircle className="animate-spin" size={15} />}
            {deleting ? "Deleting…" : "Delete resume"}
          </Button>
        </div>
      </section>
    </div>
  );
}

function ResumeListSkeleton() {
  return (
    <div className="grid gap-3" aria-label="Loading resumes" aria-busy="true">
      {[0, 1, 2].map((item) => (
        <div className="flex min-h-[92px] animate-pulse items-center gap-4 rounded-xl border border-line bg-surface p-4" key={item}>
          <span className="size-11 rounded-lg bg-[#e9eeea]" />
          <span className="grid flex-1 gap-2">
            <span className="h-3 w-2/5 rounded bg-[#e9eeea]" />
            <span className="h-2.5 w-1/4 rounded bg-[#e9eeea]" />
          </span>
          <span className="hidden h-10 w-28 rounded bg-[#e9eeea] sm:block" />
        </div>
      ))}
    </div>
  );
}

function InlineError({ message }) {
  return (
    <p className="flex items-center gap-2 text-left text-xs text-[#a94438]" role="alert">
      <AlertCircle className="shrink-0" size={16} /> {message}
    </p>
  );
}

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || fallback;
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
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}
