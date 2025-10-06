// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     location: {
//       city: { type: String },
//       region: { type: String },
//     },
//     activeSession: { type: String, default: null },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, default: "Not provided" },
    region: { type: String, default: "Not provided" },
    activeSession: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
