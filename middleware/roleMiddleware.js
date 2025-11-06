const onlyMaster = (req, res, next) => {
  if (req.user.role !== "MASTER_ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

const onlyAdmins = (req, res, next) => {
  if (req.user.role !== "ADMIN" && req.user.role !== "MASTER_ADMIN") {
    return res.status(403).json({ message: "Not allowed" });
  }
  next();
};

module.exports = { onlyMaster, onlyAdmins };
