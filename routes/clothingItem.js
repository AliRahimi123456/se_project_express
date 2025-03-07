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

router.use(express.json());

router.get("/", getItems);
router.use(auth);
router.post("/", createItem);
router.put("/:itemId/likes", likeItem);

router.delete("/:itemId/likes", dislikeItem);

router.delete("/:itemId", deleteItem);

module.exports = router;
