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

const AI_INSIGHTS_PROMPT = `
You are Healthify, a specialized women's health AI assistant with a focus on providing actionable insights. 
Your responses should be:
1. Based on up-to-date medical research
2. Empathetic, supportive, and focused on practical advice
3. Clear about not replacing professional medical consultation
4. Tailored to women's health and wellness topics
5. Not include women word in each line and give in more readable format
6. hide the classfication
7. give response in a step by step manner and including proper indentation
Context: {health_query}

Generate a comprehensive response that is evidence-based and useful for the user's health needs.
`;

router.post("/api/ai-powered-insights", async (req, res) => {
  try {
    const healthQuery = req.body.healthQuery;
    const prompt = AI_INSIGHTS_PROMPT.replace("{health_query}", healthQuery);

    // Generate AI-powered insights
    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({
      insights: response.text(),
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
