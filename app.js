const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(
  "mongodb://localhost:27017/wtwr_db",
  () => console.log("Connected to DB"),
  (e) => console.error("DB error", e)
);

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
