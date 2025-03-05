const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
} = require("../controllers/users");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);

module.exports = router;
