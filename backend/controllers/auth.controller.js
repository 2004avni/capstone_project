const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateToken } = require("../utils/token");

// ------------------ REGISTER ------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password, city, region } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      city: city || "Not provided",
      region: region || "Not provided",
    });

    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ------------------ LOGIN ------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const jti = Date.now().toString();
    const token = generateToken(user._id, "user", jti);

    user.activeSession = jti;
    await user.save();

    res.json({
      token,
      role: "user",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        city: user.city,
        region: user.region,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ------------------ LOGOUT ------------------
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id);
    if (user) {
      user.activeSession = null;
      await user.save();
    }
    res.json({ msg: "User logged out" });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ------------------ GET PROFILE ------------------
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email city region");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      city: user.city || "Not provided",
      region: user.region || "Not provided",
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
