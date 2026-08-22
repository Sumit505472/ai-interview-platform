import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
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
