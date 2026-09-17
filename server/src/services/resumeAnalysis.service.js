import mongoose from "mongoose";
import ai from "../config/gemini.js";
import Resume from "../models/Resume.js";
import ResumeAnalysis from "../models/ResumeAnalysis.js";

const GEMINI_MODEL = "gemini-2.5-flash";

const createServiceError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const analysisPrompt = (resumeText) => `
Analyze the following resume and return only valid JSON. Do not return Markdown,
code fences, commentary, or any text outside the JSON object.

The JSON object must have exactly this structure:
{
  "overallScore": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "atsFeedback": ""
}

Rules for the fields:
- overallScore must be a number from 0 to 100.
- summary must be a concise summary of the resume.
- strengths must be an array of strings.
- weaknesses must be an array of strings.
- missingSkills must be an array of strings.
- suggestions must be an array of strings.
- atsFeedback must be a string containing Applicant Tracking System feedback.

Resume text:
${resumeText}
`;

const isStringArray = (value) => (
  Array.isArray(value) && value.every((item) => typeof item === "string")
);

const validateAnalysis = (analysis) => {
  const isValidScore = (
    typeof analysis.overallScore === "number" &&
    Number.isFinite(analysis.overallScore) &&
    analysis.overallScore >= 0 &&
    analysis.overallScore <= 100
  );

  if (
    !isValidScore ||
    typeof analysis.summary !== "string" ||
    !isStringArray(analysis.strengths) ||
    !isStringArray(analysis.weaknesses) ||
    !isStringArray(analysis.missingSkills) ||
    !isStringArray(analysis.suggestions) ||
    typeof analysis.atsFeedback !== "string"
  ) {
    throw createServiceError("Gemini returned an invalid resume analysis", 502);
  }
};

export const analyzeResume = async (resumeId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    throw createServiceError("Invalid resume ID format", 400);
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    user: userId,
  });

  if (!resume) {
    throw createServiceError("Resume not found", 404);
  }

  if (!resume.extractedText || !resume.extractedText.trim()) {
    throw createServiceError("Resume does not contain extractable text", 400);
  }

  let response;
  try {
    response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: analysisPrompt(resume.extractedText),
      config: {
        responseMimeType: "application/json",
      },
    });
  } catch (error) {
    throw createServiceError("Unable to analyze resume with Gemini", 502);
  }

  let analysis;
  try {
    analysis = JSON.parse(response.text);
  } catch (error) {
    throw createServiceError("Gemini returned invalid JSON", 502);
  }

  validateAnalysis(analysis);

  return {
    ...analysis,
    model: GEMINI_MODEL,
  };
};

export const saveResumeAnalysis = async (resumeId, userId) => {
  const analysis = await analyzeResume(resumeId, userId);
  const analysisData = {
    resume: new mongoose.Types.ObjectId(resumeId),
    overallScore: analysis.overallScore,
    summary: analysis.summary,
    strengths: analysis.strengths,
    weaknesses: analysis.weaknesses,
    missingSkills: analysis.missingSkills,
    suggestions: analysis.suggestions,
    atsFeedback: analysis.atsFeedback,
    model: analysis.model,
  };

  return ResumeAnalysis.findOneAndUpdate(
    { resume: resumeId },
    { ...analysisData },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );
};

export const getResumeAnalysis = async (resumeId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    throw createServiceError("Invalid resume ID format", 400);
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    user: userId,
  });

  if (!resume) {
    throw createServiceError("Resume not found", 404);
  }

  const analysis = await ResumeAnalysis.findOne({
    resume: resumeId,
  });

  if (!analysis) {
    throw createServiceError("Resume analysis not found", 404);
  }

  return analysis;
};