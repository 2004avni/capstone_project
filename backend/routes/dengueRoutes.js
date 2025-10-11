const express = require("express");
const router = express.Router();
const Dengue = require("../models/dengue");

// GET all dengue records
router.get("/", async (req, res) => {
  try {
    const data = await Dengue.find({});
    res.json(data);
  } catch (err) {
    console.error("Error fetching dengue data:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
