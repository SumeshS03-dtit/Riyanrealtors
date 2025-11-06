const express = require("express");
const app = express();


require("dotenv").config(); // load .env
const PORT = process.env.PORT || 7000;
const connectDB = require("./lib/db");
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve image files
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const twoWheelerRoutes = require("./routes/twoWheelerRoutes");

// connect DB
connectDB();


//routes 
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/two-wheeler", twoWheelerRoutes);

app.get("/", (req, res) => {
  res.send("Server running ✅");
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});