const express = require("express");
const { updateUserProfile, getCurrentUser } = require("../controllers/users");

const router = express.Router();

router.get("/me", getCurrentUser);
router.patch("/me", updateUserProfile);
// router.get("/:userId", getUserById);

module.exports = router;
