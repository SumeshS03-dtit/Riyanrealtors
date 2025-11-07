const Property = require("../models/propertyModel");
const mongoose = require("mongoose");


//create property detail
exports.createProperty = async (req, res) => {
  try {
    // ❌ Reject if no form-data body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Form-data required. JSON not accepted ❌",
      });
    }

    const {
      propertyName,
      price,
      location,
      buildYear,
      noOfBedrooms,
      noOfBathrooms,
      sqFeet
    } = req.body;

    // ✅ Required field validation
    if (
      !propertyName ||
      !price ||
      !location ||
      !buildYear ||
      !noOfBedrooms ||
      !noOfBathrooms ||
      !sqFeet
    ) {
      return res.status(400).json({
        message:
          "propertyName, price, location, buildYear, noOfBedrooms, noOfBathrooms, sqFeet are required",
      });
    }

    let data = req.body;

    // ✅ Convert numeric values (form-data sends strings)
    data.price = Number(data.price);
    data.noOfBedrooms = Number(data.noOfBedrooms);
    data.noOfBathrooms = Number(data.noOfBathrooms);
    data.sqFeet = Number(data.sqFeet);
    data.buildYear = Number(data.buildYear);

    // ✅ Save multiple uploaded images
    if (req.files && req.files.length > 0) {
      data.propertyImages = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const property = await Property.create(data);

    return res.json({
      message: "Property Added ✅",
      property,  // ✅ Correct object sent
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//update the detail by id
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check valid Mongo ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Property ID ❌" });
    }

    // ❌ Reject if no form-data body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Form-data required. JSON not accepted ❌",
      });
    }

    let data = req.body;

    // ✅ Convert numeric fields
    if (data.price) data.price = Number(data.price);
    if (data.noOfBedrooms) data.noOfBedrooms = Number(data.noOfBedrooms);
    if (data.noOfBathrooms) data.noOfBathrooms = Number(data.noOfBathrooms);
    if (data.sqFeet) data.sqFeet = Number(data.sqFeet);
    if (data.buildYear) data.buildYear = Number(data.buildYear);

    // ✅ Update image ONLY if new images were uploaded
    if (req.files && req.files.length > 0) {
      data.propertyImages = req.files.map((file) => `/uploads/${file.filename}`);
    } else {
      delete data.propertyImages;   // ✅ prevents replacing old images with undefined
    }

    // ✅ Update the property
    const updatedProperty = await Property.findByIdAndUpdate(id, data, {
      new: true,          // return updated doc
      runValidators: true // validate schema
    });

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found ❌" });
    }

    return res.json({
      message: "Property Updated ✅",
      property: updatedProperty,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//get detail by id
exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Property ID ❌" });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found ❌" });
    }

    return res.status(200).json({
      message: "Property fetched ✅",
      property,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//get all the property detail
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 }); // newest first

    return res.status(200).json({
      message: "All properties fetched ✅",
      count: properties.length,
      properties,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//delete the property detail by id
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate Mongo ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Property ID ❌" });
    }

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found ❌" });
    }

    return res.status(200).json({
      message: "Property deleted ✅",
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
