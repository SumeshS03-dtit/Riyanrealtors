const express = require("express")
const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const { onlyMaster, onlyAdmins } = require("../middleware/roleMiddleware");


const {
    createFourWheeler,
    updateFourWheeler,
    getAllFourWheelers,
    getFourWheelerById,
    deleteFourWheeler

} = require("../controllers/fourWheelerController");

//create route
router.post("/createfourwheeler", upload.array("vehicleImage", 5),authMiddleware,onlyAdmins, createFourWheeler);

//update
router.put("/updatefourwheeler/:id", upload.array("vehicleImage", 5),authMiddleware,onlyAdmins, updateFourWheeler);

//get by id
router.get("/getfourwheelerdetail/:id",getFourWheelerById);

//get all
router.get("/getfourwheeler", getAllFourWheelers);

//delete
router.delete("/deletefourwheeler/:id",authMiddleware,onlyAdmins, deleteFourWheeler);

module.exports = router;