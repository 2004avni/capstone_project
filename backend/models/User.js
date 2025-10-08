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







// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     city: { type: String, default: "Not provided" },
//     region: { type: String, default: "Not provided" },
//     activeSession: { type: String, default: null },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);




const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // 🏙️ City where the user lives
    city: {
      type: String,
      default: "Not provided",
      trim: true,
    },

    // 🌍 Region / State information
    region: {
      type: String,
      default: "Not provided",
      trim: true,
    },

    // 🟢 To track user session or token reference if needed
    activeSession: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// Optional: format output to remove sensitive data (e.g., password)
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
