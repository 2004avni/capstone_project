// backend/models/typhoidSchema.js
const mongoose = require("mongoose");

const typhoidSchema = new mongoose.Schema({
  s__no: String,
  state_u_t_: String,
  _2021: String,
  _2022: String,
  _2023: String,
  _2024: String,
  _2025__prov__: String,
}, { timestamps: true });

// ✅ Third argument forces collection name in MongoDB
module.exports = mongoose.model("Typhoid", typhoidSchema, "TYPHOID");
