import { createResume, getUserResumes, fetchResumeById,deleteResume } from "../services/resume.service.js";

export const getMyResumes = async (req, res) => {
  try {
    const resumes = await getUserResumes(req.user._id);

    return res.status(200).json({
      success: true,
      resumes: resumes.map((resume) => ({
        _id: resume._id,
        fileName: resume.fileName,
        fileSize: resume.fileSize,
        mimeType: resume.mimeType,
        uploadedAt: resume.uploadedAt,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch resumes",
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await fetchResumeById(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      resume: {
        _id: resume._id,
        fileName: resume.fileName,
        fileSize: resume.fileSize,
        mimeType: resume.mimeType,
        extractedText: resume.extractedText,
        uploadedAt: resume.uploadedAt,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = statusCode === 400
      ? "Invalid resume ID format"
      : statusCode === 404
      ? "Resume not found"
      : "Unable to fetch resume";

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload a PDF resume",
    });
  }

  try {
    const resume = await createResume({
      userId: req.user._id,
      file: req.file,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: {
        _id: resume._id,
        fileName: resume.fileName,
        fileSize: resume.fileSize,
        mimeType: resume.mimeType,
        uploadedAt: resume.uploadedAt,
      },
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = statusCode === 422
      ? "Unable to extract text from the uploaded PDF"
      : "Unable to upload resume";

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const deleteResumeById = async (req, res) => {
  try {
    await deleteResume(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;

    const message =
      statusCode === 400
        ? "Invalid resume ID format"
        : statusCode === 404
        ? "Resume not found"
        : "Unable to delete resume";

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};