const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Read token from header
    const token = req.header("Authorization");

    if (!token)
      return res.status(401).json({ message: "No token provided" });

    // Extract token if sent as: Bearer TOKEN
    const tokenValue = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    // Verify
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    // Store decoded info
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
