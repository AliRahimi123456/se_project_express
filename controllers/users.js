const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const {
  ERROR_SERVER,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_UNAUTHORIZED,
  HTTP_STATUS_CONFLICT,
} = require("../utils/constants");

const { JWT_SECRET } = require("../utils/config");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials({ email, password })
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: "User not found" });
      }

      //  return bcrypt.compare(password, user.password).then((isMatch) => {
      // if (!isMatch) {
      //   return res
      //     .status(ERROR_BAD_REQUEST)
      //     .send({ message: "Invalid credentials" });
      // }
      console.log("JWT Secret:", JWT_SECRET);
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).send({ message: "Login successful", token });
      // });
    })
    .catch((error) => {
      if (error.message === "Incorrect email or password") {
        return res
          .status(ERROR_UNAUTHORIZED)
          .send({ message: "Invalid email or password" });
      }
      console.error(error);
      return res.status(ERROR_SERVER).send({ message: "Error during login" });
    });
};

// const getAllUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send({ data: users }))
//     .catch((error) => {
//       console.error(error);
//       return res.status(ERROR_SERVER).send({ message: "Error fetching users" });
//     });
// };
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: "User not found" });
      }
      return res.status(200).send({ data: user });
    })
    .catch((error) => {
      console.log(error);
      if (error.name === "CastError") {
        return res.status(ERROR_BAD_REQUEST).send({ message: "Invalid ID" });
      }
      console.error(error);
      return res.status(ERROR_SERVER).send({ message: "Error fetching user" });
    });
};
const updateUserProfile = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updateUser) => {
      if (!updateUser) {
        return res.status(ERROR_NOT_FOUND).send({ message: "User not found" });
      }
      return res.status(200).send({ data: updateUser });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Invalid data provided" });
      }
      return res.status(ERROR_SERVER).send({ message: "Error updating user" });
    });
};

const createUser = (req, res) => {
  console.log("Received request to create user:", req.body);

  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    console.log("Missing required fields: name, email, or password");
    return res
      .status(ERROR_BAD_REQUEST)
      .json({ message: "Name, email, and password are required" });
  }

  return bcrypt.hash(password, 10).then((hashedPassword) => {
    const userData = {
      name,
      email,
      password: hashedPassword,
      avatar: avatar || "https://example.com/default-avatar.jpg",
    };

    return User.create(userData)
      .then((user) => {
        console.log("User created successfully:", user);
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        return res.status(201).send(userWithoutPassword);
        // const { name, email, avatar } = user;
        // return res.status(201).send({ name, email, avatar });
      })
      .catch((error) => {
        console.error("Error from createUser:", error);

        if (error.code === 11000) {
          console.log("Duplicate email detected");
          return res
            .status(HTTP_STATUS_CONFLICT)
            .send({ message: "Email already in use" });
        }

        if (error.name === "ValidationError") {
          return res
            .status(ERROR_BAD_REQUEST)
            .send({ message: "Invalid data passed" });
        }

        return res
          .status(ERROR_SERVER)
          .send({ message: "Error from createUser", error: error.message });
      });
  });
};

module.exports = {
  // getAllUsers,
  getCurrentUser,
  updateUserProfile,
  createUser,
  login,
};
