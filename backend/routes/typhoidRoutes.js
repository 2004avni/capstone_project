// backend/routes/typhoidRoutes.js
const express = require("express");
const router = express.Router();

// ✅ Correct path to Typhoid model
const Typhoid = require("../models/typhoid");  

// GET all Typhoid records
router.get("/", async (req, res) => {
  try {
    const data = await Typhoid.find();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching Typhoid data:", err);
    res.status(500).json({ message: "Error fetching Typhoid data", err });
  }
});

module.exports = router;

