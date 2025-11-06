const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { onlyMaster } = require("../middleware/roleMiddleware");
const { createAdmin } = require("../controllers/adminController");

// Create admin (only Master Admin can do)
router.post("/create", authMiddleware, onlyMaster, createAdmin);

module.exports = router;
