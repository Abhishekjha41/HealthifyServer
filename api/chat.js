import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Configure Google AI
const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY || "your-api-key-here"
);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const HEALTH_PROMPT = `
You are Healthify, a specialized women's health AI assistant. Your responses should be:
1. Empathetic and supportive
2. Based on reliable medical information
3. Clear about not being a replacement for professional medical advice
4. Focused on women's health and wellness

Context: {user_message}

Provide a helpful, informative response while maintaining appropriate medical disclaimers.
`;

router.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const prompt = HEALTH_PROMPT.replace("{user_message}", userMessage);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({
      response: response.text(),
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: "error",
    });
  }
});

export default router;
