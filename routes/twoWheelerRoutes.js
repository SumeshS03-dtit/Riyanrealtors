const express = require("express")
const router = express.Router();

const upload = require("../middleware/upload");

const {
  deleteTwoWheeler,
  getAllTwoWheelers,
  getTwoWheelerById,
  updateTwoWheeler,
  createTwoWheeler
 
} = require("../controllers/twoWheelerController");

// Create
router.post("/createtwowheeler", upload.array("vehicleImage", 5), createTwoWheeler);

// Update
router.put("/updatetwowheeler/:id", upload.array("vehicleImage", 5), updateTwoWheeler);

// Get by ID
router.get("/gettwowheelerdetail/:id", getTwoWheelerById);

// Get All
router.get("/gettwowheeler", getAllTwoWheelers);

// Delete
router.delete("/deletetwowheeler/:id", deleteTwoWheeler);

module.exports = router;