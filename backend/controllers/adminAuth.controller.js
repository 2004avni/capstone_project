
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

// POST /api/admin/signup
exports.signup = async (req, res) => {
  try {
    const { hospitalName, headName, email, password } = req.body;

    // Check if admin already exists
    let existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Admin already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({
      hospitalName,
      headName,
      email,
      password: hashed,
    });
    await admin.save();

    res.status(201).json({ msg: "Admin signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/admin/login
// POST /api/admin/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // ✅ Always overwrite old session with a fresh one
    const jti = Date.now().toString();
    const token = generateToken(admin._id, "admin", jti);

    // Save active session
    admin.activeSession = jti;
    await admin.save();

    // Return token + profile
    res.json({
      token,
      role: "admin",
      admin: {
        id: admin._id,
        email: admin.email,
        headName: admin.headName,
        hospitalName: admin.hospitalName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/admin/logout
exports.logout = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (admin) {
      admin.activeSession = null;
      await admin.save();
    }
    res.json({ msg: "Admin logged out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
