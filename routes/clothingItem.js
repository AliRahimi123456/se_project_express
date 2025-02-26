const express = require("express");
const router = express.Router();
const {
  createItem,

  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

router.use(express.json());
//Create
router.post("/", createItem);

//updateItem
// router.patch("/:itemId", updateItem);

//Read
router.get("/", getItems);
//likeItem
router.patch("/:itemId/likes", likeItem);
//dislike Item
router.delete("/:itemId/likes", dislikeItem);
//del
router.delete("/:itemId", deleteItem);
module.exports = router;
