import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import feedbackRoute from "./api/feedback.js";
import aiInsightsRoute from "./api/ai-powered-insights.js";
import chatRoute from "./api/chat.js";
import periodTrackerRoute from "./api/period-tracker.js";

const app = express();
dotenv.config();
app.use(cors());

app.use(
  cors({
    origin: "https://healthify-ai.vercel.app/", // Specify the frontend URL for deployment
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);
app.use(express.json());

// Use the routes
app.use(feedbackRoute);
app.use(aiInsightsRoute);
app.use(chatRoute);
app.use(periodTrackerRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
