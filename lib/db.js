const mongoose = require("mongoose");
const adminSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await seedMasterAdmin();

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

const seedMasterAdmin = async () => {
  try {
    const exists = await adminSchema.findOne({ role: "MASTER_ADMIN" });
    if (exists) return;

    const hashedPassword = await bcrypt.hash(
      process.env.MASTER_PASSWORD,
      10
    );

    await adminSchema.create({
      name: process.env.MASTER_NAME,
      mobile: process.env.MASTER_MOBILE,
      password: hashedPassword,
      role: "MASTER_ADMIN",
    });

    console.log("✅ Master Admin Created");
  } catch (err) {
    console.log("❌ Master Admin Creation Error:", err.message);
  }
};

module.exports = connectDB;