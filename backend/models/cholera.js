const mongoose = require("mongoose");

const choleraSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ["active", "recovered", "deceased"], default: "active" },
    reportedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cholera", choleraSchema);
