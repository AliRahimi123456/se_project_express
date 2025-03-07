const jwt = require("jsonwebtoken");
const { ERROR_UNAUTHORIZED } = require("../utils/constants");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res
      .status(ERROR_UNAUTHORIZED)
      .send({ message: "Invalid or expired token" });
  }

  req.user = payload;
  console.log("Authentication:", req.user);
  return next();
};
module.exports = auth;
