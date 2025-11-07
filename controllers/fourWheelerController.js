const FourWheeler = require("../models/fourWheelerModel")
const mongoose = require("mongoose");

//create new fourwheller detail
exports.createFourWheeler = async (req, res) => {
    try{

        //reject if no form-data body
        if (!req.body || Object.keys(req.body).length ===0){
            return res.status(400).json({
        message: "Form-data required. JSON not accepted ❌",
          });
        }
        
    const {
      vehicleName,
      price,
      carVariant,
      kmDriven,
      purchaseYear,
      location,
    } = req.body;

    // Required feild validation
    if(
      !vehicleName ||
      !price ||
      !carVariant ||
      !kmDriven ||
      !purchaseYear ||
      !location 
    ) {
      return res.status(400).json({
        message:
        "vehicleName, price, carVariant, kmDriven, purchaseYear, location are required",
      });
    }

    // store only filename if image uploaded
    let data = req.body;

    // ✅ Convert numeric values (form-data → string → number)
    data.price = Number(data.price);
    data.kmDriven = Number(data.kmDriven);
    data.purchaseYear = Number(data.purchaseYear);
    if (data.mileagePerLiter) data.mileagePerLiter = Number(data.mileagePerLiter);
    if (data.seatCapacity) data.seatCapacity = Number(data.seatCapacity);

    // ✅ Save multiple uploaded images
    if (req.files && req.files.length > 0) {
      data.vehicleImage = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const vehicle = await FourWheeler.create(data);

    return res.json({
      message: "Four Wheeler Added ✅",
      vehicle,
    });


    }catch (err) {
    return res.status(500).json({ message: err.message });
  }

}


//find by id and update the detail
exports.updateFourWheeler = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID ❌" });
    }

    // Reject if no form data
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Form-data required. JSON not accepted ❌",
      });
    }

    let data = req.body;

    // ✅ Convert numeric values (FormData sends everything as string)
    if (data.price) data.price = Number(data.price);
    if (data.kmDriven) data.kmDriven = Number(data.kmDriven);
    if (data.purchaseYear) data.purchaseYear = Number(data.purchaseYear);
    if (data.mileagePerLiter) data.mileagePerLiter = Number(data.mileagePerLiter);
    if (data.seatCapacity) data.seatCapacity = Number(data.seatCapacity);

    // ✅ Update image ONLY if new images were uploaded
    if (req.files && req.files.length > 0) {
      data.vehicleImage = req.files.map((file) => `/uploads/${file.filename}`);
    } else {
      delete data.vehicleImage;   // ✅ prevents replacing old images with undefined
    }

    // ✅ Update & return new document  
    const updatedVehicle = await FourWheeler.findByIdAndUpdate(id, data, {
      new: true,          // return updated document
      runValidators: true, // validate with schema
    });

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found ❌" });
    }

    return res.json({
      message: "Four Wheeler Updated ✅",
      updatedVehicle,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//get all fourwheeler detail
exports.getAllFourWheelers = async (req,res) => {
  try{
    const vehicles = await FourWheeler.find().sort({ createdAt: -1}); //latest first

    return res.json(vehicles);
  } catch (err){
    return res.status(500).json({ message: err.message});
  }
}

//get vehicle detail by id
exports.getFourWheelerById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID ❌" });
    }

    const vehicle = await FourWheeler.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found ❌" });
    }

    return res.status(200).json({
      message: "Vehicle fetched ✅",
      vehicle,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//delete vehicle detail by id
exports.deleteFourWheeler = async (req, res) => {
  try{
    const { id } = req.params;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid vehicle ID ❌" });
    }

    const vehicle = await FourWheeler.findByIdAndDelete(id);

    if (!vehicle){
      return res.status(404).json({ message: "Vehicle not found"});
    }

    return res.status(200).json({
      message: "Vehicle deleted ✅",
    });

  }catch(err){
    return res.status(500).json({ message: err.message})
  }
}