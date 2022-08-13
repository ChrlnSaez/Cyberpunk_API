const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// For verification of jwt token and password encryption
module.exports = {
  jwt: (token) => jwt.verify(token, "secret"),
  hash: (password, hash) => bcrypt.compare(password, hash),
};
