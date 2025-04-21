// const JWT_SECRET = process.env.JWT_SECRET || "default value for SOME_THING";
const { JWT_SECRET = "dev-secret" } = process.env;

// console.log(JWT_SECRET);
module.exports = {
  JWT_SECRET,
};
