// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const morgan = require("morgan");

// dotenv.config();
// console.log("✅ server.js loaded");

// const authRoutes = require("./routes/auth.routes");
// const adminAuthRoutes = require("./routes/adminAuth.routes");
// const choleraRoutes = require("./routes/choleraRoutes");
// const typhoidRoutes = require("./routes/typhoidRoutes");
// const Cholera = require("./models/cholera");
// const sendNotification = require("./utils/notifications");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminAuthRoutes);
// app.use("/api/cholera", choleraRoutes);
// app.use("/api/typhoid", typhoidRoutes);

// // Health check
// app.get("/", (req, res) => res.send("Welcome to Home API"));

// // DB + Server
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");

//     // SOS watcher
//     const THRESHOLD = 10;

//     Cholera.watch().on("change", async () => {
//       try {
//         const totalCases = await Cholera.countDocuments({});
//         if (totalCases >= THRESHOLD) {
//           await sendNotification(
//             `🚨 SOS Alert! Cholera cases crossed ${THRESHOLD}. Current: ${totalCases}`
//           );
//         }
//       } catch (err) {
//         console.error("❌ Error in SOS watcher:", err.message);
//       }
//     });
//     console.log("👀 SOS Watcher initialized");

//     // Start server
//     app.listen(process.env.PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
//     });
//   })
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();
console.log("✅ server.js loaded");

const authRoutes = require("./routes/auth.routes");
const adminAuthRoutes = require("./routes/adminAuth.routes");
const choleraRoutes = require("./routes/choleraRoutes");
const typhoidRoutes = require("./routes/typhoidRoutes"); // ✅ Added
const dengueRoutes = require("./routes/dengueRoutes");

const Cholera = require("./models/cholera");
const sendNotification = require("./utils/notifications");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/cholera", choleraRoutes);
app.use("/api/typhoid", typhoidRoutes); // ✅ Added Typhoid route
app.use("/api/dengue", dengueRoutes);

// Health check
app.get("/", (req, res) => res.send("Welcome to Home API"));

// DB + Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");

    // SOS watcher for Cholera
    const THRESHOLD = 10;
    Cholera.watch().on("change", async () => {
      try {
        const totalCases = await Cholera.countDocuments({});
        if (totalCases >= THRESHOLD) {
          await sendNotification(
            `🚨 SOS Alert! Cholera cases crossed ${THRESHOLD}. Current: ${totalCases}`
          );
        }
      } catch (err) {
        console.error("❌ Error in SOS watcher:", err.message);
      }
    });
    console.log("👀 SOS Watcher initialized");

    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
