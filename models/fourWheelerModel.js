const mongoose = require("mongoose");

const fourWheelerSchema = new mongoose.Schema(
    {
        vehicleName: { type: String, required: true, trim: true,},
        price: { type: Number, required: true, min: 0, },
        description: { type: String, default: "", trim: true, },
        location: { type: String, required: true, trim: true,},
        fuelType: { type: String, enum: ["Petrol", "Diesel","EV","Hybrid"], default: "Petrol"},
        kmDriven: { type: Number, required: true, min: 0},
        purchaseYear: { type: Number, required: true,},
        vehicleImage: { type: [String], default: [],},
        mileagePerLiter: { type: Number,min: 0,default: 0,},
        seatCapacity: { type:Number,min:0,default:0,},
        carVarient: {type: String, enum: ["SUV","Sedan"]},
    },
    { timestamps: true}
)