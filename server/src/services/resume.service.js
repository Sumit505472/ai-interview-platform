import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { PDFParse } from "pdf-parse";
import Resume from "../models/Resume.js";

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const normalizeExtractedText = (text) => text
  .replace(/[ \t]+/g, " ")
  .split("\n")
  .map((line) => line.trim())
  .join("\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

export const extractResumeText = async (filePath) => {
  if (!filePath || typeof filePath !== "string") {
    throw new TypeError("A PDF file path is required");
  }

  let fileBuffer;
  try {
    fileBuffer = await fs.readFile(filePath);
  } catch (error) {
    throw new Error(`Unable to read resume PDF: ${error.message}`, { cause: error });
  }

  if (fileBuffer.length === 0) {
    throw new Error("Unable to extract resume text: the PDF file is empty");
  }

  const parser = new PDFParse({ data: fileBuffer });

  try {
    const result = await parser.getText();
    const extractedText = normalizeExtractedText(result.text || "");

    if (!extractedText) {
      throw new Error("The PDF contains no extractable text");
    }

    return extractedText;
  } catch (error) {
    if (error.message === "The PDF contains no extractable text") {
      throw error;
    }

    throw new Error(`Unable to extract resume text: ${error.message}`, { cause: error });
  } finally {
    await parser.destroy();
  }
};

export const getUserResumes = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const resumes = await Resume.find({ user: userId }).sort({ uploadedAt: -1 });
    return resumes;
  } catch (error) {
    throw new Error("Unable to fetch resumes", { cause: error });
  }
};

export const fetchResumeById = async (resumeId, userId) => {
  if (!resumeId || !userId) {
    throw new Error("Resume ID and User ID are required");
  }

  // Validate that resumeId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    const error = new Error("Invalid resume ID format");
    error.statusCode = 400;
    throw error;
  }

  try {
    const resume = await Resume.findOne({
      _id: resumeId,
      user: userId,
    });

    if (!resume) {
      const error = new Error("Resume not found");
      error.statusCode = 404;
      throw error;
    }

    return resume;
  } catch (error) {
    // Re-throw errors with statusCode (400 or 404)
    if (error.statusCode) {
      throw error;
    }
    // Handle unexpected database errors
    throw new Error("Unable to fetch resume", { cause: error });
  }
};

export const createResume = async ({ userId, file }) => {
  if (!userId) {
    throw new Error("Authenticated user is required");
  }

  if (!file || !file.path) {
    throw new Error("Uploaded resume file is required");
  }

  let extractedText;
  try {
    extractedText = await extractResumeText(file.path);
  } catch (error) {
    await fs.unlink(file.path).catch(() => {});
    error.statusCode = 422;
    throw error;
  }

  const filePath = path.relative(serverRoot, file.path).replaceAll(path.sep, "/");

  try {
    return await Resume.create({
      user: userId,
      fileName: file.originalname,
      filePath,
      extractedText,
      fileSize: file.size,
      mimeType: file.mimetype,
      uploadedAt: new Date(),
    });
  } catch (error) {
    await fs.unlink(file.path).catch(() => {});
    throw new Error("Unable to save resume metadata", { cause: error });
  }
};

export const deleteResume = async (resumeId, userId) => {
  if (!resumeId || !userId) {
    throw new Error("Resume ID and User ID are required");
  }

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    const error = new Error("Invalid resume ID format");
    error.statusCode = 400;
    throw error;
  }

  try {
    // Find resume belonging to the logged-in user
    const resume = await Resume.findOne({
      _id: resumeId,
      user: userId,
    });

    if (!resume) {
      const error = new Error("Resume not found");
      error.statusCode = 404;
      throw error;
    }

    // Delete physical PDF file
    try {
      await fs.unlink(resume.filePath);
    } catch (fileError) {
      // Ignore error if file is already missing
      if (fileError.code !== "ENOENT") {
        throw new Error("Unable to delete resume file", {
          cause: fileError,
        });
      }
    }

    // Delete resume document from MongoDB
    await Resume.deleteOne({
      _id: resumeId,
      user: userId,
    });

    return resume;
  } catch (error) {
    // Re-throw known errors
    if (error.statusCode) {
      throw error;
    }

    // Handle unexpected errors
    throw new Error("Unable to delete resume", {
      cause: error,
    });
  }
};
