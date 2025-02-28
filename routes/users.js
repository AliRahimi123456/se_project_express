const express = require("express");

const router = express.Router();

const users = [
  { _id: "1", name: "John Doe", email: "john@example.com" },
  { _id: "2", name: "Jane Smith", email: "jane@example.com" },
];

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:userId", (req, res) => {
  const user = users.find((u) => u._id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const newUser = { _id: String(users.length + 1), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
