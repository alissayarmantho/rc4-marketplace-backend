const jwt = require("jsonwebtoken");
const env = require("../config/env");

//account id -> id; email -> email
module.exports = function (id, email) {
  return jwt.sign({ id: id, email: email }, env.jwtSecret);
};
