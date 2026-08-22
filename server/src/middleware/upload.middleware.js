import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import multer from "multer";

const middlewareDirectory = path.dirname(fileURLToPath(import.meta.url));
const uploadDirectory = path.resolve(middlewareDirectory, "../uploads/resumes");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (_req, _file, callback) => {
    callback(null, `resume-${crypto.randomUUID()}.pdf`);
  },
});

const fileFilter = (_req, file, callback) => {
  if (file.mimetype !== "application/pdf") {
    return callback(new Error("Only PDF files are allowed"), false);
  }

  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
