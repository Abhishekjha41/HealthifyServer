import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import feedbackRoute from "./api/feedback.js";
import aiInsightsRoute from "./api/ai-powered-insights.js";
import chatRoute from "./api/chat.js";
import periodTrackerRoute from "./api/period-tracker.js";

dotenv.config();
const app = express();

app.options(
  "*",
  cors({
    origin: "https://healthify-ai.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Configure CORS to allow requests from specific origin
app.use(
  cors({
    origin: "https://healthify-ai.vercel.app", // Allow your frontend origin
    methods: ["GET", "POST"], // Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
    credentials: true, // Allow credentials if needed (e.g., cookies)
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

// Use the routes
app.use(feedbackRoute);
app.use(aiInsightsRoute);
app.use(chatRoute);
app.use(periodTrackerRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
