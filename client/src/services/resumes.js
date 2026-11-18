import api from "./api";

export async function getResumes() {
  const { data } = await api.get("/api/resume");
  return data.resumes || data || [];
}

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("resume", file);
  const { data } = await api.post("/api/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.resume;
}

export async function getResumeById(id) {
  const { data } = await api.get(`/api/resume/${id}`);
  return data.resume || data;
}

export async function deleteResume(id) {
  const { data } = await api.delete(`/api/resume/${id}`);
  return data;
}
