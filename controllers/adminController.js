const adminSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.createAdmin = async (req, res) => {
  try {
    const { name, mobile, password } = req.body;

    if (!name || !mobile || !password) {
      return res.status(400).json({
        message: "Name, mobile & password are required",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newAdmin = await adminSchema.create({
      name,
      mobile,
      password: hashedPassword,
      role: "ADMIN",
    });

    res.json({ message: "Admin created", newAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
