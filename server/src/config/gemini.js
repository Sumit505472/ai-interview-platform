import { GoogleGenAI } from "@google/genai";

// Validate that GEMINI_API_KEY environment variable is set
if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "GEMINI_API_KEY environment variable is not configured. " +
    "Please add GEMINI_API_KEY to your .env file."
  );
}

// Initialize the Gemini client with API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default ai;
