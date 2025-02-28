const express = require("express");

const router = express.Router();
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./users");
const { ERROR_NOT_FOUND } = require("../utils/constants");

// Clothing Item Routes
router.use("/items", clothingItemRoutes);

router.use("/users", userRoutes);

router.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
