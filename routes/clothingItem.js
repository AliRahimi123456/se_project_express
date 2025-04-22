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
const { celebrate, Joi } = require("celebrate");

router.get("/", getItems);

router.use(auth);

router.post("/", validateCardBody, createItem);

router.put(
  "/:itemId/likes",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).required(),
    }),
  }),
  likeItem
);

router.delete(
  "/:itemId/likes",
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).required(),
    }),
  }),
  dislikeItem
);

router.delete("/:id", validateId, deleteItem);

module.exports = router;

// const express = require("express");
// const auth = require("../middlewares/auth");

// const router = express.Router();
// const {
//   createItem,
//   getItems,
//   deleteItem,
//   likeItem,
//   dislikeItem,
// } = require("../controllers/clothingItem");
// const { validateCardBody, validateId } = require("../middlewares/validadtion");

// // router.use(express.json());

// router.get("/", getItems);
// router.use(auth);
// router.post("/", validateCardBody, createItem);
// // router.post("/", createItem);
// router.put("/:itemId/likes", likeItem);

// router.delete("/:itemId/likes", dislikeItem);

// router.delete("/:id", validateId, deleteItem);

// module.exports = router;
