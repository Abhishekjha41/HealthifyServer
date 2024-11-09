import express from "express";

const router = express.Router();

router.post("/api/period-tracker", (req, res) => {
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

export default router;
