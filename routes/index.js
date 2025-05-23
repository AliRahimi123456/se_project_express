const express = require("express");
const { celebrate, Joi } = require("celebrate");
const clothingItemRoutes = require("./clothingItem");
const userRoutes = require("./users");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/not-found-error");

const router = express.Router();

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
      name: Joi.string().min(2).max(30).required(),
      avatar: Joi.string().uri().required(),
    }),
  }),
  require("../controllers/users").createUser
);

router.use("/items", clothingItemRoutes);

router.use(auth);
router.use("/users", userRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

// Remove this duplicate error handler if it's already defined in app.js
// router.use((err, req, res, next) => {
//   res
//     .status(err.status || 500)
//     .send({ message: err.message || "Internal Server Error" });
// });

module.exports = router;
