const mongoose = require("mongoose");

const dengueSchema = new mongoose.Schema({
  s__no: { type: String, required: true },
  state_u_t_: { type: String, required: true },
  _2021: { type: String, required: true },
  _2022: { type: String, required: true },
  _2023: { type: String, required: true },
  _2024: { type: String, required: true },
  _2025__prov__: { type: String, required: true },
});

module.exports = mongoose.model("Dengue", dengueSchema, "DENGUE"); 
// Third argument ensures it uses the exact collection name in MongoDB
