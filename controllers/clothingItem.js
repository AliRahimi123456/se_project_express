const ClothingItem = require("../models/clothingItem");
const { ERROR_SERVER } = require("../utils/constants");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => res.send({ data: item }))
    .catch((error) => {
      console.error("Error from createItem:", error);
      res
        .status(ERROR_SERVER)
        .send({ message: "Error from createItem", error: error.message });
    });
};
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: "Error from getItems" });
    });
};

const deleteItems = (req, res) => {
  ClothingItem.deleteMany({})
    .then((result) => res.status(200).send({ data: result }))
    .catch(() => {
      res
        .status(ERROR_SERVER)
        .send({ message: "Error occurred while deleting items" });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } }, { new: true })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: "Error from updateItem" });
    });
};

module.exports = { createItem, getItems, deleteItems, updateItem };
