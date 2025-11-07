const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    buildYear: {
      type: Number,
      required: true,
    },

    noOfBedrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    noOfBathrooms: {
      type: Number,
      required: true,
      min: 0,
    },

    parkingAvailable: {
      type: Boolean,
      default: false,
    },

    sqFeet: {
      type: Number,
      required: true,
      min: 0,
    },

    carGarageAvailable: {
      type: Boolean,
      default: false,
    },

    petFriendly: {
      type: Boolean,
      default: false,
    },

    
    propertyImages: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
