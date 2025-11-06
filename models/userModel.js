const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  mobile: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["MASTER_ADMIN", "ADMIN", "STAFF"],
    default: "ADMIN",
  },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Admin", adminSchema);
