const express = require("express");
const { celebrate, Joi } = require("celebrate");
const { updateUserProfile, getCurrentUser } = require("../controllers/users");

const router = express.Router();

const validateUserProfileUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).optional(),
    avatar: Joi.string().uri().optional(),
  }),
});

router.get("/me", getCurrentUser);

router.patch("/me", validateUserProfileUpdate, updateUserProfile);

module.exports = router;

// const express = require("express");
// const { updateUserProfile, getCurrentUser } = require("../controllers/users");
// // const {
// //   validateClothingItem,
// //   validateUserCreation,
// //   validateUserLogin,
// //   validateIdParam,
// // } = require("../middlewares/validation");

// // router.post("/items", validateClothingItem, createItem);
// // router.post("/signup", validateUserCreation, createUser);
// // router.post("/signin", validateUserLogin, loginUser);
// // router.get("/items/:id", validateIdParam, getItemById);
// // router.get("/users/:id", validateIdParam, getUserById);

// const router = express.Router();

// router.get("/me", getCurrentUser);
// router.patch("/me", updateUserProfile);
// // router.get("/:userId", getUserById);

// module.exports = router;
