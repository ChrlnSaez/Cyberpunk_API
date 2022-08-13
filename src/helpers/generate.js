const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// For generating jwt token and password encryption
module.exports = {
  jwt: (payload) => jwt.sign(payload, "secret", { expiresIn: "30d" }),
  hash: async (password) => await bcrypt.hash(password, 10),
};
