const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createProperty,
  updateProperty,
  getPropertyById,
  getAllProperties,
  deleteProperty
} = require("../controllers/propertyController");

router.post("/createproperty", upload.array("propertyImages", 5), createProperty);

router.put("/updateproperty/:id", upload.array("propertyImages", 5), updateProperty);

router.get("/getproperty/:id", getPropertyById);

router.get("/getproperties", getAllProperties);

router.delete("/deleteproperty/:id", deleteProperty);

module.exports = router;
