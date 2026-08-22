import { createResume } from "../services/resume.service.js";

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
