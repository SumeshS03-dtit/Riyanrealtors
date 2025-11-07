const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const { onlyMaster, onlyAdmins } = require("../middleware/roleMiddleware");

const {
  createProperty,
  updateProperty,
  getPropertyById,
  getAllProperties,
  deleteProperty
} = require("../controllers/propertyController");

router.post("/createproperty", upload.array("propertyImages", 5),authMiddleware,onlyAdmins, createProperty);

router.put("/updateproperty/:id", upload.array("propertyImages", 5),authMiddleware,onlyAdmins, updateProperty);

router.get("/getproperty/:id", getPropertyById);

router.get("/getproperties", getAllProperties);

router.delete("/deleteproperty/:id",authMiddleware,onlyAdmins, deleteProperty);

module.exports = router;
