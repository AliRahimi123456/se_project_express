const express = require("express");
const router = express.Router();
const {
  createItem,
  getItems,
  deleteItems,
  updateItem,
} = require("../controllers/clothingItem");

router.use(express.json());
//Create
router.post("/", createItem);

//Read
router.get("/", getItems);
//Update
router.put("/:itemId", updateItem);

//Delete
router.delete("/", deleteItems);
module.exports = router;
