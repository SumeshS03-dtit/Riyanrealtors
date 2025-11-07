const express = require("express");
const app = express();
const cors = require("cors");


require("dotenv").config(); // load .env
const PORT = process.env.PORT || 7000;
const connectDB = require("./lib/db");
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve image files


const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const twoWheelerRoutes = require("./routes/twoWheelerRoutes");
const fourWheelerRoutes= require("./routes/fourWheelerRoutes")
const propertyRoutes= require("./routes/propertyRoutes")

// connect DB
connectDB();


//routes 
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/two-wheeler", twoWheelerRoutes);
app.use("/api/four-wheeler", fourWheelerRoutes);
app.use("/api/property", propertyRoutes)

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});