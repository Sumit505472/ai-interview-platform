import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema(
  {
    // Reference to the Resume document
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    // Overall resume score (0-100)
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    // AI-generated summary of the resume
    summary: {
      type: String,
      required: true,
      trim: true,
    },

    // Array of identified strengths
    strengths: {
      type: [String],
      default: [],
    },

    // Array of identified weaknesses
    weaknesses: {
      type: [String],
      default: [],
    },

    // Array of missing skills
    missingSkills: {
      type: [String],
      default: [],
    },

    // Array of improvement suggestions
    suggestions: {
      type: [String],
      default: [],
    },

    // ATS (Applicant Tracking System) feedback
    atsFeedback: {
      type: String,
      default: "",
      trim: true,
    },

    // AI model used for analysis
    model: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index on resume field for faster queries
resumeAnalysisSchema.index({ resume: 1 });

const ResumeAnalysis = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);

export default ResumeAnalysis;
