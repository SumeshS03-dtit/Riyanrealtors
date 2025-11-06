const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminSchema = require("../models/userModel");

exports.login = async (req, res) => {
  const { mobile, password } = req.body;

  const user = await adminSchema.findOne({ mobile });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login Success",
    token,
  });
};
