const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/token");

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      location: {
        city: location?.city || "Unknown",
        region: location?.region || "Unknown",
      },
    });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Always overwrite activeSession with a new one
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
        location: user.location,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// POST /api/auth/logout
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.activeSession = null;
      await user.save();
    }
    res.json({ msg: "User logged out" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
