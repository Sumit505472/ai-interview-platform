import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
	analyzeResumeController,
	getResumeAnalysisController,
} from "../controllers/resumeAnalysis.controller.js";

const router = express.Router();

router.post("/:id/analyze", authMiddleware, analyzeResumeController);
router.get("/:id/analysis", authMiddleware, getResumeAnalysisController);

export default router;