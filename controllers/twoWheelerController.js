const TwoWheeler = require("../models/twoWheelerModel")


//create new vehicle detail
exports.createTwoWheeler = async (req, res) => {
  try {

    // ❌ Reject if no form-data body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Form-data required. JSON not accepted ❌",
      });
    }

    const {
      vehicleName,
      price,
      category,
      kmDriven,
      purchaseYear,
      location,
    } = req.body;

    // ✅ Required field validation
    if (
      !vehicleName ||
      !price ||
      !category ||
      !kmDriven ||
      !purchaseYear ||
      !location
    ) {
      return res.status(400).json({
        message:
          "vehicleName, price, category, kmDriven, purchaseYear, location are required",
      });
    }

    // ✅ Store only file name if image uploaded
   let data = req.body;

    // ✅ Save multiple image filenames
    if (req.files && req.files.length > 0) {
      data.vehicleImage = req.files.map((file) => file.filename);
    }

    const vehicle = await TwoWheeler.create(data);

    return res.json({ message: "Two Wheeler Added ✅", vehicle });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//update vehicle detail find by id
exports.updateTwoWheeler = async (req, res) => {
  try {
    const id = req.params.id;

    // ❌ Reject empty body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Form-data required. JSON not accepted ❌",
      });
    }

    let data = req.body;

    // ✅ Convert Boolean strings
    if (data.discType !== undefined) {
      data.discType =
        data.discType === "true" ||
        data.discType === "True" ||
        data.discType === true;
    }

    // ✅ Convert numeric fields
    if (data.price) data.price = Number(data.price);
    if (data.kmDriven) data.kmDriven = Number(data.kmDriven);
    if (data.purchaseYear) data.purchaseYear = Number(data.purchaseYear);
    if (data.mileagePerLiter) data.mileagePerLiter = Number(data.mileagePerLiter);

    // ✅ Save multiple uploaded images if present
    if (req.files && req.files.length > 0) {
      data.vehicleImage = req.files.map((file) => file.filename);
    }

    // ✅ Update only provided fields
    const updatedVehicle = await TwoWheeler.findByIdAndUpdate(id, data, {
      new: true,        // return updated document
      runValidators: true,
    });

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found ❌" });
    }

    return res.json({
      message: "Two Wheeler updated ✅",
      updatedVehicle,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



//get vehicle detail by id 
exports.getTwoWheelerById = async (req, res) => {
  try {
    const id = req.params.id;

    const vehicle = await TwoWheeler.findById(id);

    if (!vehicle)
      return res.status(404).json({ message: "Vehicle not found ❌" });

    return res.json(vehicle);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//get all twowheeler detail
exports.getAllTwoWheelers = async (req, res) => {
  try {
    const vehicles = await TwoWheeler.find().sort({ createdAt: -1 }); // latest first

    return res.json(vehicles);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//delete vehicle detail by id
exports.deleteTwoWheeler = async (req, res) => {
  try {
    const id = req.params.id;

    const vehicle = await TwoWheeler.findByIdAndDelete(id);

    if (!vehicle)
      return res.status(404).json({ message: "Vehicle not found ❌" });

    return res.json({ message: "Vehicle deleted ✅" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

