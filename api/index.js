import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://healthify-ai.vercel.app/", // Allow your frontend origin
    methods: ["GET", "POST"], // Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow credentials if needed (e.g., cookies)
  })
);
app.use(express.json());

// Period Tracker Endpoint
app.post("/api/period-tracker", (req, res) => {
  const { lastPeriodDate, cycleLength } = req.body;
  if (!lastPeriodDate || !cycleLength) {
    return res
      .status(400)
      .json({ error: "Please provide both lastPeriodDate and cycleLength" });
  }
  try {
    const nextPeriodDate = calculateNextPeriod(
      lastPeriodDate,
      parseInt(cycleLength)
    );
    res.json({ nextPeriodDate });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate next period date" });
  }
});

// Helper function to calculate next period date
function calculateNextPeriod(lastPeriodDate, cycleLength) {
  const lastDate = new Date(lastPeriodDate);
  const nextDate = new Date(lastDate.setDate(lastDate.getDate() + cycleLength));
  return nextDate.toISOString().split("T")[0];
}

// Feedback Endpoint
app.post("/feedback", async (req, res) => {
  try {
    const { rating, comments, suggestions } = req.body;
    // Process the feedback (e.g., store in a database or log it)
    console.log("Feedback Received:", {
      rating,
      comments,
      suggestions,
    });
    // You could add logic to store the feedback here (e.g., in a database)
    res.json({
      message: "Thank you for your feedback!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: "error",
    });
  }
});

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
app.post("/api/chat", async (req, res) => {
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
app.post("/api/ai-powered-insights", async (req, res) => {
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

console.log("Abhishek");
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
