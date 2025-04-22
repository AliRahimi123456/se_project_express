const express = require("express");
const router = express.Router();
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./users");
const auth = require("../middlewares/auth");
const { ERROR_NOT_FOUND } = require("../utils/constants");
const { celebrate, Joi } = require("celebrate");

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  require("../controllers/users").login
);

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      name: Joi.string().required(),
    }),
  }),
  require("../controllers/users").createUser
);

router.use("/items", clothingItemRoutes);

router.use(auth);
router.use("/users", userRoutes);

router.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = ERROR_NOT_FOUND;
  next(error);
});

router.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ message: err.message || "Internal Server Error" });
});

module.exports = router;
