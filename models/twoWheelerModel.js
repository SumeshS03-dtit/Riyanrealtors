const mongoose = require("mongoose");

const twoWheelerSchema = new mongoose.Schema(
  {
    vehicleName: {  type: String, required: true, trim: true,},
    price: { type: Number, required: true, min: 0,},
    category: { type: String, enum: ["Scooter", "Bike", "EV", "Other"], required: true,},
    description: { type: String, default: "", trim: true, },
    location: { type: String, required: true, trim: true,},
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "EV", "Hybrid"],
      default: "Petrol",
    },
    
    kmDriven: {
      type: Number,
      required: true,
      min: 0,
    },

    purchaseYear: {
      type: Number,
      required: true,
    },

    vehicleImage: {
      type: [String],
      default: [],
    },

    tubeType: {
      type: String,
      enum: ["Tube", "Tubeless"],
      default: "Tubeless",
    },

    discType: {
      type: Boolean,
      default: false,
    },

    mileagePerLiter: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TwoWheeler", twoWheelerSchema);
