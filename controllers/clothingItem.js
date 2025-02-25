const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
};
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Error from getItems", e });
    });
};

const deleteItems = (req, res) => {
  ClothingItem.deleteMany({})
    .then((result) => res.status(200).send(result))
    .catch((e) => {
      res
        .status(500)
        .send({ message: "Error occurred while deleting items", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.param;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Error from updateItem", e });
    });
};

module.exports = { createItem, getItems, deleteItems, updateItem };
