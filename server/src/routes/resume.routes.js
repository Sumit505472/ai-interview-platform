import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { uploadResume, getMyResumes, getResumeById } from "../controllers/resume.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getMyResumes);

router.get("/:id", authMiddleware, getResumeById);
router.delete("/:id", authMiddleware, deleteResumeById);

router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);



export default router;
