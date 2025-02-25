const express = require("express");
const router = express.Router();

const clothingItemRoutes = require("./clothingItem");

router.use("/items", clothingItemRoutes);

router.use((req, res) => {
  res.status(404).send({ message: "Router not found" });
});

module.exports = router;
