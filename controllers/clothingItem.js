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

const deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((error) => {
      if (error.name === "CastError") {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Invalid item ID" });
      }
      if (error.name === "DocumentNotFoundError") {
        return res.status(ERROR_NOT_FOUND).send({ message: "Item not found" });
      }
      console.error("Error from deleteItem:", error);
      res
        .status(ERROR_SERVER)
        .send({ message: "Error occurred while deleting item" });
    });
};

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageURL } = req.body;

//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } }, { new: true })
//     .orFail()
//     .then((item) => res.status(200).send({ data: item }))
//     .catch(() => {
//       res.status(ERROR_SERVER).send({ message: "Error from updateItem" });
//     });
// };

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.body.userId;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.status(200).send({ data: item });
    })
    .catch((error) => {
      console.error("Error in likeItem:", error);
      res
        .status(ERROR_SERVER)
        .send({ message: "Error from likeItem", error: error.message });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.body.userId;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((error) => {
      if (error.name === "CastError") {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Invalid item ID" });
      }
      if (error.name === "DocumentNotFoundError") {
        return res.status(ERROR_NOT_FOUND).send({ message: "Item not found" });
      }
      console.error("Error in dislikeItem:", error);
      res.status(ERROR_SERVER).send({ message: "Error from dislikeItem" });
    });
};
module.exports = {
  createItem,
  getItems,
  deleteItem,

  likeItem,
  dislikeItem,
};
