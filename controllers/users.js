const User = require("../models/user");
const {
  ERROR_SERVER,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
} = require("../utils/constants");

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => {
      res.status(ERROR_SERVER).send({ message: "Error from getUsersData" });
    });
};

const getUserById = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .orFail()
    .then((users) => res.status(200).send({ data: users }))
    .catch((error) => {
      if (error.name === "CastError") {
        return res.status(ERROR_BAD_REQUEST).send({ message: "Invalid ID" });
      }
      if (error.name === "DocumentNotFoundError") {
        return res.status(ERROR_NOT_FOUND).send({ message: "user not found" });
      }
      console.log(error);
      res.status(ERROR_SERVER).send({ message: "Error from getUsersData" });
    });
};

const createUser = (req, res) => {
  console.log("Received request to create user:", req.body);

  const { name, avatar } = req.body;

  if (!name || !avatar) {
    console.log("Missing required fields: name or avatar");
    return res
      .status(ERROR_BAD_REQUEST)
      .json({ message: "Name and avatar are required" });
  }

  const userData = {
    name,

    avatar: avatar || "https://example.com/default-avatar.jpg",
    owner: req.user?._id,
  };

  return User.create(userData)

    .then((user) => {
      console.log("User created successfully:", user);
      res.send({ data: user });
    })
    .catch((error) => {
      console.error("Error from createUser:", error);

      if (error.name === "ValidationError") {
        console.log("Validation error occurred");
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Invalid data passed" });
      }

      return res
        .status(ERROR_SERVER)
        .send({ message: "Error from createUser", error: error.message });
    });
};

module.exports = { getAllUsers, getUserById, createUser };
