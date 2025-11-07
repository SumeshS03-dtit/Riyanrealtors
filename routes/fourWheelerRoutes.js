const express = require("express")
const router = express.Router();

const upload = require("../middleware/upload");
const {
    createFourWheeler,
    updateFourWheeler,
    getAllFourWheelers,
    getFourWheelerById,
    deleteFourWheeler

} = require("../controllers/fourWheelerController");

//create route
router.post("/createfourwheeler", upload.array("vehicleImage", 5), createFourWheeler);

//update
router.put("/updatefourwheeler/:id", upload.array("vehicleImage", 5), updateFourWheeler);

//get by id
router.get("/getfourwheelerdetail/:id",getFourWheelerById);

//get all
router.get("/getfourwheeler", getAllFourWheelers);

//delete
router.delete("/deletefourwheeler/:id", deleteFourWheeler);

module.exports = router;