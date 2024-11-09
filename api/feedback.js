import express from "express";

const router = express.Router();

router.post("/feedback", async (req, res) => {
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

export default router;
