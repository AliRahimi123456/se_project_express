const express = require("express");
const auth = require("../middlewares/auth");

const router = express.Router();
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const { validateCardBody, validateId } = require("../middlewares/validadtion");

// router.use(express.json());

router.get("/", getItems);
router.use(auth);
router.post("/", validateCardBody, createItem);
router.post("/", createItem);
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

router.delete("/:id", validateId, deleteItem);

module.exports = router;
