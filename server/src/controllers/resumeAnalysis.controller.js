import {
  saveResumeAnalysis,
  getResumeAnalysis,
} from "../services/resumeAnalysis.service.js";

export const analyzeResumeController = async (req, res) => {
  try {
    const analysis = await saveResumeAnalysis(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      analysis,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message =
      statusCode === 400
        ? error.message
        : statusCode === 404
        ? "Resume not found"
        : statusCode === 502
        ? error.message
        : "Unable to analyze resume";

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};

export const getResumeAnalysisController = async (req, res) => {
  try {
    const analysis = await getResumeAnalysis(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = statusCode === 400 || statusCode === 404
      ? error.message
      : "Unable to fetch resume analysis";

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};