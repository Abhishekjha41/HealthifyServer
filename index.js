import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import feedbackRoute from "./api/feedback.js";
import privateSecureRoute from "./api/privatesecure.js";
import aiInsightsRoute from "./api/ai-powered-insights.js";
import chatRoute from "./api/chat.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Use the routes
app.use(feedbackRoute);
app.use(privateSecureRoute);
app.use(aiInsightsRoute);
app.use(chatRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
