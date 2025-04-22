const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/customErrors");
const ForbiddenError = require("../errors/customErrors");
const NotFoundError = require("../errors/customErrors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed"));
      }
      return next(error);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(id)
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError("You are not allowed to delete this item");
      }
      return ClothingItem.findByIdAndDelete(id);
    })
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(error);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      res.status(200).send({ data: item });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(error);
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found"))
    .then((item) => res.status(200).send({ data: item }))
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(error);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
