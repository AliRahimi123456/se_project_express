const express = require("express");

const router = express.Router();
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./users");
const auth = require("../middlewares/auth");
const { ERROR_NOT_FOUND } = require("../utils/constants");

router.post("/signin", require("../controllers/users").login);
router.post("/signup", require("../controllers/users").createUser);

router.use("/items", clothingItemRoutes);

router.use(auth);
router.use("/users", userRoutes);

router.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
